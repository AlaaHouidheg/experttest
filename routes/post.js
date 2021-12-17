const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post");
const isAuth = require("../middleware/auth");
const { commentRules, validation } = require("../middleware/validator");

// add a post
// post
//http://localhost:5000/api/post/createpost

postRouter.post("/createpost", async (req, res) => {
  const { title, body, url, category, description } = req.body;
  try {
    const newPost = new Post({ title, body, url, category, description });
    if (!title || !body || !url || !category) {
      return res.status(400).send({ msg: "3abbi kol chy " });
    }
    await newPost.save();
    res.send({ newPost, msg: "succesfuly posted" });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
});

//@Method PUT
//@desc update one post by id
//@Path: http://localhost:5000/api/post/update//:id
//@Params id Body
postRouter.put("/update/:id", isAuth(), async (req, res) => {
  try {
    const result = await Post.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    result.nModified
      ? res.send({ message: "Post updated" })
      : res.send({ message: "Post already updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "there is no post with this id" });
  }
});

//@Method DELETE
//@des delete one post by id
//@Path: http://localhost:6000/posts/delete/:id
//@Params id
postRouter.delete("/delete/:id", isAuth(), async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ reponse: "post deleted" })
      : res.send("There is no post with this id");
  } catch (error) {
    res.send("Not deleted");
    console.log(error);
  }
});

//@Method GET
//@des GET one post
//@Path: http://localhost:6000/posts/one/:id
//@Params id

postRouter.get("/one/:id", async (req, res) => {
  try {
    const result = await Post.findOne({ _id: req.params.id })
      .populate("postedBy", "_id name url")
      .populate("comments.user", "_id name url");
    res.send({ response: result, message: "Getting post successfully " });
  } catch (error) {
    res.status(400).send({ message: "There is no post with this id" });
  }
});

// get all posts
//get
// http://localhost:5000/allpost

postRouter.get("/allpost", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name url")
    .populate("comments.user", "_id name url")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get posts by user
// get
// http://localhost:5000/mypost
postRouter.get("/mypost", isAuth(), (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name url")
    .populate("comments.user", "_id name url")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//like posts
//put
//http://localhost:5000/like/id

postRouter.put("/like/:id", isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ error: "Post already liked" });
    }

    post.likes.unshift({ user: req.user._id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//unlike posts
//put
//http://localhost:5000/unlike/id

postRouter.put("/unlike/:id", isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ error: "Post has not been liked yet " });
    }

    const removeindex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeindex, 1);
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    res.json(error);
  }
});

//comment posts
//put
//http://localhost:5000/comment/post id

postRouter.post(
  "/comment/:id",
  isAuth(),
  commentRules(),
  validation,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate("comments.user", "_id name url")
        .populate("postedBy", "_id name url");
      req.user.password = undefined;
      const newComment = {
        text: req.body.text,
        user: req.user,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.status(200).json(post.comments);
    } catch (error) {
      res.status(500).send({ error });
      console.log(error);
    }
  }
);

//delete comment posts
//put
//http://localhost:5000/comment/post id / comment id

postRouter.delete("/comment/:id/:comment_id", isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "comment does not exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    const removeindex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeindex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = postRouter;

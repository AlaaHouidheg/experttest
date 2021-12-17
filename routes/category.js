const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/category");

// add a category
// category
//http://localhost:5000/api/post/createpost

categoryRouter.post("/", async (req, res) => {
  const { title, key, body, url } = req.body;
  try {
    const newCategory = new Category({ title, key, body, url });
    if (!title || !key) {
      return res.status(400).send({ msg: "3abbi kol chy " });
    }
    await newCategory.save();
    res.send({ newCategory, msg: "succesfuly posted" });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
});

//@Method PUT
//@desc update one post by id
//@Path: http://localhost:5000/api/post/update//:id
//@Params id Body
categoryRouter.put("/update/:id", async (req, res) => {
  try {
    const result = await Category.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    result.nModified
      ? res.send({ message: "Category updated" })
      : res.send({ message: "Category already updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "there is no Category with this id" });
  }
});

//@Method DELETE
//@des delete one Category by id
//@Path: http://localhost:6000/Categorys/delete/:id
//@Params id
categoryRouter.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ reponse: "Category deleted" })
      : res.send("There is no Category with this id");
  } catch (error) {
    res.send("Not deleted");
    console.log(error);
  }
});

//@Method GET
//@des GET one Category
//@Path: http://localhost:6000/Categorys/one/:id
//@Params id

categoryRouter.get("/one/:id", async (req, res) => {
  try {
    const result = await Category.findOne({ _id: req.params.id });

    res.send({ response: result, message: "Getting Category successfully " });
  } catch (error) {
    res.status(400).send({ message: "There is no Category with this id" });
  }
});

// get all Categorys
//get
// http://localhost:5000/allCategory

categoryRouter.get("/all", (req, res) => {
  Category.find()

    .then((Categorys) => {
      res.json({ Categorys });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = categoryRouter;

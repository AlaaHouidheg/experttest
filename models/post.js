const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // likes: [
  //   {
  //     user: {
  //       type: ObjectId,
  //       ref: "user",
  //     },
  //   },
  // ],
  // comments: [
  //   {
  //     user: {
  //       type: ObjectId,
  //       ref: "user",
  //     },
  //     text: {
  //       type: String,
  //       required: true,
  //     },
  // },
  // ],
  // subpost: [
  //   {
  //     title: {
  //       type: String,
  //     },
  //     text: {
  //       type: String,
  //     },
  //     url: {
  //       type: String,
  //     },
  //   },
  // ],
  // postedBy: {
  //   type: ObjectId,
  //   ref: "user",
  // },
});

module.exports = mongoose.model("post", postSchema);

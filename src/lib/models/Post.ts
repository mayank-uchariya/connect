import mongoose from "mongoose";
import { PostType } from "../../../type";

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  postPhoto: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  likes: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.models.Post || mongoose.model<PostType>("Post",PostSchema)

export default Post;
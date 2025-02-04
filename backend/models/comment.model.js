import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "author is required"],
      ref: "Agent",
    },
    text: {
      type: String,
      required: [true, "comment text is required"],
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

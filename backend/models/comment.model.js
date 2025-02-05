import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',  // Reference to the Lead model
      required: [true, 'Lead reference is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "author is required"],
      ref: "Agent",
    },
    text: {
      type: String,
      required: [true, "comment text is required"],
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

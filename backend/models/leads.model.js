import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema({
  name: {
    type: String,
    required: [true, "Lead name is required"],
  },
  source: {
    type: String,
    required: [true, "Lead source is required"],
    enum: [
      "Website",
      "Referral",
      "Cold Call",
      "Advertisement",
      "Email",
      "Other",
    ],
  },
  salesAgent: {
    type: Schema.Types.ObjectId,
    required: [true, "Sales Agent is required"],
  },
  status: {
    type: String,
    required: true,
    enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Close"],
    default: "New",
  },
  tags: [
    {
      type: String,
    },
  ],
  timeToClose: {
    type: Number,
    required: [true, "Time to Close is required"],
    min: [1, "Time to Close is must be a positive integer"],
  },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  closeAt: {
    type: Date,
  },
});

leadSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Lead = mongoose.model("Lead", leadSchema);

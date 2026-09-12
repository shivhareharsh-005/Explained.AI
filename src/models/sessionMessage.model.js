
import mongoose from "mongoose";

const sessionMessageSchema = new mongoose.Schema({
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningSession",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    messageType: {
      type: String,
      enum: [
        "initial-explanation",
        "probe",
        "answer",
        "hint",
        "clarification",
      ],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    round: {
      type: Number,
      required: true,
      min: 0,
    },

    relatedGap: {
      type: String,
      default: null,
    },
},
  {
    timestamps: true,
  })


export const SessionMessage = mongoose.model(
    "SessionMessage",
    sessionMessageSchema
);
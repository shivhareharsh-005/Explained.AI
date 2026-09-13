

import mongoose from "mongoose";

const learningSessionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    explanation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Explanation",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "abandoned"],
        default : "active"
    },
    currentRound: {
        type: Number,
        default: 0,
        min: 0
    },
    maxRounds: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    hintsUsed : {
        type: Number,
        default: 0,
        min: 0
    }
},
{
    timestamps: true
})

export const LearningSession = mongoose.model(
    "LearningSession",
    learningSessionSchema
)

import mongoose, {Schema} from "mongoose"

const explanationEvaluationSchema = new mongoose.Schema({
    explanation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Explanation",
        required: true
    },
    clarityScore: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    correctnessScore:{
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    completenessScore:{
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    communicationScore: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },

    goodPoints: {
        type: [String],
        default: [],
    },
    incorrectPoints: {
        type: [String],
        default: []
    },
    reasoningGaps: {
        type: [String],
        default: []
    },
    idealExplanation: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

export const ExplanationEvaluation = mongoose.model(
    "ExplanationEvaluation",
    explanationEvaluationSchema
);
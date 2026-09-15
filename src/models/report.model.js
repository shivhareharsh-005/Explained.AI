
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({

    session : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LearningSession',
        required : true,
        unique: true
    },
    explanation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Explanation',
        required : true
    },

    overallScore : {
        type : Number,
        min: 0,
        max: 10,
        required : true
    },
    clarityScore : {
        type : Number,
        min: 0,
        max: 10,
        required : true
    },
    correctnessScore : {
        type : Number,
        min: 0,
        max: 10,
        required : true
    },
    reasoningScore : {
        type : Number,
        min: 0,
        max: 10,
        required : true
    },
    communicationScore : {
        type : Number,
        min: 0,
        max: 10,
        required : true
    },

    goodPoints : {
        type : [String],
        default : []
    },
    reasoningGaps : {
        type : [String],
        default : []
    },
    resolvedGaps : {
        type : [String],
        default : []
    },
    remainingGaps : {
        type : [String],
        default : []
    },

    idealExplanation : {
        type : String,
        required : true
    },
    nextSteps : {
        type : [String],
        default : []
    } 
},
{
    timestamps : true
})

export const Report = mongoose.model(
    "Report",
    reportSchema
)
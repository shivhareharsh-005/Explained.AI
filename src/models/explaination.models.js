
import mongoose from "mongoose";

const explanationSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    topic : {
        type: String,
        required: true,
        trim : true
    },

    explanationText: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 10000
    },

},
{
    timestamps: true,
})

export const Explanation = mongoose.model(
    "Explanation",
    explanationSchema
);
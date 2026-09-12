


import { Explanation } from "../models/explaination.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

//Request se data lena
//Validate karna
//Confirm karna ki user authenticated hai
//Explanation MongoDB mein save karna
//Response bhejna

const createExplanation = asyncHandler(async (req, res) => {
      
    const { topic, explanationText } = req.body;

    if(!topic || !explanationText){
        throw new ApiError(400, "Topic and explanation are required" )
    }

    const explanation = await Explanation.create({
        user: req.user._id,
        topic,
        explanationText
    })

    return res.status(201).json(
        new ApiResponse(
            201,
            explanation,
            "Explanation saved successfully"
        )
    )
})

export {createExplanation};



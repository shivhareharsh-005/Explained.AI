
import { Explanation } from "../models/explaination.models.js";
import { ExplanationEvaluation } from "../models/explanationEvaluation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const evaluateExplanation = asyncHandler( async(req, res) => {
    // id throw url ->  POST /api/explanations/64abc123/evaluate
    const { explanationId } = req.params;

    // Explanation fetch
    const explanation = await Explanation.findById(explanationId);

    if(!explanation){
        throw new ApiError(404, "Explanation not found");
    }

    //Ownership check , req and explanation must same

    if(explanation.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You cannot evaluate this explanation");
    }

    const evaluation = await ExplanationEvaluation.create({
        explanation: explanation._id,
        clarityScore: 0,
        correctnessScore: 0,
        completenessScore: 0,
        communicationScore: 0,
        goodPoints: [],
        incorrectPoints: [],
        reasoningGaps: [],
        idealExplanation: "AI evaluation will be added text",
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            evaluation,
            "Explanation evaluated successfully"
        )
    )
})

export { evaluateExplanation }
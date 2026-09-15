
import { LearningSession } from "../models/learningSession.model.js";
import { Explanation } from "../models/explaination.models.js";
import { SessionMessage } from "../models/sessionMessage.model.js";
import { Report } from "../models/report.model.js";
import { generateAIResponse } from "../services/ai.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { buildReportPrompt } from "../prompts/report.prompt.js"

const generateReport = asyncHandler( async (req, res) => {

    const { sessionId } = req.params;
    
    if(! sessionId){
        throw new ApiError(400, "Session ID is required")
    }

    const session = await LearningSession.findById(sessionId);

    if(!session) {
        throw new ApiError(404, "session not found");
    }
    if(session.user.toString() !== req.user._id.toString()){
        throw new ApiError(403,"You cannot generate a report for this session" )
    }
    if(session.status !== "completed"){
        throw new ApiError(400, "You cannot generate a report for this session")
    }

    const existingReport = await Report.findOne({
        session: session._id,
    });

    if(existingReport) {
        return res.status(200).json(
            new ApiResponse(
                200,
                existingReport,
                "Report already generated"
            )
        )
    }

    const explanation = await Explanation.findById(session.explanation);

    if (!explanation) {
        throw new ApiError(404, "Explanation not found");
    }
    

    // session messages fetch
    const sessionMessage = await SessionMessage.find({
        session: session._id,
    }).sort({
        createdAt: 1,
    })

    if(sessionMessage.length === 0){
        throw new ApiError(400, "No conversation messages found for this session");
    }

    // define conversation messages like AI, User
    const conversationTranscript = sessionMessage
    .map((message) => {
        const speaker = message.role === "user" ? "student" : "AI Coach";
        return `${speaker}: ${message.content}`;
    })
    .join("\n");

    const prompt = buildReportPrompt({
        topic: explanation.topic,
        initialExplanation: explanation.explanationText,
        conversationTranscript,
    });

    const aiResponse = await generateAIResponse(prompt);

})
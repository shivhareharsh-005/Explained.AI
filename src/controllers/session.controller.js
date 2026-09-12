
import { Explanation } from "../models/explaination.models.js";
import { LearningSession } from "../models/learningSession.model.js";
import { SessionMessage } from "../models/sessionMessage.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const startSession = asyncHandler(async (req, res) => {

    const { explanationId, maxRounds} = req.body;
    if (!explanationId) {
        throw new ApiError(400, "Explanation ID is required");
    }

    
    const explanation = await Explanation.findById(explanationId);
    // validation 
    if(!explanation){
        throw new ApiError(404, "Explanation not found")
    }

    // ownership check 
    if(explanation.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "you connot start a session for this explanation")
    }

    // session create 

    const session  = await LearningSession.create({
        user: req.user._id,
        explanation: explanation._id,
        maxRounds: maxRounds || 3
    })

    // initial message create
    const userMessage = await SessionMessage.create({
        session: session._id,
        role: "user",
        messageType: "initial-explanation",
        content: explanation.explanationText,
        round: 0,
    });

    // dummy AI question create
    const firstQuestion = await SessionMessage.create({
        session: session._id,
        role: "ai",
        messageType: "probe",
        content: `Why does ${explanation.topic} work this way?`,
        round: 1,
    });

    // response
    return res.status(201).json(
        new ApiResponse(
            201,
            {
            sessionId: session._id,
            status: session.status,
            currentRound: session.currentRound,
            maxRounds: session.maxRounds,
            firstMessage: firstQuestion,
            },
            "Learning session started successfully"
        )
    );


});

const sendSessionMessage = asyncHandler( async (req, res) => {

//    sessionId URL se lo
//    → message body se lo
//    → session database se find karo
//    → session exist check karo
//    → ownership check karo
//    → session active hai ya nahi check karo
//    → user message save karo
//    → currentRound increase karo
//    → dummy AI next question save karo
//    → response return karo

    const { sessionId} = req.params;
    const { content } = req.body;

    if(!sessionId){
        throw new ApiError(400, "session id required")
    }

    if(!content?.trim()){
        throw new ApiError(400, "message not found")
    }
    const session = await LearningSession.findById(sessionId);
    if(!session){
        throw new ApiError(404, "session  not found")
    }
    
    if(session.user.toString() !== req.user._id.toString()){
        throw new ApiError(403, "you cannot send the message")
    }

    if(session.status !== "active"){
        throw new ApiError(400, "session is not active");
    }

    const nextRound = session.currentRound + 1;

    const userMessage = await SessionMessage.create({
        session: session._id,
        role: "user",
        messageType: "answer",
        content: content.trim(),
        round: nextRound,
    })

    session.currentRound = nextRound;
    await session.save();

    if(session.currentRound >= session.maxRounds){
        session.status = "completed"
        await session.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    sessionId: session._id,
                    status: session.status,
                    currentRound: session.currentRound,
                    userMessage
                },
                "Learning session completed successfully"
            )
        );
    }

    const nextQuestion = await SessionMessage.create({
        session: session._id,
        role: "ai",
        messageType: "probe",
        content: "Can you explain why this answer is correct?",
        round: nextRound,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                sessionId: session._id,
                status: session.status,
                currentRound: session.currentRound,
                userMessage,
                nextMessage: nextQuestion,
            },
            "Message saved successfully"
        )
    );
})

export { 
    startSession,
    sendSessionMessage
};
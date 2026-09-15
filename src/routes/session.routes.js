
import {Router} from "express";
import { createExplanation } from "../controllers/explanation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { startSession, sendSessionMessage, getSession, getSessionMessages } from "../controllers/session.controller.js";

const router = Router();

router.post("/", verifyJWT, startSession);
router.get("/:sessionId", verifyJWT, getSession);
router.get("/:sessionId/messages", verifyJWT, getSessionMessages);
router.post("/:sessionId/messages", verifyJWT, sendSessionMessage);

export default router;

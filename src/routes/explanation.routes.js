
import {Router} from "express";
import { createExplanation } from "../controllers/explanation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { evaluateExplanation } from "../controllers/explanationEvaluation.controller.js";

const router = Router();

router.post("/", verifyJWT, createExplanation);
router.post(
  "/:explanationId/evaluate",
  verifyJWT,
  evaluateExplanation
);

export default router;

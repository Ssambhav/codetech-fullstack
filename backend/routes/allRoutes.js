// backend/routes/allRoutes.js
import express from "express";
import { getLawAdvice } from "../controllers/lawbotController.js";
import {
  getRightsByCategory,
  refreshRightByCategory,
} from "../controllers/rightsController.js";

import {
  getStateLawSummary,
  refreshStateLaw,
} from "../controllers/stateLawController.js";

const router = express.Router();

// LawBot Route
router.post("/lawbot", getLawAdvice);

// Rights Routes
router.get("/rights/:category", getRightsByCategory);
router.get("/rights/refresh/:category", refreshRightByCategory);

// State Law Routes
router.get("/state-laws/:state", getStateLawSummary);
router.get("/state-laws/refresh/:state", refreshStateLaw);

export default router;

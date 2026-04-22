import express from "express";
import { getLawAdvice } from "../controllers/lawbotController.js";
import { getRightsByCategory } from "../controllers/rightsController.js";
import { getStateLawSummary } from "../controllers/stateLawController.js";

// NEW
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();

router.post("/lawbot", getLawAdvice);
router.get("/rights/:category", getRightsByCategory);
router.get("/state-laws/:state", getStateLawSummary);

// NEW ROUTE
router.get("/weather", getWeather);

export default router;

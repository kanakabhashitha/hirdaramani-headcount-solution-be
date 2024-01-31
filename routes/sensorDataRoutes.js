import express from "express";
const router = express.Router();

import { createSensorData } from "../controllers/SensorDataController.js";

router.route("/").post(createSensorData);

export default router;

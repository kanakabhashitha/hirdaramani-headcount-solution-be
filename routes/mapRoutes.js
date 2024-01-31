import express from "express";
const router = express.Router();

import {
  getDirectionsCalculateData,
  getAddress,
} from "../controllers/mapController.js";

router.route("/directions-cal-data").get(getDirectionsCalculateData);
router.route("/address").get(getAddress);

export default router;

import express from "express";
const router = express.Router();

import {
  showStatus,
  createProject,
  updateProject,
  getAllProject,
} from "../controllers/projectController.js";

router.route("/").get(showStatus);
router.route("/add").post(createProject);
router.route("/all").get(getAllProject);
router.route("/all/:id").patch(updateProject);

export default router;

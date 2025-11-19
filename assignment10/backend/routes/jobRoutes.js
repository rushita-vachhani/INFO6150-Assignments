import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.post("/create/job", authRequired, createJob);
router.get("/jobs", authRequired, getJobs);

export default router;

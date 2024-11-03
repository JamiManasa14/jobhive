import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJobById } from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob); // Create a new job
router.route("/get").get(isAuthenticated, getAllJobs); // Get all jobs
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); // Get jobs created by admin
router.route("/get/:id").get(isAuthenticated, getJobById); // Get job by ID
router.route("/update/:id").put(isAuthenticated, updateJobById); // Update job by ID

export default router;

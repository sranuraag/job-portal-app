const express = require("express");
const { createJob, getAllJobs, getJobs, updateJob, deleteJob, applyJob } = require("../controllers");
const { authenticate } = require("../middlewares"); 

const JobRouter = express.Router();

JobRouter.post("/:id/apply", authenticate, applyJob);

JobRouter.post("/", authenticate, createJob);

JobRouter.get("/getAll", authenticate, getAllJobs);

JobRouter.get("/", authenticate, getJobs);

JobRouter.put("/:id", authenticate, updateJob);

JobRouter.delete("/:id", authenticate, deleteJob);

module.exports = { JobRouter };

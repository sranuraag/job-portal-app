const express = require("express");
const { createJob, getJobs, updateJob, deleteJob } = require("../controllers");
const { authenticate } = require("../middlewares"); 

const JobRouter = express.Router();

JobRouter.post("/", authenticate, createJob);

JobRouter.get("/", authenticate, getJobs);

JobRouter.put("/:id", authenticate, updateJob);

JobRouter.delete("/:id", authenticate, deleteJob);

module.exports = { JobRouter };

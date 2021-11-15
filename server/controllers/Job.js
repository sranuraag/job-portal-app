const { logger } = require("../utils");
const {
    createJobService,
    getJobsService,
    updateJobService,
    deleteJobService
  } = require("../services");

// Controller for POST /jobs
const createJob = async (req, res) => {
  try {
    logger.debug("Inside createJob.");

    console.log(req.body);

    let { title, description } = req.body;

    let user = req.user;

    let response = await createJobService(title, description, user);

    if (response.valid) {
      return res.status(201).json({ data: response.data });
    } else {
      return res.status(400).json({ error: response.error });
    }
  } catch (error) {
    logger.debug("Error in createJob.");
    console.log(error);
    return res.status(500).json({ error: "Error while creating job." });
  }
};

// Controller for GET /jobs
const getJobs = async (req, res) => {
  try {
    logger.debug("Inside getJobs.");

    let user = req.user;

    let response = await getJobsService(user);

    if (response.valid) {
      return res.status(200).json({ data: response.data });
    } else {
      return res.status(400).json({ error: response.error });
    }
  } catch (error) {
    logger.debug("Error in getJobs.");
    console.log(error);
    return res.status(500).json({ error: "Error while getting jobs." });
  }
};

// Controller for PUT /jobs/:id
const updateJob = async (req, res) => {
  try {
    logger.debug("Inside updateJob.");

    let { title, description } = req.body; 
    let id = req.params.id; 

    let response = await updateJobService(title, description, id);

    if (response.valid) {
      return res.status(200).json({ data: response.data });
    } else {
      return res.status(400).json({ error: response.error });
    }
  } catch (error) {
    logger.debug("Error in updateJob.");
    console.log(error);
    return res.status(500).json({ error: "Error while updating jobs." });
  }
};

// Controller for DELETE /jobs/:id
const deleteJob = async (req, res) => {
  try {
    logger.debug("Inside deleteJob.");

    let id = req.params.id; 

    let response = await deleteJobService(id);

    if (response.valid) {
      return res.status(200).json({ data: response.data });
    } else {
      return res.status(400).json({ error: response.error });
    }
  } catch (error) {
    logger.debug("Error in deleteJob.");
    console.log(error);
    return res.status(500).json({ error: "Error while updating jobs." });
  }
};

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
}
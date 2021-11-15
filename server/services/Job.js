const { logger } = require("../utils");
const {
  db_createJob,
  db_getJobs,
  db_update,
  db_delete,
  db_getAllJobs,
  db_applyJob
} = require("../database");

const createJobService = async (title, description, user) => {
  try {
    logger.debug("Inside createJobService.");

    // Validating if mandatory fields are present
    if (!(title && description)) {
      return {
        valid: false,
        error: "Title and Description are mandatory fields.",
      };
    }

    // Create Job
    let response = await db_createJob(title, description, user.id);

    return {
      valid: true,
      data: response,
    };
  } catch (error) {
    logger.error("Error in createJobService.");
    console.log(error);
    throw new Error();
  }
};

const getJobsService = async (user) => {
  try {
    logger.debug("Inside getJobsService.");

    // Get Jobs
    let response = await db_getJobs(user.id);

    return {
      valid: true,
      data: response,
    };
  } catch (error) {
    logger.error("Error in getJobsService.");
    console.log(error);
    throw new Error();
  }
};

const updateJobService = async (title, description, id) => {
  try {
    logger.debug("Inside updateJobService.");

    if (!(title && description)) {
      return {
        valid: false,
        error: "Title and Description are mandatory fields.",
      };
    }

    // Update Job
    let response = await db_update(title, description, id);

    return {
      valid: true,
      data: response,
    };
  } catch (error) {
    logger.error("Error in updateJobService.");
    console.log(error);
    throw new Error();
  }
};

const deleteJobService = async (id) => {
  try {
    logger.debug("Inside deleteJobService.");

    // Delete Job
    let response = await db_delete(id);

    return {
      valid: true,
      data: response,
    };
  } catch (error) {
    logger.error("Error in deleteJobService.");
    console.log(error);
    throw new Error();
  }
};

const getAllJobsService = async (user_id) => {
  try {
    logger.debug("Inside getAllJobsService.");

    // Get Jobs
    let response = await db_getAllJobs(user_id);

    return {
      valid: true,
      data: response,
    };
  } catch (error) {
    logger.error("Error in getAllJobsService.");
    console.log(error);
    throw new Error();
  }
};

const applyJobService = async (job_id, user_id) => {
  try {
    logger.debug("Inside applyJobService.");

    // Apply for Job
    let response = await db_applyJob(job_id, user_id);

    return {
      valid: true,
      data: response,
    };
  } catch (error) {
    logger.error("Error in applyJobService.");
    console.log(error);
    throw new Error();
  }
};

module.exports = {
  createJobService,
  getJobsService,
  updateJobService,
  deleteJobService,
  getAllJobsService,
  applyJobService,
};

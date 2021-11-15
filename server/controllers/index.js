const { createUser, loginUser, getAllUsers, getCurrentUser } = require("./User");
const { createJob, getJobs, updateJob, deleteJob, getAllJobs, applyJob } = require("./Job");

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getCurrentUser,
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getAllJobs,
  applyJob
};

const { createUserService, getUser, loginUserService, getAllUsersService } = require("./User");
const { createJobService, getJobsService, updateJobService, deleteJobService, getAllJobsService, applyJobService } = require("./Job");

module.exports = {
  createUserService,
  getUser,
  loginUserService,
  getAllUsersService,
  createJobService,
  getJobsService,
  updateJobService,
  deleteJobService,
  getAllJobsService,
  applyJobService
};

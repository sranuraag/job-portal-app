const { db_createUser, db_getUser, db_getUserById, db_getAllUsers } = require("./User");
const { db_createJob, db_getJobs, db_update, db_delete } = require("./Job");

module.exports = {
  db_createUser,
  db_getUser,
  db_getUserById,
  db_getAllUsers,
  db_createJob,
  db_getJobs,
  db_update,
  db_delete
};

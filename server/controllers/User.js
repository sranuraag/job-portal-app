const { logger } = require("../utils");
const { db_createUser } = require("../database");
const {
  createUserService,
  getUser,
  loginUserService,
  getAllUsersService
} = require("../services");

// Controller for POST /users
const createUser = async (req, res) => {
  try {
    logger.debug("Inside createUser.");

    console.log(req.body);

    // Extract user details from request body
    let { first_name, last_name, email, password, role } = req.body;

    // Call createUserService available in services folder
    let user = await createUserService(first_name, last_name, email, password, role); 

    if (user.valid) {
      return res
        .status(200)
        .json({ status: "success", jwt: user.jwt, user: user.user });
    } else {
      return res.status(400).json({ error: user.error });
    }

  } catch (error) {
    logger.error("Error in createUser.");
    console.log(error);
    return res.status(500).json({ error: "Error while creating user." });
  }
};

// Controller for POST /users/login
const loginUser = async (req, res) => {
  try {
    logger.info("Inside loginUser.");

    let { email, password } = req.body;

    // Call loginUserService available in services folder
    let user = await loginUserService(email, password);

    if (user.valid) {
      return res
        .status(200)
        .json({ status: "success", jwt: user.jwt, user: user.user });
    } else {
      return res.status(400).json({ error: user.error });
    }
  } catch (error) {
    logger.error("Error in loginUser.");
    console.log(error);
    return res.status(500).json({ error: "Error while logging in user." });
  }
};

// Controller for GET /users/getAllUsers
const getAllUsers = async (req, res) => {
  try {
    logger.info("Inside getAllUsers.");

    let user = req.user;

    // Call getAllUsersService available in services folder
    let response = await getAllUsersService(user);

    if (response.valid) {
      return res.status(200).json({ status: "success", data: response.data });
    } else {
      return res.status(400).json({ error: response.error });
    }
  } catch (error) {
    logger.error("Error in getAllUsers.");
    console.log(error);
    return res.status(500).json({ error: "Error while fetching users." });
  }
};

// Controller for GET /users
const getCurrentUser = async (req, res) => {
  try {
    logger.info("Inside getCurrentUser.");

    let user = req.user;

    return res.status(200).json({ status: "success", data: user });

  } catch (error) {
    logger.error("Error in getCurrentUser.");
    console.log(error);
    return res.status(500).json({ error: "Error while fetching user." });
  }
};

module.exports = { createUser, loginUser, getAllUsers, getCurrentUser };

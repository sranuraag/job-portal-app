const { executeQuery } = require("./dbConnection");
const { logger } = require("../utils");

const db_createJob = async (title, description, user_id) => {
    try {
        logger.debug("Inside db_createJob.")

        let query = `insert into jobs (title, description, user_id) values ('${title}','${description}','${user_id}')`;
        let result = await executeQuery(query);
        console.log(result);
        return result;

    } catch(error) {
        logger.error("Error in db_createJob.");
        console.log(error); 
        throw new Error(); 
    }
}

const db_getJobs = async (user_id) => {
    try {
        logger.debug("Inside db_getJobs.")

        let query = `select id, title, description from jobs where user_id = ${user_id}`;
        let result = await executeQuery(query);
        console.log(result);
        return result;

    } catch(error) {
        logger.error("Error in db_getJobs.");
        console.log(error); 
        throw new Error(); 
    }
}

const db_update = async (title, description, id) => {
    try {
        logger.debug("Inside db_update.")

        let query = `update jobs set title = '${title}', description = '${description}' where id = ${id}`;
        let result = await executeQuery(query);
        console.log(result);
        return result;

    } catch(error) {
        logger.error("Error in db_update.");
        console.log(error); 
        throw new Error(); 
    }
}

const db_delete = async (id) => {
    try {
        logger.debug("Inside db_delete.")

        let query = `delete from jobs where id = ${id}`;
        let result = await executeQuery(query);
        console.log(result);
        return result;

    } catch(error) {
        logger.error("Error in db_delete.");
        console.log(error); 
        throw new Error(); 
    }
}

module.exports = {
    db_createJob,
    db_getJobs,
    db_update,
    db_delete
}
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

        let query = `select id, title, description from jobs where user_id = ${user_id} order by id desc`;
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

const db_getAllJobs = async (user_id) => {
    try {
        logger.debug("Inside db_getAllJobs.")

        let query = `select 
        x.id as id, 
        title, 
        description, 
        job_id, 
        coalesce(y.cnt, 0) as cnt 
      from 
        (
          select 
            a.id as id, 
            a.title as title, 
            a.description as description, 
            coalesce(b.job_id, -1) as job_id 
          from 
            jobs a 
            left join applications b on a.id = b.job_id 
            and b.user_id = ${user_id}
        ) x 
        left join (
          select 
            a.id as id, 
            count(*) as cnt 
          from 
            jobs a, 
            applications b 
          where 
            a.id = b.job_id 
          group by 
            a.id
        ) y on x.id = y.id 
      order by 
        x.id desc
      `;
        let result = await executeQuery(query);
        console.log(result);
        return result;

    } catch(error) {
        logger.error("Error in db_getAllJobs.");
        console.log(error); 
        throw new Error(); 
    }
}

const db_applyJob = async (job_id, user_id) => {
    try {
        logger.debug("Inside db_applyJob.")

        let query = `insert into applications (job_id, user_id) values(${job_id}, ${user_id})`;
        let result = await executeQuery(query);
        console.log(result);
        return result;

    } catch(error) {
        logger.error("Error in db_applyJob.");
        console.log(error); 
        throw new Error(); 
    }
}

module.exports = {
    db_createJob,
    db_getJobs,
    db_update,
    db_delete,
    db_getAllJobs,
    db_applyJob
}
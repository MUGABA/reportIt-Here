import db from "./conn";
import logger from "../../setups/logger";
const users = {
  create: `CREATE TABLE IF NOT EXISTS users(
        userid SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        othernames VARCHAR(50),
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE ,
        password TEXT NOT NULL,
        phonenumber TEXT NOT NULL,
        registered TIMESTAMP NOT NULL DEFAULT NOW(),
        isadmin BOOLEAN NOT NULL DEFAULT FALSE,
        UNIQUE (userid, email) 
    );`,
  insert: `INSERT INTO users(firstname,lastname,username,email,password,phonenumber,isadmin)
    VALUES('mug','muha','mugmuha','muhamu@gmail.com',"ammedi123",'345678734567',TRUE);`,
  drop: `DROP TABLE users CASCADE;`
};

const incidents = {
  create: `CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
        createdby INT REFERENCES users(userId) ON DELETE CASCADE,
        type VARCHAR(15) NOT NULL,
        location VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        images VARCHAR(100)[],
        videos VARCHAR(100)[],
        comment VARCHAR(400) NOT NULL
    );`,
  drop: `DROP TABLE incidents CASCADE;`
};
const createUserTable = async () => {
  try {
    await db.query(users.create);
  } catch (error) {
    logger.info("Something happened we could not create the user tables");
  }
};
const dropUserTable = async () => {
  try {
    await db.query(users.drop);
  } catch (error) {
    logger.info("Something happened we could not drop the  user tables");
  }
};
const createadmin = async () => {
  try {
    await db.query(users.insert);
  } catch (error) {
    logger.info(` user not created ${error.stack}`);
  }
};
const createIncidentsTable = async () => {
  try {
    await db.query(incidents.create);
  } catch (error) {
    logger.info(
      "Something happened we could not create the incidents tables",
      error
    );
  }
};
const dropIncidentsTable = async () => {
  try {
    await db.query(incidents.drop);
  } catch (error) {
    logger.info("Something happened we could not drop the incidents tables");
  }
};

export default {
  users,
  incidents,
  createUserTable,
  createIncidentsTable,
  dropUserTable,
  dropIncidentsTable,
  createadmin
};

require("make-runnable");

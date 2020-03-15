import db from "./conn";
import logger from "../../setups/logger";
const users = {
  create: `CREATE TABLE IF NOT EXISTS users(
        userId SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        othernames VARCHAR(50),
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL ,
        password TEXT NOT NULL,
        phonenumber TEXT NOT NULL,
        registered TIMESTAMP NOT NULL DEFAULT NOW(),
        isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
        UNIQUE (userId, email) 
    );`,
  drop: `DROP TABLE users CASCADE;`
};

// INSERT INTO users(firstname,lastname,othernames,email,phonenumber,username)
// VALUES('John','Doe','jane','johndoe@gmail.com','345678734567','johndoe')
const incidents = {
  create: `CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
        createdBy INT REFERENCES users(userId) ON DELETE CASCADE,
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
    logger.info("Something happened we could not create the tables");
  }
};
const dropUserTable = async () => {
  try {
    await db.query(users.drop);
  } catch (error) {
    logger.info("Something happened we could not create the tables");
  }
};
const createIncidentsTable = async () => {
  try {
    await db.query(incidents.create);
  } catch (error) {
    logger.info("Something happened we could not create the tables");
  }
};
const dropIncidentsTable = async () => {
  try {
    await db.query(incidents.drop);
  } catch (error) {
    logger.info("Something happened we could not create the tables");
  }
};

export default {
  users,
  incidents,
  createUserTable,
  createIncidentsTable,
  dropUserTable,
  dropIncidentsTable
};

require("make-runnable");

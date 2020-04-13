import config from "config";
import { Pool } from "pg";
import logger from "../../setups/logger";

const pool = new Pool({
  connectionString: config.get("db")
});

pool.connect((err, res) => {
  let db = config.get("db");

  if (err) logger.info("Please check your connection");
  else logger.info(`Connected to ${process.env.NODE_ENV} database `);
});

export default {
  query(quertText, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(quertText, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

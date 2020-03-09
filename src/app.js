import express from "express";
import logger from "./setups/logger";

const app = express();
require("./setups/routes")(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => logger.info(`listening to port ${port}`));

module.exports = server;

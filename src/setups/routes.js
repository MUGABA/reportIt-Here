require("express-async-errors");
import redFlags from "../routes/redFlagRoutes";
import express from "express";

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/red-flags", redFlags);
};

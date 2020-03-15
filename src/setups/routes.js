require("express-async-errors");
import redFlags from "../routes/redFlagRoutes";
import interventions from "../routes/interventionsRoutes";
import user from "../routes/authRoutes";
import express from "express";

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/red-flags", redFlags);
  app.use("/api/v1/interventions", interventions);
  app.use("/api/v1/auth", user);
};

import _ from "lodash";

import incidents from "../database/models/incidentsQueries";
import validate from "../helpers/validations/validateIncident";
const redflagContraller = {
  async fetchAllRedflags(req, res) {
    const allRedflags = await incidents.getAllIncidents("red-flag");
    if (allRedflags.length === 0)
      res.send({ status: 400, error: "No redflags found" });

    return res.status(200).send({ status: 200, data: allRedflags });
  },
  async createRedflag(req, res) {
    const redflag = _.pick(req.body, [
      "createdBy",
      "type",
      "location",
      "status",
      "images",
      "videos",
      "comment"
    ]);
    const currentUser = req.user;
    redflag.createdBy = currentUser.userid;
    if (redflag.type !== "red-flag")
      return res
        .status(400)
        .send({ status: 400, message: "type must be red-flag" });
    const { error } = await validate.validateInput(redflag);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const createIt = await incidents.createAnIncident(redflag);
    return res.status(201).send({ status: 201, data: createIt });
  },
  async fetchSpecificRedflag(req, res) {
    const redFlagId = req.params.id;

    const results = await incidents.getSpecificIncident(parseInt(redFlagId));

    if (results.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    return res.status(200).send({ status: 200, data: results });
  },
  async deleteSpecificRedflag(req, res) {
    const redFlagId = req.params.id;

    const { userid } = req.user;

    const result = await incidents.getSpecificIncident(parseInt(redFlagId));

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    if (userid !== result[0].createdBy)
      return res.status(403).send({
        status: 403,
        message: "You cannot delete a red-flag you did not create"
      });

    const results = await incidents.deleteSpecificIncident(parseInt(redFlagId));

    if (!results)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    return res.status(200).send({
      status: 200,
      data: [
        { id: results.id, message: `redflag of id ${redFlagId} is deleted` }
      ]
    });
  },
  async updateRedflagComment(req, res) {
    const redflagId = req.params.id;
    const { userid } = req.user;

    const redflag = _.pick(req.body, ["comment"]);

    const { error } = await validate.validateComment(redflag);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const result = await incidents.getSpecificIncident(parseInt(redflagId));

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    if (userid !== result[0].createdBy)
      return res.status(403).send({
        status: 403,
        message: "You cannot delete a red-flag you did not create"
      });

    await incidents.updateIncidentsComment(redflag.comment, redflagId);

    return res.status(200).send({
      status: 200,
      data: {
        id: redflagId,
        message: "Updated red-flag record’s comment"
      }
    });
  },
  async updateRedflagLocation(req, res) {
    const redflagId = req.params.id;
    const { userid } = req.user;
    const redflag = _.pick(req.body, ["location"]);

    const { error } = await validate.validateLocation(redflag);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const result = await incidents.getSpecificIncident(parseInt(redflagId));

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    if (userid !== result[0].createdBy)
      return res.status(403).send({
        status: 403,
        message: "You cannot delete a red-flag you did not create"
      });

    await incidents.updateIncidentsComment(redflag.location, redflagId);

    return res.status(200).send({
      status: 200,
      data: {
        id: redflagId,
        message: "Updated red-flag record’s location"
      }
    });
  },
  async updateRedflagStatus(req, res) {
    const redflagId = req.params.id;
    const redflag = _.pick(req.body, ["status"]);

    const { error } = await validate.validateStatus(redflag);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const result = await incidents.getSpecificIncident(parseInt(redflagId));

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    await incidents.updateIncidentsStatus(redflag.status, redflagId);

    return res.status(200).send({
      status: 200,
      data: {
        id: redflagId,
        message: "Updated red-flag record’s status"
      }
    });
  }
};

export default redflagContraller;

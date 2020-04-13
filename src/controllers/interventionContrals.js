import _ from "lodash";

import incidents from "../database/models/incidentsQueries";
import validate from "../helpers/validations/validateIncident";
const interventionContraller = {
  async fetchAllInterventions(req, res) {
    const allRedflags = await incidents.getAllIncidents("intervention");
    if (allRedflags.length === 0)
      return res
        .status(400)
        .send({ status: 400, error: "No interventions found" });

    return res.status(200).send({ status: 200, data: allRedflags });
  },
  async createAnIntervention(req, res) {
    const intervention = _.pick(req.body, [
      "createdBy",
      "type",
      "location",
      "status",
      "images",
      "videos",
      "comment"
    ]);
    const { userid } = req.user;

    if (intervention.type !== "intervention")
      return res
        .status(400)
        .send({ status: 400, error: "type must be intervention" });
    const { error } = await validate.validateInput(intervention);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const createIt = await incidents.createAnIncident(userid, intervention);

    return res.status(201).send({ status: 201, data: createIt });
  },
  async fetchSpecificIntervention(req, res) {
    const interventionId = req.params.id;

    const results = await incidents.getSpecificIncident(
      parseInt(interventionId)
    );

    if (results.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "intervention does not exist" });

    return res.status(200).send({ status: 200, data: results });
  },
  async deleteSpecificIntervention(req, res) {
    const interventionId = req.params.id;

    const { userid, email, isadmin } = req.user;

    const result = await incidents.getSpecificIncident(
      parseInt(interventionId)
    );

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "intervention does not exist" });

    if (userid !== result[0].createdby)
      return res.status(403).send({
        status: 403,
        message: "You cannot delete an intervention you did not create"
      });

    await incidents.deleteSpecificIncident(parseInt(interventionId));
    return res.status(200).send({
      status: 200,
      data: {
        id: interventionId,
        message: `intervention of id ${interventionId} is deleted`
      }
    });
  },
  async updateInterventionComment(req, res) {
    const interventionId = req.params.id;
    const { userid } = req.user;
    const intervention = _.pick(req.body, ["comment"]);

    const { error } = await validate.validateComment(intervention);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const result = await incidents.getSpecificIncident(
      parseInt(interventionId)
    );

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "intervention does not exist" });

    if (userid !== result[0].createdby)
      return res.status(403).send({
        status: 403,
        error: "You cannot update an intervention you did not create"
      });

    await incidents.updateIncidentsComment(
      intervention.comment,
      interventionId
    );

    return res.status(200).send({
      status: 200,
      data: {
        id: interventionId,
        message: "Updated interventions record’s comment"
      }
    });
  },
  async updateInterventionLocation(req, res) {
    const interventionId = req.params.id;
    const { userid } = req.user;
    const intervention = _.pick(req.body, ["location"]);

    const { error } = await validate.validateLocation(intervention);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const result = await incidents.getSpecificIncident(
      parseInt(interventionId)
    );

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "intervention does not exist" });

    if (userid !== result[0].createdby)
      return res.status(403).send({
        status: 403,
        error:
          "You cannot update the location of an intervention you did not create"
      });

    await incidents.updateIncidentsComment(
      intervention.location,
      interventionId
    );

    return res.status(200).send({
      status: 200,
      data: {
        id: interventionId,
        message: "Updated intervention record’s location"
      }
    });
  },
  async updateInterventionStatus(req, res) {
    const interventionId = req.params.id;
    const intervention = _.pick(req.body, ["status"]);

    const { error } = await validate.validateStatus(intervention);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const result = await incidents.getSpecificIncident(
      parseInt(interventionId)
    );

    if (result.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "intervention does not exist" });

    await incidents.updateIncidentsStatus(intervention.status, interventionId);

    return res.status(200).send({
      status: 200,
      data: {
        id: interventionId,
        message: "Updated intervention record’s status"
      }
    });
  }
};

export default interventionContraller;

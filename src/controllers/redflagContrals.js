import _ from "lodash";

import redFlag from "../database/models/redflagQueries";
import validate from "../helpers/validations/validateIncident";
const redflagContraller = {
  async fetchAllRedflags(req, res) {
    const allRedflags = redFlag.getAllRedflag();
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

    const { error } = await validate.validateInput(redflag);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const createIt = await redFlag.createRedflag(redflag);

    return res.status(201).send({ status: 201, data: createIt });
  },
  fetchSpecificRedflag(req, res) {
    const redFlagId = req.params.id;

    const results = redFlag.getSpecificRedflag(parseInt(redFlagId));

    if (results.length === 0)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    return res.status(200).send({ status: 200, data: results });
  },
  deleteSpecificRedflag(req, res) {
    const redFlagId = req.params.id;

    const results = redFlag.deleteSpecificRedflag(parseInt(redFlagId));

    if (!results)
      return res
        .status(404)
        .send({ status: 404, error: "redflag does not exist" });

    return res.status(200).send({
      status: 200,
      data: [
        { id: results.id, message: `redflag if id ${redFlagId} is deleted` }
      ]
    });
  }
};

export default redflagContraller;

import Joi from "@hapi/joi";

const validateIncident = {
  validateInput(input) {
    const schema = Joi.object().keys({
      createdBy: Joi.number().required(),
      type: Joi.string().required(),
      location: Joi.string().required(),
      status: Joi.string().required(),
      images: Joi.array(),
      videos: Joi.array(),
      comment: Joi.string().required()
    });
    return schema.validate(input);
  }
};

export default validateIncident;

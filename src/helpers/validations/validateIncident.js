import Joi from "@hapi/joi";

const validateIncident = {
  validateInput(input) {
    const schema = Joi.object().keys({
      createdBy: Joi.number(),
      type: Joi.string().required(),
      location: Joi.string().required(),
      status: Joi.string().required(),
      images: Joi.array(),
      videos: Joi.array(),
      comment: Joi.string().required()
    });
    return schema.validate(input);
  },
  validateComment(input) {
    const schema = Joi.object().keys({
      comment: Joi.string()
        .max(200)
        .required()
    });
    return schema.validate(input);
  },
  validateStatus(input) {
    const schema = Joi.object().keys({
      status: Joi.string()
        .valid("under investigation", "resolved", "rejected")
        .required()
    });
    return schema.validate(input);
  },
  validateLocation(input) {
    const schema = Joi.object().keys({
      location: Joi.string()
        .max(200)
        .required()
    });
    return schema.validate(input);
  }
};

export default validateIncident;

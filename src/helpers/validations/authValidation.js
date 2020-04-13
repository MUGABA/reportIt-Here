import Joi from "@hapi/joi";

const Validate = {
  validateUser(input) {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .max(50)
        .required(),
      lastname: Joi.string()
        .max(50)
        .required(),
      othernames: Joi.string().max(50),
      username: Joi.string()
        .max(50)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .alphanum()
        .max(10)
        .required(),
      phonenumber: Joi.string()
        .max(15)
        .required(),
      isadmin: Joi.bool()
    });

    return schema.validate(input);
  },
  validateLogin(input) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .alphanum()
        .max(10)
        .required()
    });
    return schema.validate(input);
  }
};

export default Validate;

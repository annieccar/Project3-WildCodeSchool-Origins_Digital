const { validationResult } = require("express-validator");

const validateSchema = (schema) => [
  schema,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() });
    }
    return next();
  },
];

module.exports = validateSchema;

const { checkSchema } = require("express-validator");

const loginUserSchema = checkSchema({
  email: {
    exists: {
      errorMessage: "An email is required",
      options: {
        checkFalsy: true,
      },
    },
    isEmail: {
      errorMessage: "Your must enter a valid email address",
    },
  },
  password: {
    exists: {
      errorMessage: "A password is required",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 8, max: 64 },
      errorMessage: "Your password must contain between 8 and 64 characters",
    },
  },
});

module.exports = loginUserSchema;

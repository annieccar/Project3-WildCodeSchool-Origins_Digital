const models = require("../models");
const { hashPassword } = require("../helpers/argon2Helper");

const adminUserPasswordUpdate = async (req, res, next) => {
  try {
    if (!req.body.password) {
      const [[user]] = await models.users.find(req.params.id);
      req.body.hashedPassword = user.hashedPassword;
      next();
    } else {
      req.body.hashedPassword = await hashPassword(req.body.password);
      delete req.body.password;
      next();
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = adminUserPasswordUpdate;

const models = require("../models");

const checkUserDoesntExists = async (req, res, next) => {
  const [userByEmail] = await models.users.findOneByEmail(req.body.email);

  if (userByEmail.length) {
    return res
      .status(400)
      .json({ message: "An user with this email adress already exists" });
  }
  const [userByUsername] = await models.users.findOneByUsername(
    req.body.username
  );

  if (userByUsername.length) {
    return res
      .status(400)
      .json({ message: "An user with this username already exists" });
  }

  return next();
};

module.exports = checkUserDoesntExists;

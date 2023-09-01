const models = require("../models");

const checkUserExists = async (req, res, next) => {
  const [user] = await models.users.find(req.params.id);

  if (user.length === 0) {
    return res.status(400).json({ message: "user does not exist" });
  }

  return next();
};

module.exports = checkUserExists;

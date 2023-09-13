const models = require("../models");

const checkUserExistsByEmailWithPassword = async (req, res, next) => {
  try {
    const [users] = await models.users.findOneByEmail(req.body.email);
    if (users.length) {
      const [user] = users;
      req.user = user;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = checkUserExistsByEmailWithPassword;

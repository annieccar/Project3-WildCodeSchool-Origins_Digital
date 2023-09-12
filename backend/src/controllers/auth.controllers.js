const models = require("../models");

const signIn = async (req, res) => {
  try {
    const [result] = await models.users.findOneByEmail(req.body.email);
    if (req.body.password === result[0].hashedpassword) {
      delete req.body.password;
      const informations = result[0];
      delete informations.hashedpassword;

      // JWT Authentication to implement
      res.status(201).json({
        ...informations,
      });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const signUp = async (req, res) => {
  try {
    const [result] = await models.users.insert(req.body);
    if (result.affectedRows) {
      delete req.body.password_confirmation;
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signUp,
};

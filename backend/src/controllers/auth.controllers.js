const models = require("../models");

const signIn = async (req, res) => {
  await models.users
    .findOneByEmail(req.body.email)
    .then(([result]) => {
      if (req.body.password === result[0].password) {
        delete req.body.password;
        const informations = result[0];
        delete informations.password;

        res.status(201).json({
          ...informations,
        });
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const signUp = async (req, res) => {
  await models.users
    .insert(req.body)
    .then(([result]) => {
      if (result.affectedRows) {
        delete req.body.password;
        delete req.body.password_confirmation;
        res.status(201).json({ id: result.insertId, ...req.body });
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  signIn,
  signUp,
};

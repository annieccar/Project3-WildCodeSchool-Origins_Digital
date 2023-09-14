const models = require("../models");
const { encodeJWT } = require("../helpers/jwtHelper");
const { verifyPassword } = require("../helpers/argon2Helper");

const login = async (req, res) => {
  try {
    const isVerified = await verifyPassword(
      req.user.hashedPassword,
      req.body.password
    );
    if (isVerified) {
      delete req.user.hashedPassword;

      const token = encodeJWT(req.user);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
      });
      res.status(200).json(req.user);
    } else {
      res.sendStatus(401);
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

const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = {
  login,
  signUp,
  logout,
};

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const encodeJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const decodeJWT = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { encodeJWT, decodeJWT };

const { decodeJWT } = require("../helpers/jwtHelper");

const authorization = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (token) {
    const data = decodeJWT(token);
    req.user = data;
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = authorization;

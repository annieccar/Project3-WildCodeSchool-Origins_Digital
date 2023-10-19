const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const { TokenExpiredError, sign, verify } = jwt;

const encodeJWT = (payload) => {
  return sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized: access token has expired." });
  }

  return res.status(401).send({ message: "Unauthorized." });
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).send({
      message: "No token provided.",
    });
  }
  return verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    return next();
  });
};

const verifyUser = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (token) {
    verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.user = decoded;
      delete req.user.iat;
      delete req.user.exp;
      return next();
    });
  }
};

module.exports = { encodeJWT, verifyJWT, verifyUser };

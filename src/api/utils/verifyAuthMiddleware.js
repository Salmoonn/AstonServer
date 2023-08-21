const jwt = require("jsonwebtoken");

const { signatureAccess } = require("./config");

const verifyAuthMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, signatureAccess);
    req.user = decoded;
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
  return next();
};

module.exports = verifyAuthMiddleware;

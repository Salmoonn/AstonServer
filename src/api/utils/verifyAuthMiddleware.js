const jwt = require("jsonwebtoken");

const { signatureAccess, minLifeTimeAfterExpired } = require("./config");

const verifyAuthMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.setHeader("isTokenExpired", true);
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, signatureAccess);
    res.setHeader("isTokenExpired", false);
    req.user = decoded;
  } catch (err) {
    try {
      const decoded = jwt.verify(token, signatureAccess, {
        ignoreExpiration: true,
      });

      res.setHeader("isTokenExpired", true);

      if (Date.now() / 1000 - decoded.exp < minLifeTimeAfterExpired) {
        req.user = decoded;
      } else return res.sendStatus(401);
    } catch {
      return res.sendStatus(401);
    }
  }
  return next();
};

module.exports = verifyAuthMiddleware;

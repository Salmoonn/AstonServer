const jwt = require("jsonwebtoken");

const { signayureRefresh } = require("./config");

const verifyRefreshTokenMiddleware = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(refreshToken, signayureRefresh);
    req.user = decoded;
  } catch (err) {
    return res.sendStatus(401);
  }
  return next();
};

module.exports = verifyRefreshTokenMiddleware;

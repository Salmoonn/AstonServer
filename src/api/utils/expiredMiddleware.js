const isTokenExpired = require("./jwt");

const urlSkip = ["/login", "/refresh", "/logout"];

const expiredMiddleware = (req, res, next) => {
  if (urlSkip.includes(req.url)) {
    res.setHeader("isTokenExpired", false);
    return next();
  }
  if (!req.headers.authorization) {
    res.setHeader("isTokenExpired", false);
    return next();
  }

  const isExpired = isTokenExpired(req.headers.authorization.split(" ")[1]);

  if (isExpired) {
    res.setHeader("isTokenExpired", true);
  } else {
    res.setHeader("isTokenExpired", false);
  }
  return next();
};

module.exports = expiredMiddleware;

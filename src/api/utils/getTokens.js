const jwt = require("jsonwebtoken");

const {
  signatureAccess,
  signayureRefresh,
  accessTokenAge,
  refreshTokenAge,
} = require("./config");

const getTokens = (login) => ({
  accessToken: jwt.sign({ login }, signatureAccess, {
    expiresIn: `${accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({ login }, signayureRefresh, {
    expiresIn: `${refreshTokenAge}s`,
  }),
});

module.exports = getTokens;

const config = {
  secret: "2a3b72",
  signatureAccess: "Jdajy2SDEW432das_access",
  signayureRefresh: "Jdajy2SDEW432das_refresh",
  refreshTokenAge: 60 * 60 * 24 * 14, //14d
  accessTokenAge: 60 * 60 * 24 * 2, //2d
  minLifeTimeAfterExpired: 60 * 60 * 5, //5h
};

module.exports = config;

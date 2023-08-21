const config = {
  secret: "2a3b72",
  signatureAccess: "Jdajy2SDEW432das_access",
  signayureRefresh: "Jdajy2SDEW432das_refresh",
  accessTokenAge: 60 * 60 * 24 * 2, //2d
  refreshTokenAge: 60 * 60 * 24 * 14, //14d
  minLifeTimeForUpdate: 60 * 60 * 5, //5h
};

module.exports = config;

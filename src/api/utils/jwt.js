const { minLifeTimeForUpdate } = require("./config");

const getUnixTime = () => Math.round(+Date.now() / 1000);

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  const tokenInfo = token.split(".")[1];
  const tokenInfoDecoded = atob(tokenInfo);
  const { exp } = JSON.parse(tokenInfoDecoded);

  const tokenLeftTime = exp - getUnixTime();

  return tokenLeftTime < minLifeTimeForUpdate;
};

module.exports = isTokenExpired;

const fs = require("fs");

const getUser = (login) => {
  return JSON.parse(fs.readFileSync(`src/data/users/${login}.json`));
};

module.exports = getUser;

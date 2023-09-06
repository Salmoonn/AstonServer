const fs = require("fs");

const getItem = (name) => {
  return JSON.parse(fs.readFileSync(`src/data/items/${name}.json`));
};

module.exports = getItem;

const fs = require("fs");
const getItem = require("./getItem");

const getCollection = (name) => {
  const collection = JSON.parse(
    fs.readFileSync(`src/data/collections/${name}.json`)
  );
  collection.body = collection.body.map((e) => getItem(e));
  return collection;
};

module.exports = getCollection;

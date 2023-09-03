const express = require("express");
const fs = require("fs");
const path = require("path");

const searchRouter = express.Router();

let { collections, items } = require("../../data/search.json");

const pathSearch = path.resolve("src/data/search.json");

fs.watchFile(pathSearch, async () => {
  let data = await JSON.parse(fs.readFileSync(pathSearch));
  users = data.users;
  items = data.items;
});

searchRouter.get("/searchItem", (req, res) => {
  const filter = req.query.search.toLocaleLowerCase();

  const filterItems = items.filter((e) =>
    e.name.toLocaleLowerCase().includes(filter)
  );

  const resItems = filterItems.map((e) =>
    require(`../../data/items/${e.id}.json`)
  );

  res.send(resItems.length === 0 ? null : resItems);
});

searchRouter.get("/searchCollection", (req, res) => {
  const filter = req.query.search.toLocaleLowerCase();

  const filterCollections = collections.filter((e) =>
    e.name.toLocaleLowerCase().includes(filter)
  );

  const resCollections = filterCollections.map((e) =>
    require(`../../data/collections/${e.id}.json`)
  );

  res.send(resCollections.length === 0 ? null : resCollections);
});

module.exports = searchRouter;

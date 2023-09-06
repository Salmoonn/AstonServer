const express = require("express");
const fs = require("fs");
const path = require("path");
const getCollection = require("../utils/getCollection");
const getItem = require("../utils/getItem");

const searchRouter = express.Router();

//SEARCH ITEM
searchRouter.get("/searchItem", (req, res) => {
  const filter = req.query.search.toLowerCase();

  const { items } = JSON.parse(fs.readFileSync("src/data/search.json"));

  const filterItems = items.filter((e) =>
    e.name.toLowerCase().includes(filter)
  );

  const resItems = filterItems.map((e) => getItem(e.id));

  res.send(resItems.length === 0 ? null : resItems);
});

//SEARCH COLLECTION
searchRouter.get("/searchCollection", (req, res) => {
  const filter = req.query.search.toLowerCase();

  const { collections } = JSON.parse(fs.readFileSync("src/data/search.json"));

  const filterCollections = collections.filter((e) =>
    e.name.toLowerCase().includes(filter)
  );

  const resCollections = filterCollections.map((e) => getCollection(e.id));

  res.send(resCollections.length === 0 ? null : resCollections);
});

module.exports = searchRouter;

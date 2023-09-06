const express = require("express");
const fs = require("fs");
const path = require("path");
const getCollection = require("../utils/getCollection");

const collectionRouter = express.Router();

collectionRouter.get("/topcollections", (req, res) => {
  const topCollections = [];

  topCollections.push(getCollection("2e6a"));
  topCollections.push(getCollection("490b"));
  topCollections.push(getCollection("2e6a"));

  res.send(topCollections);
});

collectionRouter.get("/c/:id", (req, res) => {
  const src = path.resolve("src/data/collections/" + req.params.id + ".json");
  fs.access(src, (err) => (err ? res.sendStatus(404) : res.sendFile(src)));
});

module.exports = collectionRouter;

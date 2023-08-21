const express = require("express");
const fs = require("fs");

const itemRouter = express.Router();

itemRouter.get("/getitem/:id", (req, res) => {
  const item = require(`../../data/items/${req.params.id}.json`);
  item ? res.send(item) : res.sendStatus(404);
});

module.exports = itemRouter;

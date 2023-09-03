const express = require("express");
const fs = require("fs");

const itemRouter = express.Router();

itemRouter.get("/item", (req, res) => {
  try {
    const item = require(`../../data/items/${req.query.id}.json`);
    res.send(item);
  } catch {
    res.sendStatus(404);
  }
});

itemRouter.get("/moreitems", (req, res) => {
  const { id } = req.query;

  try {
    let moreItems = [];

    const { creator } = JSON.parse(
      fs.readFileSync(`src/data/items/${id}.json`)
    );
    const { items, collections } = JSON.parse(
      fs.readFileSync(`src/data/users/${creator}.json`)
    );

    if (items) {
      moreItems = moreItems.concat(items);
    }
    if (collections) {
      collections.map((e) => (moreItems = moreItems.concat(e.body)));
    }

    moreItems = moreItems.filter((e) => e.id !== id);

    res.send(moreItems.length !== 0 ? moreItems : null);
  } catch {
    res.sendStatus(404);
  }
});

module.exports = itemRouter;

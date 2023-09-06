const express = require("express");
const fs = require("fs");
const getCollection = require("../utils/getCollection");
const getItem = require("../utils/getItem");

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
    let moreItems = null;

    const { creator } = JSON.parse(
      fs.readFileSync(`src/data/items/${id}.json`)
    );

    const user = JSON.parse(fs.readFileSync(`src/data/users/${creator}.json`));

    const items = user.items ? user.items.map((e) => getItem(e)) : null;

    const collections = user.collections
      ? user.collections.map((e) => getCollection(e))
      : null;

    const collectionItems = collections
      ? collections.map((e) => e.body).flat()
      : null;

    if (items) {
      moreItems = items;
    }
    if (collectionItems) {
      if (moreItems) {
        moreItems = moreItems.concat(collectionItems);
      } else {
        moreItems = collectionItems;
      }
    }

    moreItems = moreItems.filter((e) => e.id !== id);

    res.send(moreItems.length !== 0 ? moreItems : null);
  } catch {
    res.sendStatus(404);
  }
});

module.exports = itemRouter;

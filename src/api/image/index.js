const express = require("express");
const fs = require("fs");
const path = require("path");

const imageRouter = express.Router();

//ITEM
imageRouter.get("/i/:id", (req, res) => {
  const srcItem = path.resolve(
    "src/data/images/items/" + req.params.id + ".png"
  );
  fs.access(srcItem, (err) =>
    err ? res.sendStatus(404) : res.sendFile(srcItem)
  );
});

//AVATAR
imageRouter.get("/a/:id", (req, res) => {
  const srcAvatar = path.resolve(
    "src/data/images/avatars/" + req.params.id + ".png"
  );
  fs.access(srcAvatar, (err) =>
    err ? res.sendStatus(404) : res.sendFile(srcAvatar)
  );
});

//BANNER
imageRouter.get("/b/:id", (req, res) => {
  const srcBanner = path.resolve(
    "src/data/images/banners/" + req.params.id + ".png"
  );
  fs.access(srcBanner, (err) =>
    err ? res.sendStatus(404) : res.sendFile(srcBanner)
  );
});

module.exports = imageRouter;

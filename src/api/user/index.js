const express = require("express");
const fs = require("fs");
const path = require("path");
const getCollection = require("../utils/getCollection");
const getItem = require("../utils/getItem");
const getUser = require("../utils/getUser");

const userRouter = express.Router();

userRouter.get("/user", (req, res) => {
  const { id } = req.query;

  try {
    const user = JSON.parse(fs.readFileSync(`src/data/users/${id}.json`));
    user.items = user.items ? user.items.map((e) => getItem(e)) : null;
    user.collections = user.collections
      ? user.collections.map((e) => getCollection(e))
      : null;
    res.send(user);
  } catch {
    res.sendStatus(404);
  }
});

userRouter.get("/topusers", (req, res) => {
  const topcreators = [];
  topcreators.push(getUser("gravityone"));
  topcreators.push(getUser("animakid"));
  topcreators.push(getUser("bluewhale"));
  topcreators.push(getUser("digilab"));
  topcreators.push(getUser("juanie"));
  topcreators.push(getUser("shroomie"));
  topcreators.push(getUser("robotica"));
  topcreators.push(getUser("mrfox"));
  topcreators.push(getUser("dotgu"));
  topcreators.push(getUser("rustyrobot"));
  topcreators.push(getUser("keepitreal"));
  topcreators.push(getUser("ghiblier"));

  res.send(topcreators);
});

module.exports = userRouter;

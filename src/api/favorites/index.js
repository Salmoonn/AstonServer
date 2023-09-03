const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");

const verifyAuthMiddleware = require("../utils/verifyAuthMiddleware");

const favoritesRouter = express.Router();

favoritesRouter.post("/togglefavorites", verifyAuthMiddleware, (req, res) => {
  const { itemId } = req.body;
  const { login } = req.user;

  let user = require(`../../data/private/users/${login}.json`);
  const userPath = `./src/data/private/users/${login}.json`;

  fs.watchFile(userPath, async () => {
    user = await JSON.parse(fs.readFileSync(userPath));
  });

  try {
    if (user.favorites.find((e) => e.id === itemId)) {
      user.favorites = user.favorites.filter((e) => e.id !== itemId);
      fs.writeFileSync(userPath, JSON.stringify(user));

      res.send({ isDelete: true });
    } else {
      user.favorites.push(
        JSON.parse(fs.readFileSync(`src/data/items/${itemId}.json`))
      );
      fs.writeFileSync(userPath, JSON.stringify(user));

      res.send({ isAdd: true });
    }
  } catch {
    res.send({ error: true });
  }
});

favoritesRouter.get("/getfavorites", verifyAuthMiddleware, (req, res) => {
  const { login } = req.user;

  const { favorites } = JSON.parse(
    fs.readFileSync(`src/data/private/users/${login}.json`)
  );

  res.send(favorites || null);
});

module.exports = favoritesRouter;

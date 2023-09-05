const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const getItem = require("../utils/getItem");

const verifyAuthMiddleware = require("../utils/verifyAuthMiddleware");

const favoritesRouter = express.Router();

favoritesRouter.post("/togglefavorites", verifyAuthMiddleware, (req, res) => {
  const { itemId } = req.body;
  const { login } = req.user;

  const userPath = `src/data/users/${login}.json`;
  const userPrivatePath = `src/data/private/users/${login}.json`;

  try {
    const user = JSON.parse(fs.readFileSync(userPath));
    const userPrivate = JSON.parse(fs.readFileSync(userPrivatePath));

    if (userPrivate.favorites.find((e) => e === itemId)) {
      userPrivate.favorites = userPrivate.favorites.filter((e) => e !== itemId);
      fs.writeFileSync(userPrivatePath, JSON.stringify(userPrivate));
    } else {
      userPrivate.favorites.push(itemId);
      fs.writeFileSync(userPrivatePath, JSON.stringify(userPrivate));
    }

    user.history = userPrivate.history;
    user.favorites =
      userPrivate.favorites.length !== 0
        ? userPrivate.favorites.map((e) => getItem(e))
        : null;

    res.send(user);
  } catch {
    res.sendStatus(500);
  }
});

// favoritesRouter.get("/getfavorites", verifyAuthMiddleware, (req, res) => {
//   const { login } = req.user;

//   const { favoriteIds } = JSON.parse(
//     fs.readFileSync(`src/data/private/users/${login}.json`)
//   );

//   const favorites = favoriteIds.map((e) =>
//     JSON.parse(fs.readFileSync(`src/data/items/${e}.json`))
//   );

//   res.send(favorites);
// });

module.exports = favoritesRouter;

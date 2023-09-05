const express = require("express");
const fs = require("fs");
const verifyAuthMiddleware = require("../utils/verifyAuthMiddleware");

const historyRouter = express.Router();

historyRouter.post("/posthistory", verifyAuthMiddleware, (req, res) => {
  const { login } = req.user;
  const { search } = req.body;

  const path = `./src/data/private/users/${login}.json`;

  let user = JSON.parse(fs.readFileSync(path));

  user.history.unshift(search);

  if (search !== "") {
    fs.writeFileSync(path, JSON.stringify(user));
  } else {
    res.send({ isWrite: false });
  }

  res.send({ isWrite: true });
});

historyRouter.delete("/deletehistory", verifyAuthMiddleware, (req, res) => {
  const { login } = req.user;
  const path = `src/data/private/users/${login}.json`;

  const user = JSON.parse(fs.readFileSync(path));
  user.history = [];
  fs.writeFileSync(path, JSON.stringify(user));
  res.send();
});

module.exports = historyRouter;

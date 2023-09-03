const express = require("express");
const fs = require("fs");
const verifyAuthMiddleware = require("../utils/verifyAuthMiddleware");

const historyRouter = express.Router();

historyRouter.post("/posthistory", verifyAuthMiddleware, (req, res) => {
  const { login } = req.user;
  const { search } = req.body;

  let user = require(`../../data/private/users/${login}.json`);
  const userPath = `./src/data/private/users/${login}.json`;

  fs.watchFile(userPath, async () => {
    user = await JSON.parse(fs.readFileSync(userPath));
  });

  user.history.push(search);

  fs.writeFileSync(userPath, JSON.stringify(user));

  res.send({ isWrite: true });
});

module.exports = historyRouter;

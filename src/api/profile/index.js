const express = require("express");
const fs = require("fs");
const path = require("path");

const profileRouter = express.Router();

profileRouter.get("/:id", (req, res) => {
  const users = require("../../data/users.json");
  const user = users.find((e) => e.login === req.params.id);

  user ? res.send(user) : res.sendStatus(404);
});

module.exports = profileRouter;

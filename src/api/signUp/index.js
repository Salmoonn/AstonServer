const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const cookie = require("cookie");
const path = require("path");

const config = require("../utils/config");
const addUser = require("../utils/addUser");
const addHash = require("../utils/addHash");
const getTokens = require("../utils/getTokens");

let users = require("../../data/users.json");
const pathUsers = path.resolve("src/data/users.json");
fs.watchFile(pathUsers, async () => {
  const data = fs.readFileSync(pathUsers);
  users = await JSON.parse(data);
});

const signUpRouter = express.Router();

//SIGNUP
signUpRouter.post("/signup", async (req, res) => {
  const { login, email, password } = req.body;

  const response = {
    isValidLogin: true,
    isValidEmail: true,
    accessToken: "",
  };

  if (users.find((e) => e.login === login)) {
    return res.send({ isNotValidLogin: true });
  }

  if (users.find((e) => e.email === email)) {
    return res.send({ isNotValidEmail: true });
  }

  await Promise.all([addUser(login, email), addHash(login, email, password)]);

  const { accessToken, refreshToken } = getTokens(login);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: config.refreshTokenAge,
    })
  );

  res.send({ accessToken });
});

module.exports = signUpRouter;

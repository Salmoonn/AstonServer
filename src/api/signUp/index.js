const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const cookie = require("cookie");
const path = require("path");

const config = require("../utils/config");
const addUser = require("../utils/addUser");
const addHash = require("../utils/addHash");
const getTokens = require("../utils/getTokens");

let hashs = require("../../data/hashs.json");
const pathHashs = path.resolve("src/data/hashs.json");
fs.watchFile(pathHashs, async () => {
  const data = fs.readFileSync(pathHashs);
  hashs = await JSON.parse(data);
});

const signUpRouter = express.Router();

//SIGNUP
signUpRouter.post("/signup", async (req, res) => {
  const { login, email, password } = req.body;

  if (hashs.find((e) => e.login === login)) {
    return res.send({ isNotValidLogin: true });
  }

  if (hashs.find((e) => e.email === email)) {
    return res.send({ isNotValidEmail: true });
  }

  addUser(login, email);
  addHash(login, email, password);

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

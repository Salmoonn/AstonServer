const express = require("express");
const crypto = require("crypto");
const cookie = require("cookie");
const path = require("path");
const fs = require("fs");

const config = require("../utils/config");
const getTokens = require("../utils/getTokens");
const verifyAuthMiddleware = require("../utils/verifyAuthMiddleware");
const verifyRefreshTokenMiddleware = require("../utils/verifyRefreshTokenMiddleware");

let hashs = require("../../data/hashs.json");
const pathHashs = path.resolve("src/data/hashs.json");
fs.watchFile(pathHashs, async () => {
  const data = fs.readFileSync(pathHashs);
  hashs = await JSON.parse(data);
});

let users = require("../../data/users.json");
const pathUsers = path.resolve("src/data/users.json");
fs.watchFile(pathUsers, async () => {
  const data = fs.readFileSync(pathUsers);
  users = await JSON.parse(data);
});

const authRouter = express.Router();

//LOGIN
authRouter.post("/login", (req, res) => {
  const { login, password } = req.body;

  const hash = crypto
    .createHmac("sha256", config.secret)
    .update(password)
    .digest("hex");

  const user =
    users.find((e) => e.login === login) ||
    users.find((e) => e.email === login);

  if (!user) {
    return res.send({ isNotValidData: true });
  }

  const isVerifiedPassword =
    hash === hashs.find((e) => e.login === user.login).hash;

  if (!isVerifiedPassword) {
    return res.send({ isNotValidData: true });
  }

  const { accessToken, refreshToken } = getTokens(user.login);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: config.refreshTokenAge,
    })
  );

  res.send({ accessToken });
});

//LOGOUT
authRouter.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    })
  );
  res.sendStatus(200);
});

//PROFILE
authRouter.get("/profile", verifyAuthMiddleware, (req, res) => {
  const login = req.user.login;

  const user = users.find((e) => e.login === login || e.email === login);

  res.send(user);
});

//REFRESH
authRouter.get("/refresh", verifyRefreshTokenMiddleware, (req, res) => {
  const { accessToken, refreshToken } = getTokens(req.user.login);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: config.refreshTokenAge,
    })
  );
  res.send({ accessToken });
});

module.exports = authRouter;

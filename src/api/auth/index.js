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

const authRouter = express.Router();

//LOGIN
authRouter.post("/login", (req, res) => {
  const { login, password } = req.body;

  const hash = crypto
    .createHmac("sha256", config.secret)
    .update(password)
    .digest("hex");

  const user =
    hashs.find((e) => e.login === login) ||
    hashs.find((e) => e.email === login);

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

  const srcUser = `src/data/users/${login}.json`;
  const srcPrivateUser = `src/data/private/users/${login}.json`;

  try {
    const user = JSON.parse(fs.readFileSync(srcUser));
    let { favorites, history } = JSON.parse(fs.readFileSync(srcPrivateUser));
    favorites = favorites.length !== 0 ? favorites : null;
    history = history.length !== 0 ? history : null;

    res.send({ ...user, favorites, history });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(404);
  }
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

const express = require("express");
const fs = require("fs");
const path = require("path");

const userRouter = express.Router();

userRouter.get("/getprofile", (req, res) => {
  const { id } = req.query;

  try {
    const user = require(`../../data/users/${id}.json`);
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(404);
  }
});

module.exports = userRouter;

const express = require("express");
const cookieParser = require("cookie-parser");

const imageRouter = require("./src/api/image");
const collectionRouter = require("./src/api/collection");
const signUpRouter = require("./src/api/signUp");
const authRouter = require("./src/api/auth");
const profileRouter = require("./src/api/profile");
const itemRouter = require("./src/api/item");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(imageRouter);
app.use(collectionRouter);
app.use(signUpRouter);
app.use(authRouter);
app.use(profileRouter);
app.use(itemRouter);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server listens port: ${PORT}`));

const express = require("express");
const cookieParser = require("cookie-parser");

const imageRouter = require("./src/api/image");
const collectionRouter = require("./src/api/collection");
const signUpRouter = require("./src/api/signUp");
const authRouter = require("./src/api/auth");
const userRouter = require("./src/api/user");
const itemRouter = require("./src/api/item");
const searchRouter = require("./src/api/search");
const favoritesRouter = require("./src/api/favorites");
const historyRouter = require("./src/api/history");

const app = express();
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.append("Access-Control-Allow-Origin", "http://192.168.1.101:3000");
  res.append("Access-Control-Allow-Credentials", "true");
  res.append("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(signUpRouter);
app.use(userRouter);
app.use(imageRouter);
app.use(collectionRouter);
app.use(searchRouter);
app.use(itemRouter);
app.use(favoritesRouter);
app.use(historyRouter);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server listens port: ${PORT}`));

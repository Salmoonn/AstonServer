const fs = require("fs");
const path = require("path");

let users = require("../../data/users.json");
const pathUsers = path.resolve("src/data/users.json");
fs.watchFile(pathUsers, async () => {
  const data = fs.readFileSync(pathUsers);
  users = await JSON.parse(data);
});

const addUser = (login, email) => {
  const newUsers = [...users, createUser(login, email)];
  fs.writeFileSync("src/data/users.json", JSON.stringify(newUsers));
  return new Promise((resolve) =>
    fs.watchFile("src/data/users.json", () => resolve("user add"))
  );
};

const createUser = (login, email) => ({
  login,
  email,
  name: login,
  totalSale: 0,
  collection: null,
  volume: 0,
  sold: 0,
  followers: 0,
  bio: null,
  link: {
    globe: null,
    discord: null,
    youtube: null,
    twitter: null,
    instagram: null,
  },
  item: null,
  roles: ["user"],
});

module.exports = addUser;

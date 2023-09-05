const fs = require("fs");

const addUser = (login, email) => {
  const user = createUser(login, email);
  fs.writeFileSync(`src/data/users/${login}.json`, JSON.stringify(user));
  fs.writeFileSync(
    `src/data/private/users/${login}.json`,
    JSON.stringify({
      favorites: [],
      history: [],
    })
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
  collection: null,
  roles: ["user"],
});

module.exports = addUser;

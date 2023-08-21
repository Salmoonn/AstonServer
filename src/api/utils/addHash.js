const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const { secret } = require("../utils/config");

let hashs = require("../../data/hashs.json");
const pathHash = path.resolve("src/data/hashs.json");
fs.watchFile(pathHash, async () => {
  const data = fs.readFileSync(pathHash);
  hashs = await JSON.parse(data);
});

const addHash = (login, email, password) => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  const newHashs = [...hashs, { login, email, hash }];
  fs.writeFileSync("src/data/hashs.json", JSON.stringify(newHashs));

  return new Promise((resolve) =>
    fs.watchFile("src/data/hashs.json", () => resolve("hash add"))
  );
};

module.exports = addHash;

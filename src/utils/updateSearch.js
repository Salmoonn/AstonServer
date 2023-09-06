const fs = require("fs");

const search = JSON.parse(fs.readFileSync("src/data/search.json"));

const dir = fs.readdirSync("src/data/items");

const allItems = dir.map((e) =>
  JSON.parse(fs.readFileSync(`src/data/items/${e}`))
);

search.items = allItems.map((e) => ({ name: e.name, id: e.id }));

fs.writeFileSync("src/data/search.json", JSON.stringify(search));

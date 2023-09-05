const fs = require("fs");

const dir = fs.readdirSync("src/data/items");

dir.forEach((e) => {
  const item = JSON.parse(fs.readFileSync(`src/data/items/${e}`));
  const newItem = {
    id: item.id,
    creator: item.creator,
    name: item.name,
    price: Math.round(Math.random() * 10000) / 100,
    highestBid: Math.round(Math.random() * 10000) / 100,
    minted: Math.round(Math.random() * new Date()),
    description: item.description || null,
    tags: item?.tags?.[0] ? item.tags : null,
    collection: item?.collection?.[0] ? item.collection : null,
  };
  fs.writeFileSync(`src/data/items/${e}`, JSON.stringify(newItem));
});

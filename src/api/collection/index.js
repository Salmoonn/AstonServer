const express = require("express");
const fs = require("fs");
const path = require("path");

const collectionRouter = express.Router();

collectionRouter.get("/topcollections", (req, res) =>
  res.json([
    {
      id: "2e6a",
      name: "Mashroom",
      creator: "shroomie",
      images: [
        {
          id: "cea5",
          creator: "shroomie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "4be9",
          creator: "shroomie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "40c",
          creator: "shroomie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
      ],
    },
    {
      id: "490b",
      name: "Planets",
      creator: "juanie",
      images: [
        {
          id: "1cbe",
          creator: "juanie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "1d98",
          creator: "juanie",
          name: "NFT Name",
          price: 0.72,
          highestBid: 4.66,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "8ab2",
          creator: "juanie",
          name: "NFT Name",
          price: 0.43,
          highestBid: 7.8,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "61ce",
          creator: "juanie",
          name: "NFT Name",
          price: 0.29,
          highestBid: 4.08,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "703b",
          creator: "juanie",
          name: "NFT Name",
          price: 9.95,
          highestBid: 2.95,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "9859",
          creator: "juanie",
          name: "NFT Name",
          price: 1.21,
          highestBid: 3.94,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "baee",
          creator: "juanie",
          name: "NFT Name",
          price: 8.46,
          highestBid: 1.16,
          tags: ["planet"],
          collection: "490b",
        },
      ],
    },
    {
      id: "2e6a",
      name: "Mashroom",
      creator: "shroomie",
      images: [
        {
          id: "cea5",
          creator: "shroomie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "4be9",
          creator: "shroomie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
        {
          id: "40c",
          creator: "shroomie",
          name: "NFT Name",
          price: 1.85,
          highestBid: 3.91,
          tags: ["planet"],
          collection: "490b",
        },
      ],
    },
  ])
);

collectionRouter.get("/c/:id", (req, res) => {
  const src = path.resolve("src/data/collections/" + req.params.id + ".json");
  fs.access(src, (err) => (err ? res.sendStatus(404) : res.sendFile(src)));
});

module.exports = collectionRouter;
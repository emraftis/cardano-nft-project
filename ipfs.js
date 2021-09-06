const { BlockFrostIPFS } = require("@blockfrost/blockfrost-js");

const IPFS = new BlockFrostIPFS({
  projectId: "ow6M3YyXNYLETcHLZrE5aV2qri7ikAdF", // see: https://blockfrost.io
});

const loadtoIPFS = async (num) => {
  for (let i = num; i <= num; i++) {
    try {
      const added = await IPFS.add(`${__dirname}/output/${i}.png`);
      console.log("added", added);

      const pinned = await IPFS.pin(added.ipfs_hash);
      console.log("pinned", pinned);
    } catch (e) {
      console.log("error", e);
    }
  }
};

loadtoIPFS(86);

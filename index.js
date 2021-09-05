const fs = require("fs");
const myArgs = process.argv.slice(2);
const { layers, width, height } = require("./assets/config");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;
var metadata = [];
var attributes = [];
var hash = [];
var decodedHash = [];

const saveLayer = async (_canvas, _edition) => {
  fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
  let timestamp = Date.now();
  let temp = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: timestamp,
    attributes: attributes,
  };
  metadata.push(temp);
  attributes = [];
  hash = [];
  decodedhash = [];
};

const addAttributes = (_element, _layer) => {
  let temp = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity,
  };
  attributes.push(temp);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
  addAttributes(element, _layer);
  const drawnImage = await loadImage(`${_layer.location}/${element.fileName}`);
  context.drawImage(
    drawnImage,
    _layer.position.x,
    _layer.position.y,
    _layer.size.width,
    _layer.size.height
  );
  console.log(_layer.location);
  console.log(element.fileName);
  if (
    (element.fileName !== "none.png" &&
      _layer.location ===
        "/mnt/c/Users/Evan/documents/coding/cardano-nft-project/assets/back-weapons") ||
    _layer.location ===
      "/mnt/c/Users/Evan/documents/coding/cardano-nft-project/assets/wing-type" ||
    _layer.location ===
      "/mnt/c/Users/Evan/documents/coding/cardano-nft-project/assets/hats" ||
    _layer.location ===
      "/mnt/c/Users/Evan/documents/coding/cardano-nft-project/assets/top-layer-accessories"
  ) {
    fs.unlink(`${_layer.location}/${element.fileName}`, (err) => {
      if (err) throw err;
    });
  }
  saveLayer(canvas, _edition);
};

for (let i = 1; i <= edition; i++) {
  layers.forEach((layer) => {
    drawLayer(layer, i);
  });
  addMetadata(i);
  console.log(`Creating edition ${i}`);
}

fs.readFile("./output/_metadata.json", (err, data) => {
  if (err) throw err;
  fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
});

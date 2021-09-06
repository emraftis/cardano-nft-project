const fs = require("fs");
const myArgs = process.argv.slice(2);
const { layers, width, height } = require("./assets/config");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");
const editionSize = myArgs.length > 0 ? Number(myArgs[0]) : 1;
var metadata = [];
var attributes = [];

const saveLayer = async (_canvas, _edition) => {
  fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
  const longName = "Lil Turt " + _edition;
  const description = "";
  const image = "";

  let temp = {
    shortName: {
      name: longName,
      description: description,
      image: image,
      background: attributes[0].name,
      skin: attributes[4].name,
      eyes: attributes[5].name,
      head: attributes[6].name,
      shell: attributes[3].name,
      handheld: attributes[7].name,
      weapons: attributes[1].name,
      wings: attributes[2].name,
    },
  };
  metadata.push(temp);
  attributes = [];
};

const addAttributes = (_element, _layer) => {
  let temp = {
    layer: _layer.name,
    name: _element.name + ` ${_element.rarity}`,
  };
  attributes.push(temp);
};

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];

  // logic for choosing element items:
  if (_layer.id === 1) {
    //background
  }
  if (_layer.id === 2) {
    //weapons
    const rareChance = Math.random();
    if (rareChance >= 0.8) {
      console.log("RARE WEAPON");
      element =
        _layer.elements[
          Math.floor(Math.random() * (_layer.elements.length - 1))
        ];
    } else {
      element = _layer.elements[3];
    }
  }
  if (_layer.id === 3) {
    //wings
    const rareChance = Math.random();
    if (rareChance >= 0.9) {
      console.log("RARE WINGS");
      element =
        _layer.elements[
          Math.floor(Math.random() * (_layer.elements.length - 1))
        ];
    } else {
      element = _layer.elements[3];
    }
  }
  if (_layer.id === 4) {
    //shell
    const rareChance = Math.random();
    if (rareChance >= 0.9) {
      console.log("SUPER RARE SHELL");
      element = _layer.elements[2];
    }
    if (rareChance < 0.9 && rareChance > 0.5) {
      console.log("RARE SHELL");
      element =
        _layer.elements[
          Math.floor(Math.random() * (_layer.elements.length - 2))
        ];
    } else {
      element = _layer.elements[3];
    }
  }
  if (_layer.id === 5) {
    //skin color
  }
  if (_layer.id === 6) {
    //eye color
  }
  if (_layer.id === 7) {
    //hat
    const rareChance = Math.random();
    if (rareChance >= 0.925) {
      element = _layer.elements[3];
    }
    if (rareChance >= 0.5) {
      console.log(`RARE HAT`);
      element =
        _layer.elements[
          Math.floor(Math.random() * (_layer.elements.length - 2))
        ];
    } else {
      element = _layer.elements[4];
    }
  }
  //   if (_layer.id === 8) {
  //     //accessories
  //   }
  if (_layer.id === 8) {
    //handhelds
  }

  addAttributes(element, _layer);
  const drawnImage = await loadImage(`${_layer.location}/${element.fileName}`);
  context.drawImage(
    drawnImage,
    _layer.position.x,
    _layer.position.y,
    _layer.size.width,
    _layer.size.height
  );
  saveLayer(canvas, _edition);
};

const createCollection = async () => {
  let editionCount = 1;

  while (editionCount <= editionSize) {
    layers.forEach((layer) => {
      drawLayer(layer, editionCount);
    });
    addMetadata(editionCount);
    console.log(`Creating edition ${editionCount}`);
    editionCount++;
  }
};

createCollection();

//writes the metaData
fs.readFile("./output/_metadata.json", (err, data) => {
  if (err) throw err;
  fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
});

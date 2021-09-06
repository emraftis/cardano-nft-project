const fs = require("fs");
const dir = __dirname;
const width = 1000;
const height = 1190;
const rarity = [
  { key: "", val: "" },
  { key: "_r", val: "(rare)" },
  { key: "_sr", val: "(super rare)" },
  { key: "_ssr", val: "(super super rare)" },
];

const addRarity = (_str) => {
  let itemRarity;
  rarity.forEach((rare) => {
    if (_str.includes(rare.key)) {
      itemRarity = rare.val;
    }
  });
  return itemRarity;
};

const cleanName = (_str) => {
  let name = _str.slice(0, -4);
  rarity.forEach((rare) => {
    name = name.replace(rare.key, "");
  });
  return name;
};

const getElements = (path) => {
  return fs.readdirSync(path).map((i, index) => {
    return {
      id: index + 1,
      name: cleanName(i),
      fileName: i,
      rarity: addRarity(i),
    };
  });
};

const layers = [
  {
    id: 1,
    name: "Background",
    location: `${dir}/backgrounds`,
    elements: getElements(`${dir}/backgrounds`),
    position: { x: 0, y: 0 },
    size: { width, height },
  },
  {
    id: 2,
    name: "Weapon",
    location: `${dir}/back-weapons`,
    elements: getElements(`${dir}/back-weapons`),
    position: { x: 0, y: 0 },
    size: { width, height },
  },
  {
    id: 3,
    name: "Wings",
    location: `${dir}/wing-type`,
    elements: getElements(`${dir}/wing-type`),
    position: { x: -10, y: 0 },
    size: { width, height },
  },
  {
    id: 4,
    name: "Shell",
    location: `${dir}/shell-type`,
    elements: getElements(`${dir}/shell-type`),
    position: { x: -5, y: 20 },
    size: { width, height },
  },
  {
    id: 5,
    name: "Skin Color",
    location: `${dir}/skin-type`,
    elements: getElements(`${dir}/skin-type`),
    position: { x: 75, y: 150 },
    size: { width, height },
  },
  {
    id: 6,
    name: "Eye Color",
    location: `${dir}/eye-colors`,
    elements: getElements(`${dir}/eye-colors`),
    position: { x: 0, y: 15 },
    size: { width, height },
  },
  {
    id: 7,
    name: "Hat/Hair",
    location: `${dir}/hats`,
    elements: getElements(`${dir}/hats`),
    position: { x: -10, y: 0 },
    size: { width, height },
  },
  //   {
  //     id: 8,
  //     name: "Accessories",
  //     location: `${dir}/top-layer-accessories`,
  //     elements: getElements(`${dir}/top-layer-accessories`),
  //     position: { x: 0, y: 0 },
  //     size: { width, height },
  //   },
  {
    id: 8,
    name: "Handheld",
    location: `${dir}/handheld`,
    elements: getElements(`${dir}/handheld`),
    position: { x: 0, y: 0 },
    size: { width, height },
  },
];

module.exports = { layers, width, height };

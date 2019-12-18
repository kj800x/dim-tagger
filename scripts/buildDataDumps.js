const fs = require("fs");
const path = require("path");

const buildContent = data =>
  `
// Do not edit manually - generated with "npm run update-data"
// Last Updated: ${new Date().toISOString()}

export default ${JSON.stringify(data, null, 2)};
  `.trim() + "\n";

async function writeDump(data, file) {
  fs.writeFileSync(
    path.join(__dirname, "..", "src", "data-dump", file),
    buildContent(data)
  );
}

async function buildDataDumps() {
  const DestinyInventoryItemDefinition = require(path.join(
    __dirname,
    "..",
    "data",
    "DiidManifest"
  ));

  const DestinyInventoryBucketDefintion = require(path.join(
    __dirname,
    "..",
    "data",
    "DibdManifest"
  ));

  writeDump(
    Object.values(DestinyInventoryItemDefinition)
      .filter(item => item["itemTypeDisplayName"] === "Weapon Ornament")
      .map(item => [item.displayProperties.name, item.inventory.tierTypeName]),
    "ornaments.js"
  );

  writeDump(
    Object.values(DestinyInventoryItemDefinition)
      .filter(item => item["itemTypeDisplayName"] === "Shader")
      .map(item => [item.displayProperties.name, item.inventory.tierTypeName]),
    "shaders.js"
  );
}

buildDataDumps().catch(console.error);

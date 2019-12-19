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

  const DestinyInventoryBucketDefinition = require(path.join(
    __dirname,
    "..",
    "data",
    "DibdManifest"
  ));

  writeDump(
    Object.values(DestinyInventoryItemDefinition)
      .filter(item => item["itemTypeDisplayName"] === "Weapon Ornament")
      .map(item => [
        item.displayProperties.name,
        item.inventory.tierTypeName,
        item.displayProperties.icon
      ]),
    "ornaments.js"
  );

  writeDump(
    Object.values(DestinyInventoryItemDefinition)
      .filter(item => item["itemTypeDisplayName"] === "Shader")
      .map(item => [
        item.displayProperties.name,
        item.inventory.tierTypeName,
        item.displayProperties.icon
      ]),
    "shaders.js"
  );

  writeDump(
    Object.values(DestinyInventoryItemDefinition)
      .filter(item => item["itemType"] === 3) // Weapons
      .map(item => [
        item.displayProperties.name,
        item.inventory.tierTypeName,
        DestinyInventoryBucketDefinition[item.inventory.bucketTypeHash]
          .displayProperties.name,
        item.displayProperties.icon
      ]),
    "weapons.js"
  );

  writeDump(
    Object.values(DestinyInventoryItemDefinition)
      .filter(
        item =>
          item["itemTypeDisplayName"] &&
          (item["itemTypeDisplayName"].includes("Intrinsic") ||
            item["itemTypeDisplayName"].includes("Barrel") ||
            item["itemTypeDisplayName"].includes("Magazine") ||
            item["itemTypeDisplayName"].includes("Sight") ||
            item["itemTypeDisplayName"].includes("Trait") ||
            item["itemTypeDisplayName"].includes("Stock") ||
            item["itemTypeDisplayName"].includes("Grip") ||
            item["itemTypeDisplayName"].includes("Arrow") ||
            item["itemTypeDisplayName"].includes("Bowstring") ||
            item["itemTypeDisplayName"].includes("Battery") ||
            item["itemTypeDisplayName"].includes("Blade") ||
            item["itemTypeDisplayName"].includes("Guard") ||
            item["itemTypeDisplayName"].includes("Scope"))
      )

      .map(item => [
        item.displayProperties.name,
        item.itemTypeDisplayName.replace("Launcher Barrel", "Barrel"),
        item.displayProperties.icon
      ]),
    "perks.js"
  );
}

buildDataDumps().catch(console.error);

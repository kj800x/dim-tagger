const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const MANIFEST_URL = "https://www.bungie.net/Platform/Destiny2/Manifest/";

async function fetchFile(resource, file) {
  const url = `https://www.bungie.net/${resource}`;
  const contents = await (await fetch(url)).json();
  fs.writeFileSync(
    path.join(__dirname, "..", "data", file),
    JSON.stringify(contents)
  );
}

async function fetchManifest() {
  const manifest = await (await fetch(MANIFEST_URL)).json();

  if (!fs.existsSync(path.join(__dirname, "..", "data"))) {
    fs.mkdirSync(path.join(__dirname, "..", "data"));
  }

  fetchFile(
    manifest.Response.jsonWorldComponentContentPaths.en
      .DestinyInventoryItemDefinition,
    "DiidManifest.json"
  );

  fetchFile(
    manifest.Response.jsonWorldComponentContentPaths.en
      .DestinyInventoryBucketDefinition,
    "DibdManifest.json"
  );
}

fetchManifest().catch(console.error);

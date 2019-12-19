import parseWeapons from "./parseWeapons";

const isExotic = piece => piece["Tier"] === "Exotic";
const isPurple = piece => piece["Tier"] === "Legendary";
const isBlue = piece => piece["Tier"] === "Rare";
const isOldFavorite = piece => piece["originalTag"] === "favorite";
const isOldArchive = piece => piece["originalTag"] === "archive";

const processWeapons = contents => {
  let weapons = parseWeapons(contents);

  weapons
    .only(isBlue)
    .buckets()
    .tag("junk");

  weapons
    .only(isPurple)
    .bucketBy("Name")
    .sortBy("perkScore")
    .tagIf(
      "junk",
      (item, itemIndex, bucket) => item.perkScore < 4 && itemIndex >= 2
    );

  weapons
    .without(isExotic)
    .bucketBy("slot")
    .sortBy("Power")
    .tagFirstInGroupIfJunk("infuse");

  weapons
    .only(isOldFavorite)
    .buckets()
    .tag("favorite");

  weapons
    .only(isOldArchive)
    .buckets()
    .tag("archive");

  return weapons.value();
};

export default processWeapons;

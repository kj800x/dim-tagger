import parseArmor from "./parseArmor";

const isExotic = piece => piece["Tier"] === "Exotic";
const isGambitPrime = piece => piece["gambitPrime"];
const isOldFavorite = piece => piece["originalTag"] === "favorite";
const isOldArchive = piece => piece["originalTag"] === "archive";

const processArmor = contents => {
  let armor = parseArmor(contents);

  armor
    .without(isExotic)
    .bucketBy("Masterwork Type", "Equippable", "Type")
    .sortBy("Total (Base)", "Masterwork Tier")
    .tagFirstInGroup("keep")
    .tagRestInGroup("junk");

  armor
    .only(isGambitPrime)
    .bucketBy("Equippable", "Type", "gambitPrimeType")
    .sortBy("gambitPrimeLevel")
    .tagFirstInGroup("keep");

  armor
    .without(isExotic)
    .bucketBy("Equippable", "Type")
    .sortBy("Power")
    .tagFirstInGroupIfJunk("infuse");

  armor
    .only(isOldFavorite)
    .buckets()
    .tag("favorite");

  armor
    .only(isOldArchive)
    .buckets()
    .tag("archive");

  return armor.value();
};

export default processArmor;

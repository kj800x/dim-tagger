import parseArmor from "./parseArmor";

const isExotic = piece => piece["Tier"] === "Exotic";
const isGambitPrime = piece => piece["gambitPrime"];

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

  return armor.value();
};

export default processArmor;

import parseWeapons from "./parseWeapons";

const isBlue = piece => piece["Tier"] === "Rare";
const isOldFavorite = piece => piece["originalTag"] === "favorite";
const isOldArchive = piece => piece["originalTag"] === "archive";

const processWeapons = contents => {
  let weapons = parseWeapons(contents);

  // weapons
  //   .only(isBlue)
  //   .buckets()
  //   .tag("junk");

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

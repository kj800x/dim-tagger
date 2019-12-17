import parseCsv from "../parseCsv";

import ArmorView from "./ArmorView";

const parseArmor = contents => {
  const armor = parseCsv(contents, 7);
  armor.forEach(piece => {
    piece.gambitPrime =
      piece.perks.find(
        perk =>
          perk.includes("+1") || perk.includes("+2") || perk.includes("+3")
      ) || "";
    piece.gambitPrimeType = piece.gambitPrime
      ? piece.gambitPrime.split(" +")[0]
      : "";
    piece.gambitPrimeLevel = piece.gambitPrime
      ? piece.gambitPrime.split(" +")[1].split("*")[0]
      : "";
    piece.originalTag = piece.Tag;
  });
  return ArmorView(armor);
};

export default parseArmor;

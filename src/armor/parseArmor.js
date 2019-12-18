import parseCsv from "../parseCsv";

import StreamView from "../StreamView";

const parseArmor = contents => {
  const armor = parseCsv(contents, 50);
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
  return StreamView(armor);
};

export default parseArmor;

import parseCsv from "../parseCsv";

import StreamView from "../StreamView";
import SHADERS from "../data-dump/shaders";
import ORNAMENTS from "../data-dump/ornaments";

const parseWeapons = contents => {
  const weapons = parseCsv(contents, 19);
  weapons.forEach(gun => {
    gun.originalTag = gun.Tag;
    gun.perks = gun.perks.filter(
      perk => !(perk.includes("Tier") && perk.includes("Weapon"))
    );
    gun.shader = (
      gun.perks.find(perk =>
        SHADERS.find(([name]) => perk.replace("*", "") === name)
      ) || ""
    ).replace("*", "");
    if (gun.shader) {
      gun.shaderTier = SHADERS.find(([name]) => name === gun.shader)[1];
      gun.perks = gun.perks.filter(perk => perk !== gun.shader + "*");
    }
    gun.ornament = (
      gun.perks.find(perk =>
        ORNAMENTS.find(([name]) => perk.replace("*", "") === name)
      ) || ""
    ).replace("*", "");
    if (gun.ornament) {
      gun.ornamentTier = ORNAMENTS.find(([name]) => name === gun.ornament)[1];
      gun.perks = gun.perks.filter(perk => perk !== gun.ornament + "*");
    }
    gun.perks = gun.perks.filter(perk => perk !== "Masterwork*");
    gun.perks = gun.perks.filter(perk => !perk.includes("Catalyst"));
    gun.perks = gun.perks.filter(perk => !perk.includes("Tracker"));
  });
  return StreamView(weapons);
};

export default parseWeapons;

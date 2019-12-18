import parseCsv from "../parseCsv";

import StreamView from "../StreamView";
import SHADERS from "../data-dump/shaders";
import ORNAMENTS from "../data-dump/ornaments";
import PERKS from "../data-dump/perks";
import WEAPONS from "../data-dump/weapons";

const buildPerk = perkName => {
  return PERKS.find(perk => perk[0] === perkName) || [perkName, "unknown"];
};

const parseWeapons = contents => {
  const weapons = parseCsv(contents, 19);
  weapons.forEach(gun => {
    gun.originalTag = gun.Tag;
    gun.perks = gun.perks.filter(
      perk => !(perk.includes("Tier") && perk.includes("Weapon"))
    );
    gun.perks = gun.perks.map(e => e.replace("*", ""));
    gun.shader =
      gun.perks.find(perk => SHADERS.find(([name]) => perk === name)) || "";
    if (gun.shader) {
      gun.shaderTier = SHADERS.find(([name]) => name === gun.shader)[1];
      gun.perks = gun.perks.filter(perk => perk !== gun.shader);
    }
    gun.ornament =
      gun.perks.find(perk => ORNAMENTS.find(([name]) => perk === name)) || "";
    if (gun.ornament) {
      gun.ornamentTier = ORNAMENTS.find(([name]) => name === gun.ornament)[1];
      gun.perks = gun.perks.filter(perk => perk !== gun.ornament);
    }
    gun.perks = gun.perks.filter(perk => perk !== "Masterwork");
    gun.perks = gun.perks.filter(perk => !perk.includes("Catalyst"));
    gun.perks = gun.perks.filter(perk => !perk.includes("Tracker"));

    gun.slot = WEAPONS.find(weapon => weapon[0] === gun.Name)[2].replace(
      " Weapons",
      ""
    );

    gun.perks = gun.perks.map(buildPerk);
  });
  return StreamView(weapons);
};

export default parseWeapons;

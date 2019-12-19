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

    gun.shader = SHADERS.find(shader =>
      gun.perks.find(perk => perk === shader[0])
    );
    if (gun.shader) {
      gun.perks = gun.perks.filter(perk => perk !== gun.shader[0]);
    }

    gun.ornament = ORNAMENTS.find(ornament =>
      gun.perks.find(perk => perk === ornament[0])
    );
    if (gun.ornament) {
      gun.perks = gun.perks.filter(perk => perk !== gun.ornament[0]);
    }

    gun.perks = gun.perks.filter(perk => perk !== "Masterwork");
    gun.perks = gun.perks.filter(perk => !perk.includes("Catalyst"));
    gun.perks = gun.perks.filter(perk => !perk.includes("Tracker"));

    gun.slot = WEAPONS.find(weapon => weapon[0] === gun.Name)[2].replace(
      " Weapons",
      ""
    );

    gun.icon = WEAPONS.find(weapon => weapon[0] === gun.Name)[3];

    gun.perks = gun.perks.map(buildPerk);

    gun.intrinsic = gun.perks.filter(perk => perk[1] === "Intrinsic");
    gun.bbbss = gun.perks.filter(
      perk =>
        perk[1] === "Blade" ||
        perk[1] === "Barrel" ||
        perk[1] === "Bowstring" ||
        perk[1] === "Scope" ||
        perk[1] === "Sight"
    );
    gun.gmba = gun.perks.filter(
      perk =>
        perk[1] === "Guard" ||
        perk[1] === "Magazine" ||
        perk[1] === "Battery" ||
        perk[1] === "Arrow"
    );
    gun.traits = gun.perks.filter(perk => perk[1] === "Trait");
    gun.sg = gun.perks.filter(
      perk => perk[1] === "Stock" || perk[1] === "Grip"
    );
    gun.otherPerks = gun.perks.filter(perk => perk[1] === "unknown");
  });
  return StreamView(weapons);
};

export default parseWeapons;

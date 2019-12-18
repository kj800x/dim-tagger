import parseCsv from "../parseCsv";

import StreamView from "../StreamView";
import SHADERS from "../data-dump/shaders";

const parseWeapons = contents => {
  const ghosts = parseCsv(contents, 50);
  ghosts.forEach(ghost => {
    ghost.originalTag = ghost.Tag;
    ghost.shader = (
      ghost.perks.find(perk =>
        SHADERS.find(([name]) => perk.replace("*", "") === name)
      ) || ""
    ).replace("*", "");
    if (ghost.shader) {
      ghost.shaderTier = SHADERS.find(([name]) => name === ghost.shader)[1];
      ghost.perks = ghost.perks.filter(perk => perk !== ghost.shader + "*");
    }
  });
  return StreamView(ghosts);
};

export default parseWeapons;

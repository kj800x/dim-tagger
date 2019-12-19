import parseCsv from "../parseCsv";

import StreamView from "../StreamView";
import SHADERS from "../data-dump/shaders";

const parseWeapons = contents => {
  const ghosts = parseCsv(contents, 50);

  ghosts.forEach(ghost => {
    ghost.originalTag = ghost.Tag;

    ghost.perks = ghost.perks.map(e => e.replace("*", ""));

    ghost.shader = SHADERS.find(shader =>
      ghost.perks.find(perk => perk === shader[0])
    );
    if (ghost.shader) {
      ghost.perks = ghost.perks.filter(perk => perk !== ghost.shader[0]);
    }
  });
  return StreamView(ghosts);
};

export default parseWeapons;

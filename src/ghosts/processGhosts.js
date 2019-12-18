import parseGhosts from "./parseGhosts";

// const isExotic = piece => piece["Tier"] === "Exotic";
const isOldFavorite = piece => piece["originalTag"] === "favorite";
const isOldArchive = piece => piece["originalTag"] === "archive";

const processGhosts = contents => {
  let ghosts = parseGhosts(contents);

  ghosts
    .only(isOldFavorite)
    .buckets()
    .tag("favorite");

  ghosts
    .only(isOldArchive)
    .buckets()
    .tag("archive");

  return ghosts.value();
};

export default processGhosts;

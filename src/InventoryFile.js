import React from "react";

import DestinyWeapons from "./DestinyWeapons";

const DestinyArmor = () => <p>armor</p>;
const DestinyGhosts = () => <p>ghosts</p>;

const InventoryFile = ({ type, contents }) => {
  if (type === null) {
    return null;
  }
  if (contents === null) {
    return <div>Loading...</div>;
  }
  if (type.includes("destinyWeapons")) {
    return <DestinyWeapons contents={contents} />;
  }
  if (type.includes("destinyArmor")) {
    return <DestinyArmor contents={contents} />;
  }
  if (type.includes("destinyGhosts")) {
    return <DestinyGhosts contents={contents} />;
  }
  return (
    <div>
      Unknown File. Load destinyWeapons.csv, destinyArmor.csv, or
      destinyGhosts.csv
    </div>
  );
};

export default InventoryFile;

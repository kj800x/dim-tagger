import React from "react";

import DestinyWeapons from "./weapons/DestinyWeapons";
import DestinyArmor from "./armor/DestinyArmor";
import DestinyGhosts from "./ghosts/DestinyGhosts";

const InventoryFile = ({ type, contents }) => {
  if (type === null) {
    return null;
  }
  if (contents === null) {
    return <div className="section">Loading...</div>;
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
    <div className="section">
      <div style={{ color: "red" }}>Error: Unknown File.</div>
      <br />
      <div>Load destinyWeapons.csv, destinyArmor.csv, or destinyGhosts.csv</div>
    </div>
  );
};

export default InventoryFile;

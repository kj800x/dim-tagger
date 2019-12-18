import React from "react";
import Download from "../Download";
import renderWeapons from "./renderWeapons";
import processWeapons from "./processWeapons";
import getHeader from "../getHeader";
import WeaponsTable from "./WeaponsTable";

const DestinyWeapons = ({ contents }) => {
  const weapons = processWeapons(contents);
  return (
    <div>
      <div className="section">
        Output CSV:{" "}
        <Download
          filename="destinyWeapons.csv"
          contents={renderWeapons(getHeader(contents), weapons)}
        >
          Download
        </Download>
      </div>
      <div className="table-section">
        <WeaponsTable processed={weapons} />
      </div>
    </div>
  );
};

export default DestinyWeapons;

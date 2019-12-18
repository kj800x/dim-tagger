import React from "react";
import Download from "../Download";
import processArmor from "./processArmor";
import renderArmor from "./renderArmor";
import getHeader from "../getHeader";
import ArmorTable from "./ArmorTable";

const DestinyArmor = ({ contents }) => {
  const processed = processArmor(contents);
  return (
    <div>
      <div className="section">
        Output CSV:{" "}
        <Download
          filename="destinyArmor.csv"
          contents={renderArmor(getHeader(contents), processed)}
        >
          Download
        </Download>
      </div>
      <div className="table-section">
        <ArmorTable processed={processed} />
      </div>
    </div>
  );
};

export default DestinyArmor;

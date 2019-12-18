import React from "react";
import Download from "../Download";
import renderGhosts from "./renderGhosts";
import processGhosts from "./processGhosts";
import getHeader from "../getHeader";
import GhostsTable from "./GhostsTable";

const DestinyGhosts = ({ contents }) => {
  const ghosts = processGhosts(contents);
  return (
    <div>
      <div className="section">
        Output CSV:{" "}
        <Download
          filename="destinyGhosts.csv"
          contents={renderGhosts(getHeader(contents), ghosts)}
        >
          Download
        </Download>
      </div>
      <div className="table-section">
        <GhostsTable processed={ghosts} />
      </div>
    </div>
  );
};

export default DestinyGhosts;

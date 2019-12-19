import React from "react";
import colorFromTier from "../formatting/colorFromTier";
import colorFromTag from "../formatting/colorFromTag";
import sortBy from "../sortBy";
import SearchableIcon from "../weapons/SearchableIcon";

const GhostRow = ({ ghost }) => (
  <tr>
    <td style={{ color: colorFromTier(ghost.Tier) }} className="text-left">
      {ghost.Name}
    </td>
    <td style={{ color: colorFromTag(ghost.originalTag) }}>
      {ghost.originalTag}
    </td>
    <td style={{ color: colorFromTag(ghost.Tag) }}>{ghost.Tag}</td>
    <td>
      {ghost.shader && (
        <SearchableIcon icon={ghost.shader[2]} text={ghost.shader[0]} />
      )}
    </td>
    <td className="text-left">
      {ghost["perks"].map(perk => perk.replace("*", "")).join(", ")}
    </td>
  </tr>
);

const GhostsTable = ({ processed }) => {
  return (
    <table className="text-center w-100p">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th>Old Tag</th>
          <th>New Tag</th>
          <th>Shader</th>
          <th className="text-left">Perks</th>
        </tr>
      </thead>
      <tbody>
        {sortBy("Name")(processed).map(ghost => (
          <GhostRow key={ghost.Id} ghost={ghost} />
        ))}
      </tbody>
    </table>
  );
};

export default GhostsTable;

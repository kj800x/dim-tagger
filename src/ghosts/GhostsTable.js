import React from "react";
import colorFromTier from "../formatting/colorFromTier";
import colorFromTag from "../formatting/colorFromTag";
import sortBy from "../sortBy";

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
          <tr key={ghost.Id}>
            <td
              style={{ color: colorFromTier(ghost.Tier) }}
              className="text-left"
            >
              {ghost.Name}
            </td>
            <td style={{ color: colorFromTag(ghost.originalTag) }}>
              {ghost.originalTag}
            </td>
            <td style={{ color: colorFromTag(ghost.Tag) }}>{ghost.Tag}</td>
            <td style={{ color: colorFromTier(ghost.shaderTier) }}>
              {ghost.shader}
            </td>
            <td className="text-left">
              {ghost["perks"].map(perk => perk.replace("*", "")).join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GhostsTable;

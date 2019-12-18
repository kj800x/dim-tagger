import React from "react";
import colorFromTier from "../formatting/colorFromTier";
import colorFromElement from "../formatting/colorFromElement";
import colorFromTag from "../formatting/colorFromTag";
import colorFromSlot from "../formatting/colorFromSlot";
import element from "../formatting/element";
import gradient from "../formatting/gradient";
import sortBy from "../sortBy";

const WeaponsTable = ({ processed }) => {
  return (
    <table className="text-center w-100p">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th>Power</th>
          <th>Old Tag</th>
          <th>New Tag</th>
          <th>Slot</th>
          <th>Type</th>
          <th>Element</th>
          <th>Masterwork Tier</th>
          <th>Shader</th>
          <th>Ornament</th>
          <th className="text-left">Perks</th>
        </tr>
      </thead>
      <tbody>
        {sortBy(
          "slot",
          "Type",
          "Name"
        )(processed).map(weapon => (
          <tr key={weapon.Id}>
            <td
              style={{ color: colorFromTier(weapon.Tier) }}
              className="text-left"
            >
              {weapon.Name}
            </td>
            <td
              style={{
                color: gradient(1 - (parseInt(weapon.Power, 10) - 950) / 10)
              }}
            >
              {weapon.Power}
            </td>
            <td style={{ color: colorFromTag(weapon.originalTag) }}>
              {weapon.originalTag}
            </td>
            <td style={{ color: colorFromTag(weapon.Tag) }}>{weapon.Tag}</td>
            <td style={{ color: colorFromSlot(weapon.slot) }}>{weapon.slot}</td>
            <td>{weapon.Type}</td>
            <td
              style={{
                color: colorFromElement(element(weapon["Dmg"]))
              }}
            >
              {element(weapon["Dmg"])}
            </td>
            <td
              style={{
                color: gradient(
                  1 - parseInt(weapon["Masterwork Tier"], 10) / 10
                )
              }}
            >
              {weapon["Masterwork Tier"]}
            </td>
            <td style={{ color: colorFromTier(weapon.shaderTier) }}>
              {weapon.shader}
            </td>
            <td style={{ color: colorFromTier(weapon.ornamentTier) }}>
              {weapon.ornament}
            </td>
            <td className="text-left">
              {weapon["perks"]
                .map(([name, type]) => `${name} (${type})`)
                .join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeaponsTable;

import React from "react";
import colorFromTier from "../formatting/colorFromTier";
import colorFromElement from "../formatting/colorFromElement";
import colorFromTag from "../formatting/colorFromTag";
import colorFromSlot from "../formatting/colorFromSlot";
import element from "../formatting/element";
import gradient, { advancedGradient } from "../formatting/gradient";
import sortBy from "../sortBy";
import SearchableIcon from "../SearchableIcon";
import { scoreColors } from "./scorePerk";

const WeaponRow = ({ weapon }) => (
  <tr key={weapon.Id}>
    <td>
      <SearchableIcon icon={weapon.icon} />
    </td>
    <td className="text-left" style={{ color: colorFromTier(weapon.Tier) }}>
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
        color: gradient(1 - parseInt(weapon["Masterwork Tier"], 10) / 10)
      }}
    >
      {weapon["Masterwork Tier"]}
    </td>
    <td>
      {weapon.shader && (
        <SearchableIcon icon={weapon.shader[2]} text={weapon.shader[0]} />
      )}
    </td>
    <td>
      {weapon.ornament && (
        <SearchableIcon icon={weapon.ornament[2]} text={weapon.ornament[0]} />
      )}
    </td>
    <td
      style={{
        color: advancedGradient(
          [
            [-5, "#ff0000"],
            [10, "#00ff00"]
          ],
          weapon.perkScore
        )
      }}
    >
      {weapon.perkScore}
    </td>
    <td>
      {weapon["intrinsic"].map(([name, type, img, desc, score]) => (
        <SearchableIcon
          key={name}
          icon={img}
          text={name}
          titleText={name + "\n\n" + desc}
          background={scoreColors[score]}
        />
      ))}
    </td>
    <td>
      {weapon["bbbss"].map(([name, type, img, desc, score]) => (
        <SearchableIcon
          key={name}
          icon={img}
          text={name}
          titleText={name + "\n\n" + desc}
          background={scoreColors[score]}
        />
      ))}
    </td>
    <td>
      {weapon["gmba"].map(([name, type, img, desc, score]) => (
        <SearchableIcon
          key={name}
          icon={img}
          text={name}
          titleText={name + "\n\n" + desc}
          background={scoreColors[score]}
        />
      ))}
    </td>
    <td>
      {weapon["traits"].map(([name, type, img, desc, score]) => (
        <SearchableIcon
          key={name}
          icon={img}
          text={name}
          titleText={name + "\n\n" + desc}
          background={scoreColors[score]}
        />
      ))}
    </td>
    <td>
      {weapon["sg"].map(([name, type, img, desc, score]) => (
        <SearchableIcon
          key={name}
          icon={img}
          text={name}
          titleText={name + "\n\n" + desc}
          background={scoreColors[score]}
        />
      ))}
    </td>
  </tr>
);

const WeaponsTable = ({ processed }) => {
  return (
    <table className="text-center w-100p">
      <thead>
        <tr>
          <th></th>
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
          <th>Perk Score</th>
          <th>Intrinsic</th>
          <th title="Blade, Barrel, Bowstring, Scope, Sight">BBBSS</th>
          <th title="Guard, Magazine, Battery, Arrow">GMBA</th>
          <th>Traits</th>
          <th title="Stock, Grip">SG</th>
        </tr>
      </thead>
      <tbody>
        {sortBy(
          "slot",
          "Type",
          "Name",
          "perkScore",
          "Masterwork Tier"
        )(processed).map(weapon => (
          <WeaponRow key={weapon.Id} weapon={weapon} />
        ))}
      </tbody>
    </table>
  );
};

export default WeaponsTable;

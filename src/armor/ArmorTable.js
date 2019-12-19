import React from "react";
import colorFromTier from "../formatting/colorFromTier";
import colorFromElement from "../formatting/colorFromElement";
import colorFromTag from "../formatting/colorFromTag";
import colorFromGambit from "../formatting/colorFromGambit";
import element from "../formatting/element";
import gradient from "../formatting/gradient";
import sortBy from "../sortBy";
// import SearchableIcon from "../SearchableIcon";

const ArmorRow = ({ armor }) => (
  <tr key={armor.Id}>
    <td>
      {/* <SearchableIcon icon={armor.icon} /> TODO need to fetch armor icon data */}
    </td>
    <td style={{ color: colorFromTier(armor.Tier) }} className="text-left">
      {armor.Name}
    </td>
    <td
      style={{
        color: gradient(1 - (parseInt(armor.Power, 10) - 950) / 10)
      }}
    >
      {armor.Power}
    </td>
    <td style={{ color: colorFromTag(armor.originalTag) }}>
      {armor.originalTag}
    </td>
    <td style={{ color: colorFromTag(armor.Tag) }}>{armor.Tag}</td>
    <td>{armor.Equippable}</td>
    <td>{armor.Type.replace("Armor", "")}</td>
    <td
      style={{
        color: colorFromElement(element(armor["Masterwork Type"]))
      }}
    >
      {element(armor["Masterwork Type"])}
    </td>
    <td
      style={{
        color: gradient(1 - (parseInt(armor["Total (Base)"], 10) - 52) / 7)
      }}
    >
      {armor["Total (Base)"]}
    </td>
    <td
      style={{
        color: gradient(1 - parseInt(armor["Masterwork Tier"], 10) / 10)
      }}
    >
      {armor["Masterwork Tier"]}
    </td>
    <td className="text-left">
      {armor["gambitPrime"] ? (
        <>
          <span
            style={{
              color: colorFromGambit(armor["gambitPrimeType"])
            }}
          >
            {armor["gambitPrimeType"]}
          </span>{" "}
          <span
            style={{
              color: gradient(1 - parseInt(armor["gambitPrimeLevel"], 10) / 3)
            }}
          >
            +{armor["gambitPrimeLevel"]}
          </span>
        </>
      ) : null}
    </td>
    <td className="text-left">
      {armor["perks"]
        .filter(perk => !perk.includes("*"))
        .map(perk => perk.replace("*", ""))
        .join(", ")}
    </td>
  </tr>
);

const ArmorTable = ({ processed }) => {
  return (
    <table className="text-center w-100p">
      <thead>
        <tr>
          <th></th>
          <th className="text-left">Name</th>
          <th>Power</th>
          <th>Old Tag</th>
          <th>New Tag</th>
          <th>Class</th>
          <th>Type</th>
          <th>Element</th>
          <th>Base Total Stat</th>
          <th>Masterwork Tier</th>
          <th>Gambit Prime</th>
          <th className="text-left">Perks</th>
        </tr>
      </thead>
      <tbody>
        {sortBy(
          "Equippable",
          "Type",
          "Masterwork Type",
          "Tier",
          "Total (Base)",
          "Masterwork Tier"
        )(processed).map(armor => (
          <ArmorRow key={armor.Id} armor={armor} />
        ))}
      </tbody>
    </table>
  );
};

export default ArmorTable;

import React from "react";
import Download from "../Download";
import processArmor from "./processArmor";
import renderArmor from "./renderArmor";
import getHeader from "../getHeader";
import gradient from "../gradient";

const element = str =>
  str.includes("Void")
    ? "Void"
    : str.includes("Arc")
    ? "Arc"
    : str.includes("Solar")
    ? "Solar"
    : "";

const sortBy = (...keys) => arr =>
  arr.sort((a, b) => {
    for (const key of keys) {
      if (a[key] !== b[key]) {
        return b[key].localeCompare(a[key]);
      }
    }
    return 0;
  });

const colorFromTier = tier => {
  switch (tier) {
    case "Common":
      return "grey";
    case "Uncommon":
      return "green";
    case "Rare":
      return "#2778e0";
    case "Legendary":
      return "#ad30ad";
    case "Exotic":
      return "#eac400";
    default:
      console.warn("Unknown Tier:", tier);
      return "grey";
  }
};

const colorFromTag = tag => {
  switch (tag) {
    case "favorite":
      return "grey";
    case "keep":
      return "green";
    case "infuse":
      return "#2778e0";
    case "junk":
      return "#e65353";
    case "archive":
      return "#eac400";
    case "":
      return "white";
    default:
      console.warn("Unknown Tag:", tag);
      return "grey";
  }
};

const colorFromElement = element => {
  switch (element) {
    case "Arc":
      return "#2778e0";
    case "Void":
      return "#ad30ad";
    case "Solar":
      return "#eac400";
    case "":
      return "white";
    default:
      console.warn("Unknown Element:", element);
      return "grey";
  }
};

const colorFromGambit = gambitPrimeRole => {
  switch (gambitPrimeRole) {
    case "Invader":
      return "#e65353";
    case "Collector":
      return "#bbbbbb";
    case "Sentry":
      return "#eac400";
    case "Reaper":
      return "#74d074";
    case "":
      return "white";
    default:
      console.warn("Unknown Gambit Prime Role:", gambitPrimeRole);
      return "grey";
  }
};

const ArmorTable = ({ processed }) => {
  return (
    <table className="text-center w-100p">
      <thead>
        <tr>
          {/* <th className="text-left">Color</th> */}
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
          "Tier",
          "Type",
          "Masterwork Type",
          "Total (Base)",
          "Masterwork Tier"
        )(processed).map(armor => (
          <tr key={armor.Id}>
            {/* <td
              style={{ color: colorFromTier(armor.Tier) }}
              className="text-left"
            >
              {armor.Tier}
            </td> */}
            <td
              style={{ color: colorFromTier(armor.Tier) }}
              className="text-left"
            >
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
                color: gradient(
                  1 - (parseInt(armor["Total (Base)"], 10) - 52) / 7
                )
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
                      color: gradient(
                        1 - parseInt(armor["gambitPrimeLevel"], 10) / 3
                      )
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
        ))}
      </tbody>
    </table>
  );
};

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

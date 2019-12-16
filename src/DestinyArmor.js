import React from "react";
import csv from "csv/lib/es5/sync";

const parseArmor = contents => {
  const [header, ...data] = csv.parse(contents);
  var out = [];
  for (var i = 0; i < data.length; i++) {
    var obj = {};
    var perks = [];
    for (var j = 0; j < header.length; j++) {
      obj[header[j]] = data[i][j];
    }
    for (var z = 0; z <= 7; z++) {
      perks[z] = obj[`Perks ${z}`];
    }
    obj.perks = perks.filter(e => e);
    obj.gambitPrime =
      perks.find(
        perk =>
          perk.includes("+1") || perk.includes("+2") || perk.includes("+3")
      ) || "";
    obj.gambitPrimeType = obj.gambitPrime ? obj.gambitPrime.split(" +")[0] : "";
    obj.gambitPrimeLevel = obj.gambitPrime
      ? obj.gambitPrime.split(" +")[1].split("*")[0]
      : "";
    obj.originalTag = obj.Tag;
    out.push(obj);
  }
  return out;
};

const filterExotics = armor =>
  armor.filter(piece => piece["Tier"] !== "Exotic");

// Partition the armor array into buckets based on the provided keys
const bucket = keys => armor => {
  const out = {};
  for (let a of armor) {
    const key = keys.map(k => a[k]);
    out[key] = out[key] || [];
    out[key].push(a);
  }
  return out;
};

// Sort each bucket by the key
const sortBuckets = keys => buckets => {
  const contents = Object.values(buckets);
  const sortedBuckets = [];
  for (const bucket of contents) {
    sortedBuckets.push(
      bucket.sort((a, b) => {
        for (const key of keys) {
          if (a[key] !== b[key]) {
            return b[key] - a[key];
          }
        }
        return 0;
      })
    );
  }
  return sortedBuckets;
};

const tagLosers = sortedBuckets => {
  sortedBuckets.forEach(sortedBucket => {
    sortedBucket[0].Tag = "keep";
    for (var i = 1; i < sortedBucket.length; i++) {
      sortedBucket[i].Tag = "junk";
    }
  });
};

const tagWinnerDontDelete = sortedBuckets => {
  sortedBuckets.forEach(sortedBucket => {
    if (sortedBucket[0].Tag === "junk") {
      sortedBucket[0].Tag = "infuse";
    }
  });
};

const tagWinnerKeep = sortedBuckets => {
  sortedBuckets.forEach(sortedBucket => {
    sortedBucket[0].Tag = "keep";
  });
};

const processArmor = rawArmor => {
  let armor = filterExotics(rawArmor);

  debugger;

  tagLosers(
    sortBuckets(["Total (Base)", "Masterwork Tier"])(
      bucket(["Masterwork Type", "Equippable", "Type"])(armor)
    )
  );

  tagWinnerKeep(
    sortBuckets(["gambitPrimeLevel"])(
      bucket(["Equippable", "Type", "gambitPrimeType"])(
        armor.filter(piece => piece["gambitPrime"])
      )
    )
  );

  tagWinnerDontDelete(
    sortBuckets(["Power"])(bucket(["Equippable", "Type"])(armor))
  );

  return rawArmor;
};

const DestinyArmor = ({ contents }) => {
  const [header] = csv.parse(contents);
  const armor = parseArmor(contents);
  const processed = processArmor(armor);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {header.map(e => (
              <th key={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processed.map(piece => (
            <tr key={piece.id}>
              {Object.keys(piece).map(e => (
                <td key={e}>{piece[e]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          const data = csv.stringify([
            header,
            ...processed.map(piece => header.map(h => piece[h]))
          ]);
          const a = document.createElement("a");
          const b = new Blob([data], { type: "octet/stream" });
          a.href = window.URL.createObjectURL(b);
          a.download = "destinyArmor.csv";
          a.click();
          window.URL.revokeObjectURL(a.href);
        }}
      >
        Download
      </button>
    </div>
  );
};

export default DestinyArmor;

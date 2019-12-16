import React, { useMemo } from "react";
import csv from "csv/lib/es5/sync";

const parseGhosts = contents => {
  const [header, ...data] = csv.parse(contents);
  var out = [];
  for (var i = 0; i < data.length; i++) {
    var obj = {};
    var perks = [];
    for (var j = 0; j < header.length; j++) {
      obj[header[j]] = data[i][j];
    }
    for (var z = 0; z < 5; z++) {
      perks[z] = obj[`Perks ${z}`];
    }
    obj.perks = perks.filter(e => e);
    out.push(obj);
  }
  return out;
};

const DestinyGhosts = ({ contents }) => {
  const [header, ...data] = csv.parse(contents);
  console.log(parseGhosts(contents));

  return (
    <table>
      <thead>
        <tr>
          {header.map(e => (
            <th key={e}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map(e => (
              <td key={e}>{e}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DestinyGhosts;

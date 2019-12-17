import React from "react";
import csv from "csv/lib/es5/sync";

const DestinyWeapons = ({ contents }) => {
  const [header, ...data] = csv.parse(contents);
  return (
    <div className="table-section">
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
    </div>
  );
};

export default DestinyWeapons;

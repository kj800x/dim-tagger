import csv from "csv/lib/es5/sync";

const renderWeapons = (header, processed) =>
  csv.stringify([header, ...processed.map(piece => header.map(h => piece[h]))]);

export default renderWeapons;

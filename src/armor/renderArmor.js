import csv from "csv/lib/es5/sync";

const renderArmor = (header, processed) =>
  csv.stringify([header, ...processed.map(piece => header.map(h => piece[h]))]);

export default renderArmor;

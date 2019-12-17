import csv from "csv/lib/es5/sync";

const parseCsv = (contents, perkMax) => {
  const [header, ...data] = csv.parse(contents);

  var out = [];
  for (var i = 0; i < data.length; i++) {
    var obj = {};
    var perks = [];
    for (var j = 0; j < header.length; j++) {
      obj[header[j]] = data[i][j];
    }
    for (var z = 0; z <= perkMax; z++) {
      perks[z] = obj[`Perks ${z}`];
    }
    obj.perks = perks.filter(e => e);
    out.push(obj);
  }
  return out;
};

export default parseCsv;

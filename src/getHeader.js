import csv from "csv/lib/es5/sync";

const getHeader = contents => {
  const [header] = csv.parse(contents);
  return header;
};

export default getHeader;

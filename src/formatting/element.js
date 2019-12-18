const element = str =>
  str.includes("Void")
    ? "Void"
    : str.includes("Arc")
    ? "Arc"
    : str.includes("Solar")
    ? "Solar"
    : str.includes("Kinetic")
    ? "Kinetic"
    : "";

export default element;

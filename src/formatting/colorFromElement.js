const colorFromElement = element => {
  switch (element) {
    case "Arc":
      return "#2778e0";
    case "Void":
      return "#ad30ad";
    case "Solar":
      return "#eac400";
    case "Kinetic":
      return "white";
    case "":
      return "white";
    default:
      console.warn("Unknown Element:", element);
      return "grey";
  }
};

export default colorFromElement;

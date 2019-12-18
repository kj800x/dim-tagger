const colorFromTag = tag => {
  switch (tag) {
    case "favorite":
      return "#00cea9";
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

export default colorFromTag;

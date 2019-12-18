const colorFromTier = tier => {
  switch (tier) {
    case "Common":
      return "grey";
    case "Uncommon":
      return "green";
    case "Rare":
      return "#2778e0";
    case "Legendary":
      return "#ad30ad";
    case "Exotic":
      return "#eac400";
    default:
      console.warn("Unknown Tier:", tier);
      return "grey";
  }
};

export default colorFromTier;

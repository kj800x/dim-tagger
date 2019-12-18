const colorFromSlot = slot => {
  switch (slot) {
    case "Kinetic":
      return "white";
    case "Energy":
      return "#74d074";
    case "Power":
      return "#ad30ad";
    default:
      console.warn("Unknown Slot:", slot);
      return "grey";
  }
};

export default colorFromSlot;

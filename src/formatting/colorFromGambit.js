const colorFromGambit = gambitPrimeRole => {
  switch (gambitPrimeRole) {
    case "Invader":
      return "#e65353";
    case "Collector":
      return "#bbbbbb";
    case "Sentry":
      return "#eac400";
    case "Reaper":
      return "#74d074";
    case "":
      return "white";
    default:
      console.warn("Unknown Gambit Prime Role:", gambitPrimeRole);
      return "grey";
  }
};

export default colorFromGambit;

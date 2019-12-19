const dumbpad = s => (s.length === 1 ? "0" + s : s);
const nhex = n => dumbpad(Math.round(n * 255).toString(16));
const lerp = (a, b, n) => a + (b - a) * n;
const toColor = (r, g, b) => `#${nhex(r)}${nhex(g)}${nhex(b)}`;
const fromColor = s => ({
  r: parseInt(s[1] + s[2], 16) / 255,
  g: parseInt(s[3] + s[4], 16) / 255,
  b: parseInt(s[5] + s[6], 16) / 255
});
const colorLerp = (c1, c2, n) =>
  toColor(lerp(c1.r, c2.r, n), lerp(c1.g, c2.g, n), lerp(c1.b, c2.b, n));

const STANDARD_STOPS = [
  [0, "#1aff00"],
  [0.5, "#ffff00"],
  [1, "#ff6600"]
];

export default n => advancedGradient(STANDARD_STOPS, n);

export const advancedGradient = (stopPoints, value) => {
  const firstStop = stopPoints[0];
  const lastStop = stopPoints[stopPoints.length - 1];
  if (value <= firstStop[0]) {
    return firstStop[1];
  }
  if (value >= lastStop[0]) {
    return lastStop[1];
  }

  for (var i = 0; i < stopPoints.length - 1; i++) {
    if (stopPoints[i + 1][0] >= value) {
      return colorLerp(
        fromColor(stopPoints[i][1]),
        fromColor(stopPoints[i + 1][1]),
        (value - stopPoints[i][0]) / (stopPoints[i + 1][0] - stopPoints[i][0])
      );
    }
  }

  return "";
};

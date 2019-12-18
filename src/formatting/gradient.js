const dumbpad = s => (s.length === 1 ? "0" + s : s);
const nhex = n => dumbpad(Math.round(n * 255).toString(16));
const lerp = (a, b, n) => a + (b - a) * n;
const toColor = (r, g, b) => `#${nhex(r)}${nhex(g)}${nhex(b)}`;
const colorLerp = (c1, c2, n) =>
  toColor(lerp(c1.r, c2.r, n), lerp(c1.g, c2.g, n), lerp(c1.b, c2.b, n));
const bound = (lower, upper, n) => (n < lower ? lower : n > upper ? upper : n);

const colors = [
  { r: 0.1, g: 1.0, b: 0 },
  { r: 1.0, g: 1.0, b: 0 },
  { r: 1.0, g: 0.4, b: 0 }
];

const gradient = n => {
  n = bound(0, 1, n);
  if (n < 0.5) {
    const sn = n * 2;
    return colorLerp(colors[0], colors[1], sn);
  } else {
    const sn = (n - 0.5) * 2;
    return colorLerp(colors[1], colors[2], sn);
  }
};

export default gradient;

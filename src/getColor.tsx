// function getColor(value: number) {
//   const hue = (1 - value) * 240; // map value to hue between 0 and 240
//   const saturation = 100; // set saturation to 100%
//   const lightness = 50; // set lightness to 50%

//   // Convert HSL color to RGB color
//   const { r, g, b } = hslToRgb(hue, saturation, lightness);

//   // Return RGB color as CSS string
//   return `rgb(${r}, ${g}, ${b})`;
// }

// function hslToRgb(h: number, s: number, l: number) {
//   let r, g, b;

//   if (s === 0) {
//     r = g = b = l;
//   } else {
//     const hueToRgb = (p: number, q: number, t: number) => {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     };

//     const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     const p = 2 * l - q;
//     r = hueToRgb(p, q, h + 1 / 3);
//     g = hueToRgb(p, q, h);
//     b = hueToRgb(p, q, h - 1 / 3);
//   }

//   return {
//     r: Math.round(r * 255),
//     g: Math.round(g * 255),
//     b: Math.round(b * 255),
//   };
// }

// function getColor(sentiment: number) {
//   // Map sentiment value to a range from 0 to 1
//   const normalizedSentiment = (sentiment + 1) / 2;

//   // Interpolate between red (0xff0000) and green (0x00ff00) based on the sentiment value
//   const red = Math.floor((1 - normalizedSentiment) * 255);
//   const green = Math.floor(normalizedSentiment * 255);
//   const blue = 0;
//   return `rgb(${red},${green},${blue})`;
// }
function getColor(sentiment: number) {
  // Map sentiment to a range of RGB values between light blue and light red
  const minSentiment = -1;
  const maxSentiment = 1;
  const maxColor = [100, 200, 255]; // Light blue
  const minColor = [255, 100, 155]; // Light red
  const r = Math.round(
    (maxColor[0] - minColor[0]) *
      ((sentiment - minSentiment) / (maxSentiment - minSentiment)) +
      minColor[0]
  );
  const g = Math.round(
    (maxColor[1] - minColor[1]) *
      ((sentiment - minSentiment) / (maxSentiment - minSentiment)) +
      minColor[1]
  );
  const b = Math.round(
    (maxColor[2] - minColor[2]) *
      ((sentiment - minSentiment) / (maxSentiment - minSentiment)) +
      minColor[2]
  );

  // Convert RGB values to hex code
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

export { getColor };

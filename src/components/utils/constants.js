/*
 * Constants values
 */

export const waveshapeOptions = [
  { key: 1, value: "Sawtooth" },
  { key: 2, value: "Square" },
  { key: 3, value: "Triangle" }
];

export const coefficients = {
  1: { 1: 1, 2: 0.5, 3: 0.33, 4: 0.25, 5: 0.2, 6: 0.16, 7: 0.14, 8: 0.125 },
  2: { 1: 1, 2: 0, 3: 0.33, 4: 0, 5: 0.2, 6: 0, 7: 0.14, 8: 0 },
  3: { 1: 1, 2: 0, 3: -0.11, 4: 0, 5: 0.04, 6: 0, 7: -0.02, 8: 0 }
};

export const colors = {
  x: "#424242",
  y: "#424242",
  1: "#006064",
  2: "#DD2C00",
  3: "#FFAB00",
  4: "#0091EA",
  5: "#F50057",
  6: "#00C853",
  7: "#6200EA",
  8: "#004d40"
};

export const graph_margin = { top: 10, right: 5, bottom: 10, left: 10 };
export const default_ratio = 0.3;

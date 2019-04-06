/*
 * Function helpers for waveform calculations
 */

// coefficient calculation
export const coefficients = (waveshape, harmonicNum) => {
  switch (waveshape) {
    case 1:
      return (1 / (harmonicNum + 1)).toFixed(4);
    case 2:
      if ((harmonicNum + 1) % 2 === 0) return 0;
      else return (1 / (harmonicNum + 1)).toFixed(4);
    case 3:
      if ((harmonicNum + 1) % 2 === 0) return 0;
      else
        return (
          Math.pow(-1, harmonicNum / 2) / Math.pow(harmonicNum + 1, 2)
        ).toFixed(4);

    default:
      break;
  }
};

// y-axis values with step size 1/10 from -7 to 7
const yAxisPt = () => {
  const pos = [...Array(70).keys()].map(n => {
    return { x: 0, y: n / 10 };
  });
  const neg = [...Array(70).keys()].map(n => {
    return { x: 0, y: -n / 10 };
  });
  return pos.concat(neg);
};

// x-axis values with step size pi/100
const xpts = () => [...Array(201).keys()].map(n => n * (1 / 100) * Math.PI);

// sine function with given amplitude, n coefficient and x value
const sine = (amp, n, x) => amp * Math.sin(n * x);

// axis data
export const axis = [
  { waveNo: "x", data: xpts().map(x => ({ x: x, y: 0 })) },
  { waveNo: "y", data: yAxisPt() }
];

// calculate y value of each x given for all the equations
export const wavesArr = ampObj => {
  return Object.keys(ampObj).map(key => {
    return {
      waveNo: key,
      wave: xpts().map(x => {
        return { x: x, y: sine(ampObj[key], key, x) };
      })
    };
  });
};

// fourier series function
const series = (ampObj, x) =>
  Object.keys(ampObj)
    .map(key => ampObj[key] * Math.sin(key * x))
    .reduce((acc, curr) => acc + curr, 0);

// calculate y value of each x given for the fourier equation
export const sum = ampObj => {
  return xpts().map(x => {
    return { x: x, y: series(ampObj, x) };
  });
};

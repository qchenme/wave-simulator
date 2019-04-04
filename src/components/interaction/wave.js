import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";
import { axis, sum, wavesArr } from "../utils/helpers";
import { colors, default_ratio, graph_margin } from "../utils/constants";

class Waves extends React.PureComponent {
  state = {
    waves: [],
    fourierSum: [],
    axes: [],
    width: 0.8 * window.innerWidth,
    height: 0.8 * default_ratio * window.innerWidth,
    xScale: d3
      .scaleLinear()
      .domain([0, 2 * Math.PI])
      .range([graph_margin.left, 0.8 * window.innerWidth - graph_margin.right]),
    yScale: d3
      .scaleLinear()
      .domain([-2, 2])
      .range([0.8 * default_ratio * window.innerWidth, graph_margin.top])
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.currentAmpObj) return {};

    const waveResult = wavesArr(props.currentAmpObj);
    const sumResult = sum(props.currentAmpObj);
    const axisData = axis;

    // Line generator
    const lineGenerate = d3
      .line()
      .curve(d3.curveCardinal.tension(0.5))
      .x(d => state.xScale(d.x))
      .y(d => state.yScale(d.y));

    // Transform to svg path
    const waves = waveResult.map(r => ({
      index: r.waveNo,
      path: lineGenerate(r.wave)
    }));
    const fourierSum = [lineGenerate(sumResult)];
    const axes = axisData.map(r => ({
      index: r.waveNo,
      path: lineGenerate(r.data)
    }));

    return { waves, fourierSum, axes };
  }

  // setup new scale when window size changed
  handleResize = e => {
    const newWidth = 0.8 * window.innerWidth;
    const newHeight = default_ratio * newWidth;
    this.setState({
      width: newWidth,
      height: newHeight,
      xScale: d3
        .scaleLinear()
        .domain([0, 2 * Math.PI])
        .range([graph_margin.left, newWidth - graph_margin.right]),
      yScale: d3
        .scaleLinear()
        .domain([-2, 2])
        .range([newHeight - graph_margin.bottom, graph_margin.top])
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { axes, fourierSum, waves, width, height } = this.state;
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography variant="overline" color="secondary">
            Harmonics
          </Typography>
          <svg width={1.25 * width} height={1.25 * height}>
            {waves.map(obj => (
              <path
                d={obj.path}
                key={obj.index}
                fill="none"
                stroke={`${colors[obj.index]}`}
                strokeWidth="2px"
              />
            ))}
            {axes.map(obj => (
              <path
                d={obj.path}
                key={obj.index}
                fill="none"
                stroke={`${colors[obj.index]}`}
                strokeWidth="1px"
              />
            ))}
          </svg>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" color="secondary">
            Sum Result
          </Typography>
          <svg width={1.25 * width} height={1.25 * height}>
            {fourierSum.map((w, index) => (
              <path
                d={w}
                key={index}
                fill="none"
                stroke="#ff7d47"
                strokeWidth="2px"
              />
            ))}
            {axes.map(obj => (
              <path
                d={obj.path}
                key={obj.index}
                fill="none"
                stroke={`${colors[obj.index]}`}
                strokeWidth="1px"
              />
            ))}
          </svg>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Waves;

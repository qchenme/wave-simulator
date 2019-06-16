import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Selection from "./selection";
import Slide from "./slide";
import Wave from "./wave";
import { coefficients } from "../utils/helpers";
import { waveshapeOptions, ratios } from "../utils/constants";

const styles = {
  root: {
    overflow: "hidden",
    padding: "20px"
  }
};

class Interaction extends React.Component {
  state = {
    waveshape: 1,
    limitHarmoNo: 7,
    harmoNo: 4,
    harmoAmpSet: {},
    currentAmpInShape: [],
    currentAmpObjCustom: {}
  };

  componentDidMount() {
    const { limitHarmoNo, harmoNo, waveshape } = this.state;
    const harmoAmpSetToLimit = {};
    waveshapeOptions.forEach(obj => {
      const waveshapeAmps = {};
      [...Array(limitHarmoNo).keys()].forEach(n => {
        waveshapeAmps[n + 1] = coefficients(obj.key, n);
      });
      harmoAmpSetToLimit[obj.key] = waveshapeAmps;
    });

    const currentAmpInShape = { ...harmoAmpSetToLimit }[waveshape];
    let currentAmpObjCustom = {};
    [...Array(harmoNo).keys()].forEach(k => {
      currentAmpObjCustom[k + 1] = currentAmpInShape[k + 1];
    });
    this.setState({
      harmoAmpSet: harmoAmpSetToLimit,
      currentAmpInShape: currentAmpInShape,
      currentAmpObjCustom: currentAmpObjCustom
    });
  }

  handleShapeChange = e => {
    const { harmoAmpSet, harmoNo } = this.state;
    const newShape = e.target.value;
    const currentAmpInShape = { ...harmoAmpSet }[newShape];
    let currentAmpObjCustom = {};
    [...Array(harmoNo).keys()].forEach(k => {
      currentAmpObjCustom[k + 1] = currentAmpInShape[k + 1];
    });
    this.setState({
      currentAmpInShape: currentAmpInShape,
      currentAmpObjCustom: currentAmpObjCustom,
      waveshape: newShape
    });
  };

  handleHarmoChange = e => {
    const { currentAmpInShape } = this.state;
    let newHarmoNo = parseInt(e.target.value);
    let currentAmpObjCustom = {};
    [...Array(newHarmoNo).keys()].forEach(k => {
      currentAmpObjCustom[k + 1] = currentAmpInShape[k + 1];
    });
    this.setState({
      harmoNo: newHarmoNo,
      currentAmpObjCustom: currentAmpObjCustom
    });
  };

  handleSlide = newAmpCustom => {
    this.setState({ currentAmpObjCustom: newAmpCustom });
  };

  render() {
    const { isMobile, classes } = this.props;
    const {
      waveshape,
      limitHarmoNo,
      harmoNo,
      currentAmpObjCustom
    } = this.state;
    return (
      <div className={classes.root}>
        {isMobile ? (
          <Paper elevation={0}>
            <Grid container spacing={16} alignItems="center">
              <Wave
                currentAmpObj={currentAmpObjCustom}
                waveRatio={ratios.waveMobileRatio}
                svgRatio={ratios.svgMobileRatio}
              />
            </Grid>
            <Grid container spacing={16} alignItems="center">
              <Grid item xs={12}>
                <Selection
                  waveshape={waveshape}
                  harmoNo={harmoNo}
                  limitHarmoNo={limitHarmoNo}
                  handleShapeChange={this.handleShapeChange}
                  handleHarmoChange={this.handleHarmoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Slide
                  currentAmpObj={currentAmpObjCustom}
                  handleSlide={this.handleSlide}
                />
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Paper elevation={0}>
            <Grid
              container
              spacing={16}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item lg={6} md={6}>
                <Wave
                  currentAmpObj={currentAmpObjCustom}
                  waveRatio={ratios.waveDesktopRatio}
                  svgRatio={ratios.svgDesktopRatio}
                />
              </Grid>
              <Grid item lg={5} md={4}>
                <Selection
                  waveshape={waveshape}
                  harmoNo={harmoNo}
                  limitHarmoNo={limitHarmoNo}
                  handleShapeChange={this.handleShapeChange}
                  handleHarmoChange={this.handleHarmoChange}
                />
                <Slide
                  currentAmpObj={currentAmpObjCustom}
                  handleSlide={this.handleSlide}
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}

Interaction.propTypes = {
  isMobile: PropTypes.bool
};

export default withStyles(styles)(Interaction);

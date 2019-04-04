import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Selection from "./selection";
import Slide from "./slide";
import Wave from "./wave";
import { coefficients } from "../utils/constants";
import WaveDesktop from "./waveDesktop";

class Interaction extends React.Component {
  state = {
    waveshape: 1,
    harmoNo: 4,
    harmoAmpSet: coefficients,
    currentAmpInShape: [],
    currentAmpObjCustom: {}
  };

  componentDidMount() {
    const { harmoAmpSet, harmoNo, waveshape } = this.state;
    const currentAmpInShape = { ...harmoAmpSet }[waveshape];
    let currentAmpObjCustom = {};
    [...Array(harmoNo).keys()].forEach(k => {
      currentAmpObjCustom[k + 1] = currentAmpInShape[k + 1];
    });
    this.setState({
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
    const { isMobile } = this.props;
    const {
      waveshape,
      harmoNo,
      currentAmpInShape,
      currentAmpObjCustom
    } = this.state;
    return (
      <div style={{ padding: 20 }}>
        {isMobile ? (
          <Fragment>
            <Grid container spacing={16} alignItems="center">
              <Wave currentAmpObj={currentAmpObjCustom} />
            </Grid>
            <Grid container spacing={16} alignItems="center">
              <Grid item xs={12}>
                <Selection
                  waveshape={waveshape}
                  harmoNo={harmoNo}
                  currentAmpInShape={currentAmpInShape}
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
          </Fragment>
        ) : (
          <Fragment>
            <Grid container spacing={16} alignContent="space-between">
              <Grid item lg={6} md={6}>
                <WaveDesktop currentAmpObj={currentAmpObjCustom} />
              </Grid>
              <Grid item lg={5} md={4}>
                <Selection
                  waveshape={waveshape}
                  harmoNo={harmoNo}
                  currentAmpInShape={currentAmpInShape}
                  handleShapeChange={this.handleShapeChange}
                  handleHarmoChange={this.handleHarmoChange}
                />
                <Slide
                  currentAmpObj={currentAmpObjCustom}
                  handleSlide={this.handleSlide}
                />
              </Grid>
            </Grid>
          </Fragment>
        )}
      </div>
    );
  }
}
export default Interaction;

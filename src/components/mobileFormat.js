import React, { Component, Fragment } from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import QuestionIcon from "@material-ui/icons/HelpOutline";

import Theory from "./theory";
import Interaction from "./interaction";

class MobileFormat extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <AppBar position="sticky" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Fourier Series Simulation" />
            <Tab icon={<QuestionIcon />} />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
          <Interaction isMobile={true} />
          <Theory />
        </SwipeableViews>
      </Fragment>
    );
  }
}

export default MobileFormat;

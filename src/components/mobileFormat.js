import React, { Component, Fragment } from "react";
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
            <Tab
              onClick={() => this.handleChangeIndex(0)}
              label="Fourier Series Simulation"
            />
            <Tab
              onClick={() => this.handleChangeIndex(1)}
              icon={<QuestionIcon />}
            />
          </Tabs>
        </AppBar>
        {value === 0 && <Interaction isMobile={true} />}
        {value === 1 && <Theory />}
      </Fragment>
    );
  }
}

export default MobileFormat;

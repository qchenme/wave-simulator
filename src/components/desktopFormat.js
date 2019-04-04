import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import QuestionIcon from "@material-ui/icons/HelpOutline";

import Interaction from "./interaction";
import Theory from "./theory";

const drawerWidth = 400;

const styles = theme => ({
  header: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  toolbar: {
    alignItems: "right",
    justifyContent: "flex-end"
  }
});

class DesktopFormat extends Component {
  state = { open: false };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar color="inherit" position="static" elevation={0}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              aria-label="theory-button"
              value="theory"
              color="primary"
              onClick={this.handleDrawerOpen}
            >
              <QuestionIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Interaction isMobile={false} />
        </Grid>

        <SwipeableDrawer
          onClose={this.handleDrawerClose}
          onOpen={this.handleDrawerOpen}
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon color="primary" />
            </IconButton>
          </div>
          <Divider />
          <Theory />
        </SwipeableDrawer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DesktopFormat);

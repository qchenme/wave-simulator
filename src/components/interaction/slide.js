import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/lab/Slider";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { colors } from "../utils/constants";

const styles = {
  slider: {
    width: "90%",
    padding: "10px 0px",
    touchAction: "none"
  },
  typo: {
    textAlign: "center"
  }
};

class Slide extends React.Component {
  render() {
    const { classes, currentAmpObj, handleSlide } = this.props;

    return (
      <Card elevation={0}>
        <List padding="dense">
          {Object.keys(currentAmpObj).map(k => (
            <Fragment key={k}>
              <ListItem>
                <Grid container spacing={16} justify="space-between">
                  <Grid item xs={9} sm={5}>
                    <Typography
                      variant="body2"
                      id="slide-label"
                      style={{ color: colors[k] }}
                    >{`Harmonic ${k}: ${currentAmpObj[k] < 0 ? `-` : ``} sin(${
                      parseInt(k) === 1 ? `x` : `${k}x`
                    })`}</Typography>
                    <Slider
                      className={classes.slider}
                      aria-labelledby="slide-label"
                      value={Math.abs(currentAmpObj[k] * 100)}
                      min={0}
                      max={100}
                      step={1}
                      onChange={(e, v) => {
                        const copiedAmp = { ...currentAmpObj };
                        if (currentAmpObj[k] < 0) copiedAmp[k] = -v / 100;
                        else copiedAmp[k] = v / 100;
                        handleSlide(copiedAmp);
                      }}
                      margin="none"
                    />
                  </Grid>
                  <Grid item xs={3} sm={2}>
                    <Typography className={classes.typo} variant="overline">
                      Amplitude
                    </Typography>
                    <Typography
                      className={classes.typo}
                      style={{ color: colors[k] }}
                      variant="button"
                    >
                      {Math.abs(currentAmpObj[k])}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Card>
    );
  }
}

Slide.propTypes = {
  currentAmpObj: PropTypes.object,
  handleSlide: PropTypes.func
};

export default withStyles(styles)(Slide);

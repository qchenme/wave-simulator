import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/lab/Slider";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TablePagination from "@material-ui/core/TablePagination";
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
  state = { page: 1, rowsPerPage: 3 };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 1 });
  };

  render() {
    const { page, rowsPerPage } = this.state;
    const { classes, currentAmpObj, handleSlide } = this.props;

    return (
      <Card elevation={0}>
        <List padding="dense">
          {Object.keys(currentAmpObj)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(k => (
              <Fragment key={k}>
                <ListItem>
                  <Grid container spacing={16} justify="space-between">
                    <Grid item xs={9} sm={5}>
                      <Typography
                        variant="body2"
                        id="slide-label"
                        style={{ color: colors[k] }}
                      >{`Harmonic ${k}: ${
                        currentAmpObj[k] < 0 ? `-` : ``
                      } sin(${parseInt(k) === 1 ? `x` : `${k}x`})`}</Typography>
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
          <TablePagination
            rowsPerPageOptions={[1, 3, 5]}
            component="div"
            count={Object.keys(currentAmpObj).length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
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

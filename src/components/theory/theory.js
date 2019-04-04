import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import sawtooth from "../../img/sawtooth.jpg";
import fourier from "../../img/fourier.svg";
import example from "../../img/example.svg";
import a0 from "../../img/a_0.svg";
import an from "../../img/a_n.svg";
import bn from "../../img/b_n.svg";

const styles = {
  root: {
    textAlign: "center",
    padding: 20
  },
  img: {
    maxWidth: "90%",
    maxHeight: "90%"
  }
};

const Theory = ({ classes }) => (
  <div className={classes.root}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Fourier Series
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          A Fourier series is an expansion of a periodic function f(x) in terms
          of an infinite sum of sines and cosines. The basic idea is any shaped
          periodic waveform, can be represented as the sum of a set of sine
          waves with proper phases and amplitudes. It is essential in many
          fields especially signal processing. Mathematically, it's defined by
          the following equations:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <img className={classes.img} src={fourier} alt="fourier" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          The corresponding coefficients are defined as:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <img className={classes.img} src={a0} alt="a_0" />
      </Grid>
      <Grid item xs={12}>
        <img className={classes.img} src={an} alt="a_n" />
      </Grid>
      <Grid item xs={12}>
        <img className={classes.img} src={bn} alt="b_n" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          For example, to form a sawtooth wave, we have the following summation:
        </Typography>
        <Grid item xs={12}>
          <img className={classes.img} src={example} alt="example" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <img className={classes.img} src={sawtooth} alt="sawtooth" />
        <Typography variant="caption">
          Figure 1: Expansion of a sawtooth wave with 4, 6 and 10 terms
        </Typography>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(Theory);

import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { waveshapeOptions } from "../utils/constants";

const Selection = ({
  waveshape,
  harmoNo,
  limitHarmoNo,
  handleHarmoChange,
  handleShapeChange
}) => (
  <Card elevation={0}>
    <List>
      <ListItem>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Waveshape</InputLabel>
          <Select
            value={waveshape}
            onChange={handleShapeChange}
            input={
              <OutlinedInput labelWidth={90} name="waveshape" id="waveshape" />
            }
          >
            {waveshapeOptions.map(op => (
              <MenuItem key={op.key} value={op.key}>
                {op.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Number of Harmonics</InputLabel>
          <Select
            value={harmoNo}
            onChange={handleHarmoChange}
            input={
              <OutlinedInput labelWidth={160} name="harmonic" id="harmonic" />
            }
          >
            {[...Array(limitHarmoNo).keys()].map(k => (
              <MenuItem key={k + 1} value={k + 1}>
                {k + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    </List>
  </Card>
);

Selection.propTypes = {
  waveshape: PropTypes.number,
  harmoNo: PropTypes.number,
  limitHarmoNo: PropTypes.number,
  handleShapeChange: PropTypes.func,
  handleHarmoChange: PropTypes.func
};

export default Selection;

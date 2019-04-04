import React, { Fragment } from "react";
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
  currentAmpInShape,
  handleHarmoChange,
  handleShapeChange
}) => (
  <Fragment>
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
            {Object.keys(currentAmpInShape).map(k => (
              <MenuItem key={k} value={k}>
                {k}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    </List>
  </Fragment>
);

export default Selection;

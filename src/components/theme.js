import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: {
    main: "#64B5F6",
    contrastText: "#ffffff"
  },
  secondary: {
    main: "#311b92",
    contrastText: "#ffffff"
  }
};

const typography = {
  useNextVariants: true
};
const themeName = "AppTheme";

export default createMuiTheme({ palette, typography, themeName });

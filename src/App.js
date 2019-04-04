import React from "react";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./components/theme";
import MobileFormat from "./components/mobileFormat";
import DesktopFormat from "./components/desktopFormat";

export default function App() {
  const mobile = useMediaQuery("(max-width:1024px)");
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        {mobile ? <MobileFormat /> : <DesktopFormat />}
      </MuiThemeProvider>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider, createTheme } from "@mui/material";

import { CssBaseline, GlobalStyles } from "@mui/material";

import { red } from "@mui/material/colors";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      // main: "#07203d",
      main: "#005fa9",
    },
    secondary: {
      // main: red[500],
      main: "#005fa9",
    },
    myCustomColor: {
      main: red[400],
      superDark: red[800],
      superLight: red[100],
      mmPrimaryNavy: "#0e355a",
    },
  },
  typography: {
    // fontSize: "2rem",
    myVariant: {
      fontSize: "6rem",
    },
  },

  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: "10px",
          paddingBottom: "10px",
        },
        gutters: {
          paddingRight: "50px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        label: {
          // color: "#0e355a",
        },
        root: {
          "&.Mui-selected": {
            // backgroundColor: "#8f9aa8",
            backgroundColor: "purple",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            // backgroundColor: "rgba(158, 158, 158, 0.2)",
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "& th:fist-child": {
            // borderTopLeftRadius: "10px",
            // borderBottomLeftRadius: "10px",
            
          },
        },
      },
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        // boxSizing: "border-box",
      },
      body: {
        background: "#07203d",
        color: "white",
        width: "100%",
        height: "100vh",
        fontSize: "12px",
        // minHeight: "100%",
        // padding: "8px 24px",
        [theme.breakpoints.down("md")]: {
          // padding: "0 32px",
          // padding: "0 16px",
          // padding:"0px"
        },
      },
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },

      " #root": {
        minHeight: "100%",
      },
      img: {
        overflowClipMargin: "content-box",
        overflow: "clip",
      },
      button: {
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        background: "transparent",
        fontFamily: "Source Sans Pro",
        fontWeight: "normal",
        textDecoration: "underline",
        color: "white",
      },
      "& div": {
        fontSize: "14px",
        // fontWeight: "600",
        // lineHeight:"17.6px"
      },
      "& p": {
        fontSize: "14px",
        // fontWeight: "600",
        // lineHeight:"17.6px"
      },
      "& span": {
        fontSize: "14px",
        // fontWeight: "600",
      },
    }}
  />
);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {globalStyles}

    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

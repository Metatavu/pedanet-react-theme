import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const { breakpoints } = theme;

export default createMuiTheme({
  palette: {
    primary: {
      main: "#082b45",
      dark: "#26201E"
    },
    secondary: { main: "#C24A49" },
    background: {
      default: "#ffffff",
      paper: "#F5EFEA"
    },
    text: {
      primary: "#373a3c",
      secondary: "#26201E",
      disabled: "#ddd",
      hint: "#eee"
    }
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    fontFamily: "'Titillium Web', sans-serif",
    h1: {
      fontFamily: "'Cairo', sans-serif",
      fontWeight: 900,
      fontSize: "6rem"
    },
    h2: {
      fontFamily: "'Cairo', sans-serif",
      fontWeight: 700
    },
    h3: {
      fontFamily: "'Cairo', sans-serif",
      fontWeight: 600
    },
    h4: {
      fontFamily: "'Cairo', sans-serif",
      fontWeight: 400
    },
    h5: {
      fontFamily: "'Cairo', sans-serif",
      fontWeight: 400
    },
    body1: {
      fontFamily: "Titillium Web, sans-serif",
      fontWeight: "normal"
    },
    body2: {
      fontFamily: "Titillium Web, sans-serif",
      fontWeight: "normal"
    },
    subtitle1: {
      fontFamily: "tt_norms_proregular",
      fontWeight: "normal"
    },
    subtitle2: {
      fontFamily: "tt_norms_promedium",
      fontWeight: "normal"
    }
  },
  overrides: {
    MuiButton: {
      label: {
        fontSize: 16,
        fontFamily: "'Cairo', sans-serif",
        fontWeight: 700,
        [breakpoints.up("sm")]: {
          fontSize: 18,
        },
        whiteSpace: "nowrap",
      },
      text: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h6.fontSize
      },
      outlinedPrimary: {
        justifyContent: "space-between",
        textTransform: "initial",
        height: 55,
        borderRadius: 0,
        padding: "5px 15px"
      },
      textPrimary: {},
      containedPrimary: {}
    },
    MuiInputBase: {
      input: {
        fontSize: "2rem"
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "1.6rem",
      }
    },
    MuiExpansionPanel: {
      root: {
        backgroundColor: "#fff",
        borderTop: "1px solid rgba(0, 0, 0, .2)",
        boxShadow: "none",
        "&:not(:last-child)": {
          borderBottom: 0
        },
        "&:last-child": {
          paddingBottom: 1,
          borderBottom: "1px solid rgba(0, 0, 0, .2)"
        },
        "&:before": {
          display: "none"
        },
        "&$expanded": {
          margin: "auto"
        },
      },
      expanded: {}
    },
    MuiExpansionPanelSummary: {
      root: {
        backgroundColor: "#fff",
        borderBottom: "none",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
          minHeight: 56
        },
      },
      content: {
        "&$expanded": {
          margin: "12px 0"
        },
      },
      expanded: {}
    },
    MuiExpansionPanelDetails: {
      root: {
        display: "block"
      }
    },
    MuiListItem: {
      root: {
        "& a": {
          textDecoration: "none",
          paddingLeft: "1rem",
          paddingRight: "1rem"
        },
        "&:hover": {
          textDecoration: "underline"
        },
        "&.Mui-selected": {
          backgroundColor: "#064e8d",
          "& a": {
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#064e8d",
            textDecoration: "underline"
          },
          "& svg": {
            color: "#fff",
            borderColor: "#fff"
          }
        }
      }
    }
  }
});
import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  "@global": {
    ".saimaa": {
      backgroundColor: "#62BAE9!important"
    },
    ".mustikka": {
      backgroundColor: "#224C8E!important"
    },
    ".kerkka": {
      backgroundColor: "#D2D92A!important"
    },
    ".ruoho": {
      backgroundColor: "#5CA740!important"
    },
    ".marjapuuro": {
      backgroundColor: "#D84C6F!important"
    },
    ".orvokki": {
      backgroundColor: "#A61680!important"
    },
    ".aurinko": {
      backgroundColor: "#FFD400!important"
    },
    ".aamurusko": {
      backgroundColor: "#EF7D25!important"
    }
  },
  root: {
    height: "100vh"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  columnSection: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "55rem",
  },
  column: {
    display: "inline-block",
    width: "14%",
    minHeight: "55rem",
    padding: "1%",
    margin: "1%",
    textTransform: "none",
    color: "#fff",
    "& p": {
      fontFamily: "Cairo, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      letterSpacing: 0,
      color: "#000"
    },
    "& a": {
      fontFamily: "Cairo, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      letterSpacing: 0,
      color: "#fff",
      textDecoration: "none"
    },
    "& a:hover": {
      textDecoration: "underline"
    },
    "& h1, h2, h3, h4, h5, h6": {
      fontSize: 28,
    },
    [theme.breakpoints.down("md")]: {
      "& p": {
        fontSize: 15,
      },
      "& a": {
        fontSize: 15,
      },
      "& h1, h2, h3, h4, h5, h6": {
        fontSize: 20,
      },
    },
    [theme.breakpoints.down("xs")]: {
      "& p": {
        fontSize: 12,
      },
      "& a": {
        fontSize: 12,
      },
      "& h1, h2, h3, h4, h5, h6": {
        fontSize: 16,
      },
    },
    //default colors
    "&:nth-child(1)": {
      backgroundColor: "#386dc2"
    },
    "&:nth-child(2)": {
      backgroundColor: "#ffdf3d"
    },
    "&:nth-child(3)": {
      backgroundColor: "#59a345"
    },
    "&:nth-child(4)": {
      backgroundColor: "#de782a"
    }
  },
  logoBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "298px",
    marginBottom: 50
  },
  localeMenu: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
  },
});
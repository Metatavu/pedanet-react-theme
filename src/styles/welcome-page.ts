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
  content: {
    display: "flex",
    flexDirection: "column"
  },
  columnSection: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    }
  },
  column: {
    margin: "10px 0",
    width: "100%",
    padding: 10,
    textTransform: "none",
    color: "#fff",
    minHeight: 250,
    "& p, a": {
      fontFamily: "Cairo, sans-serif",
      fontWeight: 600,
      letterSpacing: 0,
      color: "#fff",
      fontSize: 18
    },
    "& h2": {
      fontSize: 26
    },
    "& h3": {
      fontSize: 24
    },
    "& h4": {
      fontSize: 22
    },
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 20px)",
      padding: 15,
      margin: 10,
      "& p, a": {
        fontSize: 16
      },
      "& h2": {
        fontSize: 22
      },
      "& h3": {
        fontSize: 20
      },
      "& h4": {
        fontSize: 18
      },
    },
    [theme.breakpoints.up("md")]: {
      padding: 20,
      width: 250
    },
    [theme.breakpoints.up("lg")]: {
      width: 300
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
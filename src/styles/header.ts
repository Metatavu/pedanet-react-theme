import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    height: "100vh"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  social: {
    width: "15%",
    minWidth: "10%",
    marginLeft: 15
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "55%"
  },
  buttonSection: {
    position: "relative",
    textAlign: "center",
    opacity: 0.8
  },
  menuButtonOne: {
    backgroundColor: "#386dc2",
    width: "10%",
    height: "60%",
    margin: "1%"
  },
  menuButtonTwo: {
    backgroundColor: "#ffdf3d",
    width: "10%",
    height: "60%",
    margin: "1%"
  },
  menuButtonThree: {
    backgroundColor: "#59a345",
    width: "10%",
    height: "60%",
    margin: "1%"
  },
  menuButtonFour: {
    backgroundColor: "#de782a",
    width: "10%",
    height: "60%",
    margin: "1%"
  },
  logoBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 50
  },
  logo: {
    width: 200,
     display: "flex",
     marginLeft: 60
  },
  localeMenu: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    [theme.breakpoints.up("lg")]: {
      marginLeft: 30,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 50,
    }
  },
  navLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    whiteSpace: "nowrap",
    height: 80,
    textDecoration: "none",
    fontFamily: theme.typography.h3.fontFamily,
    color: theme.palette.primary.main,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.15rem"
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 30,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 40,
    }
  },
  topNavDesktop: {
    position: "relative",
    textAlign: "center"
  }
});
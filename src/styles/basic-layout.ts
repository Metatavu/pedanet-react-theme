import { createStyles } from "@material-ui/core";
import theme from "./theme";
import headerImage from "../img/headerImage.png";

export default createStyles({
  logoBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 50
  },
  headerImage: {
    backgroundImage: `url(${headerImage})`,
    backgroundRepeat: "no-repeat",
    height: "298px"
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
  logo: {
    width: 200,
    display: "flex",
    marginLeft: 60
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "100%",
    backgroundColor: "green",
    color: "white",
    fontSize: "3rem",
  },
});
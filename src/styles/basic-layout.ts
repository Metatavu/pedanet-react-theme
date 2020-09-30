import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({

  root: {
    display: "grid",
    height: "100vh",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto 1fr"
  },
  top: {},
  logoBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginBottom: 50
    }
  },
  horizontalColorBar: {
    width: "100%",
    height: 8,
    backgroundRepeat: "repeat-x",
  },
  headerImage: {
    backgroundRepeat: "no-repeat",
    height: 200,
    backgroundSize: "cover",
    [theme.breakpoints.up("md")]: {
      height: 298,
    }
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  navLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    height: 80,
    textDecoration: "none",
    fontFamily: theme.typography.body1.fontFamily,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: "21px",
    letterSpacing: 0,
    color: "#234c8e",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
      marginLeft: 10
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 30,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 40,
    }
  },
  mobileNav: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
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
    [theme.breakpoints.up("lg")]: {
      marginLeft: 30,
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 40,
    }
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
    backgroundColor: "#008000",
    color: "#fff",
    fontSize: "3rem",
    [theme.breakpoints.up("md")]: {
      maxWidth: "60%"
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 600
    }
  },
});
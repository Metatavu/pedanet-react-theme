import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto 1fr"
  },
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
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: 200,
    [theme.breakpoints.up("md")]: {
      height: 298,
    }
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 0,
      justifyContent: "flex-start"
    },
  },
  navLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    height: 46,
    textDecoration: "none",
    fontFamily: theme.typography.body1.fontFamily,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0,
    color: "#234c8e",
    textTransform: "uppercase",
    [theme.breakpoints.up("sm")]: {
      height: 50,
    },
    [theme.breakpoints.up("md")]: {
      height: 60,
      marginLeft: 15,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 16,
      marginLeft: 30,
      height: 80
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 40,
    }
  },
  logoSection: {
    minHeight: 85,
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  topNavDesktop: {
    textAlign: "center",

  },
  topNavMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "55%"
  },
  logo: {
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
    [theme.breakpoints.up("md")]: {
      width: 500,
    },
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
      minWidth: 600,
      maxWidth: "40%"
    }
  },
  noPrint: {
    ["@media print"]: {
      display: "none"
    }
  },
  popperDisablePortal: {
    marginTop: 44.75
  }, 
  paper: {
    maxHeight: 1000
  },
  readSpeaker: {
    alignSelf: "center",
    width: "180px",
    marginLeft: "20px" ,
    [theme.breakpoints.up("lg")]: {
      marginBottom: "90px"
    },
    maxWidth: "fit-content"
  },
  searchBarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: 400,
    marginLeft: 20,
    marginBottom: 10,
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      alignItems: "center"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-end"
    }
  },
  searchBarAutocomplete: {
    alignSelf: "flex-start", 
    width: "400px",
    [theme.breakpoints.down("md")]: {
      width: "200px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "400px"
    }
  },
  topNavDesktopContainer: {
    display: "flex", 
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start"
    }
  }
});
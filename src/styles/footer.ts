import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  footerContainer: {
    color: "white", 
    paddingTop: "10px",
    paddingLeft: "150px",
    paddingRight: "150px",
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down("lg")]:{
      paddingLeft: "10px",
      paddingRight: "10px"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      flexWrap: "wrap"
    },
    "& a": {
      color: "white"
    },
    "& a: hover": {
      color: "white"
    },
    "& figure": {
      marginLeft: 0
    }
  },
  noPrint: {
    ["@media print"]: {
      display: "none"
    }
  }
});
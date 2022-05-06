import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  footerContainer: {
    color: "white", 
    paddingTop: "10px",
    paddingLeft: "80px",
    paddingRight: "80px",
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
  }
});
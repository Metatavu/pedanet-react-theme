import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    flex: 1,
    "& .meta-side-panel-layout": {
      display: "flex",
      height: "100%"
    },
    "& .meta-side-panel": {
      flex: 1,
      backgroundColor: "#edeef2",
      padding: "2rem",
      height: "100%"
    },
    "& h2, h3, h4": {
      margin: 0
    },
    "& h2:first-child, h3:first-child, h4:first-child, h5:first-child, p:first-child": {
      marginBottom: "1em"
    },
    [theme.breakpoints.down("md")]: {
      marginTop: 25
    }
  }
});
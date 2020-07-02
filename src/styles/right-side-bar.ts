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
    },
    "& a": {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: 0,
      color: "#064e8d"
    },
    "& h2:first-child, h3:first-child, h4:first-child, h5:first-child, p:first-child": {
      marginTop: 0
    },
  }
});
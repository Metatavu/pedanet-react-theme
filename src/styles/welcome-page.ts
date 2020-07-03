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
  columnSection: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "100%"
  },
  column: {
    display: "inline-block",
    width: "14%",
    height: "65%",
    padding: "1%",
    margin: "1%",
    textTransform: "none",
    backgroundColor: "gray"
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
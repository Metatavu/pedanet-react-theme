import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 100,
    width: "100vw",
    height: "calc(100% - 100px)",
    zIndex: 1000,
    [theme.breakpoints.up("md")]: {
      top: 130,
      height: "calc(100% - 130px)",
    },
    backgroundColor: "rgba(45, 45, 45, 0.9)"
  },
  tinyHeader: {
    top: 60,
    height: "calc(100% - 60px)"
  },
  menuContent: {
    display: "flex",
    marginLeft: 150,
  },
  menuGroup: {
    display: "flex",
    flexDirection: "column",
    marginRight: 100
  },
  link: {
    marginBottom: "2rem"
  },
  subLink: {
    marginBottom: "1rem"
  },
  controlContainer: {
    marginTop: 60,
    display: "flex",
    flexDirection: "row-reverse"
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    fontSize: 12,
    textTransform: "initial"
  },
  closeIcon: {
    fontSize: 40
  }
});
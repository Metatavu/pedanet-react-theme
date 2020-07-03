import { createStyles } from "@material-ui/core";

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
    minHeight: "55rem",
  },
  column: {
    display: "inline-block",
    width: "14%",
    minHeight: "55rem",
    padding: "1%",
    margin: "1%",
    textTransform: "none",
    "&:nth-child(1)": {
      backgroundColor: "#386dc2"
    },
    "&:nth-child(2)": {
      backgroundColor: "#ffdf3d"
    },
    "&:nth-child(3)": {
      backgroundColor: "#59a345"
    },
    "&:nth-child(4)": {
      backgroundColor: "#de782a"
    }
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
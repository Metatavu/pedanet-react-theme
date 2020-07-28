import { createStyles } from "@material-ui/core";

export default createStyles({
  "@global": {
    ".saimaa": {
      backgroundColor: "#62BAE9!important"
    },
    ".mustikka": {
      backgroundColor: "#224C8E!important"
    },
    ".kerkka": {
      backgroundColor: "#D2D92A!important"
    },
    ".ruoho": {
      backgroundColor: "#5CA740!important"
    },
    ".marjapuuro": {
      backgroundColor: "#D84C6F!important"
    },
    ".orvokki": {
      backgroundColor: "#A61680!important"
    },
    ".aurinko": {
      backgroundColor: "#FFD400!important"
    },
    ".aamurusko": {
      backgroundColor: "#EF7D25!important"
    }
  },
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
    //default colors
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
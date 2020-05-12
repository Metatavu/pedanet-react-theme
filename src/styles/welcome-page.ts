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
  buttonSection: {
    textAlign: "center",
    opacity: 0.8
  },
  menuButtonOne: {
    backgroundColor: "#386dc2",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#386dc2"
    }
  },
  menuButtonTwo: {
    backgroundColor: "#ffdf3d",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#ffdf3d"
    }
  },
  menuButtonThree: {
    backgroundColor: "#59a345",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
      backgroundColor: "#59a345"
    }
  },
  menuButtonFour: {
    backgroundColor: "#de782a",
    width: "10%",
    height: "60%",
    margin: "1%",
    textTransform: "none",
    "& .MuiButton-label": {
      whiteSpace: "normal"
    },
    "&:hover": {
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
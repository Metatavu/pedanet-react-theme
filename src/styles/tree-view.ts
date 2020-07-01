import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  listItem: {
    borderBottom: "1px solid rgba(0,0,0,0.2)"
  },
  treeDataLink: {
    textDecoration: "none",
    color: "#71767d",
    "&:hover, :visited, :focus": {
      color: "#000"
    },
    "&:hover, :active": {
      textDecoration: "underline",
    }
  }
});
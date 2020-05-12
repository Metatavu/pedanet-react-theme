import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  treeDataLink: {
    textDecoration: "none",
    color: "#000",
    "&:hover, :visited, :focus": {
      color: "#000"
    }
  }
});
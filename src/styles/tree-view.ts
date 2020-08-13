import { createStyles } from "@material-ui/core";

export default createStyles({
  treeWrapper: {
    "& > div": {
      outline: 0
    }
  },
  listItem: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "space-between",
    margin: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  iconWrapper: {
    cursor: "pointer",
    display: "inline-block",
    "& .MuiSvgIcon-root": {
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: "50%",
      transition: "background-color 0.2s ease-out"
    },
    "&:hover  .MuiSvgIcon-root": {
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  }
});
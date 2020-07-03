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
    paddingRight: 0
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
import { createStyles } from "@material-ui/core";
import theme from "./theme";

export default createStyles({
  /**
   * Page styles
   */
  root: {},
  logoBar: {},
  hero: {},
  heroContentContainer: {},
  content: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    display: "flex",
    marginTop: 0,
    flexDirection: "column"
  },
  title: {},
  heroTitle: {},
  button: {},
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  pageContent: {
    maxWidth: "1200px"
  },
  breadcrumb: {
    width: "100%",
    marginBottom: "3rem"
  },
  columns: {
    display: "flex"
  },
  navigation: {
    flex: 1, padding: "2rem"
  },
  contentarea: {
    flex: 3
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#edeef2",
    padding: "2rem"
  },
  htmlContainer: {}
});
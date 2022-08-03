var _a, _b, _c, _d, _e;
import { createStyles } from "@material-ui/core";
import theme from "./theme";
export default createStyles({
    /**
     * Page styles
     */
    root: {},
    pageTitle: (_a = {},
        _a[theme.breakpoints.down("sm")] = {
            fontSize: 26
        },
        _a),
    contentLoader: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        paddingTop: 50
    },
    content: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.dark,
        display: "flex",
        marginTop: 0,
        flexDirection: "column"
    },
    button: {},
    wrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBottom: 50
    },
    pageContent: {
        maxWidth: "1200px",
        width: "100%"
    },
    breadcrumb: (_b = {
            width: "100%",
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        },
        _b[theme.breakpoints.up("md")] = {
            paddingBottom: "3rem"
        },
        _b.display = "flex",
        _b.flexWrap = "wrap",
        _b.flexDirection = "row",
        _b.justifyContent = "space-between",
        _b),
    columns: (_c = {
            display: "flex",
            flexDirection: "column"
        },
        _c[theme.breakpoints.up("md")] = {
            height: "calc(100% - 55px)",
            flexDirection: "row"
        },
        _c),
    navigation: {
        flex: 1,
        padding: "2rem"
    },
    contentArea: (_d = {
            flex: 2
        },
        _d[theme.breakpoints.up("lg")] = {
            flex: 3
        },
        _d),
    leftsidebar: {
        flex: 1,
        backgroundColor: "#fff",
        padding: "2rem",
        "& a": {
            fontFamily: "'Titillium Web', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 0,
            color: "#064e8d"
        },
        "& h2:first-child, h3:first-child, h4:first-child, h5:first-child, p:first-child": {
            marginTop: 0
        },
    },
    treeMenuTitle: {
        fontFamily: "Cairo",
        fontSize: 14,
        fontWeight: 900,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginBottom: 8,
        color: "#71767d",
    },
    htmlContainer: {
    // We no longer use this for basic wordpress content styling, instead let's put them to the style.css
    // Use in dire situations only
    },
    accessibilityTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    accessibilityGroupLabel: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#54575a"
    },
    noPrint: (_e = {},
        _e["@media print"] = {
            display: "none"
        },
        _e)
});
//# sourceMappingURL=page-content.js.map
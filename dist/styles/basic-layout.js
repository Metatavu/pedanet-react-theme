var _a, _b, _c, _d, _e, _f, _g, _h, _j;
import { createStyles } from "@material-ui/core";
import theme from "./theme";
export default createStyles({
    root: {
        display: "grid",
        height: "100vh",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto 1fr"
    },
    logoBar: (_a = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            marginBottom: theme.spacing(2)
        },
        _a[theme.breakpoints.up("md")] = {
            marginBottom: 50
        },
        _a),
    horizontalColorBar: {
        width: "100%",
        height: 8,
        backgroundRepeat: "repeat-x",
    },
    headerImage: (_b = {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: 200
        },
        _b[theme.breakpoints.up("md")] = {
            height: 298,
        },
        _b),
    nav: (_c = {
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            marginBottom: theme.spacing(1)
        },
        _c[theme.breakpoints.up("md")] = {
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 0,
            justifyContent: "flex-start"
        },
        _c),
    navLink: (_d = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "nowrap",
            height: 46,
            textDecoration: "none",
            fontFamily: theme.typography.body1.fontFamily,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 0,
            color: "#234c8e",
            textTransform: "uppercase"
        },
        _d[theme.breakpoints.up("sm")] = {
            height: 50,
        },
        _d[theme.breakpoints.up("md")] = {
            height: 60,
            marginLeft: 15,
        },
        _d[theme.breakpoints.up("lg")] = {
            fontSize: 16,
            marginLeft: 30,
            height: 80
        },
        _d[theme.breakpoints.up("xl")] = {
            marginLeft: 40,
        },
        _d),
    logoSection: (_e = {
            marginTop: theme.spacing(5),
            minHeight: 85,
            display: "flex"
        },
        _e[theme.breakpoints.down("md")] = {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            justifyContent: "space-between",
            alignItems: "center"
        },
        _e),
    topNavDesktop: {
        textAlign: "center",
    },
    topNavMobile: (_f = {},
        _f[theme.breakpoints.up("md")] = {
            display: "none"
        },
        _f),
    searchSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "55%"
    },
    logo: (_g = {
            width: 140
        },
        _g[theme.breakpoints.up("sm")] = {
            width: 180,
        },
        _g[theme.breakpoints.up("md")] = {
            width: 200,
        },
        _g[theme.breakpoints.up("lg")] = {
            marginLeft: 30,
        },
        _g[theme.breakpoints.up("xl")] = {
            marginLeft: 40,
        },
        _g),
    titleContainer: (_h = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            backgroundColor: "#008000",
            color: "#fff",
            fontSize: "3rem"
        },
        _h[theme.breakpoints.up("md")] = {
            maxWidth: "60%"
        },
        _h[theme.breakpoints.up("lg")] = {
            minWidth: 600,
            maxWidth: "40%"
        },
        _h),
    noPrint: (_j = {},
        _j["@media print"] = {
            display: "none"
        },
        _j),
    popperDisablePortal: {
        marginTop: 44.75
    },
    paper: {
        maxHeight: 1000
    }
});
//# sourceMappingURL=basic-layout.js.map
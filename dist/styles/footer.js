var _a, _b;
import { createStyles } from "@material-ui/core";
import theme from "./theme";
export default createStyles({
    footerContainer: (_a = {
            color: "white",
            paddingTop: "10px",
            paddingLeft: "150px",
            paddingRight: "150px",
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
        },
        _a[theme.breakpoints.down("lg")] = {
            paddingLeft: "10px",
            paddingRight: "10px"
        },
        _a[theme.breakpoints.down("sm")] = {
            flexDirection: "column",
            justifyContent: "flex-start",
            flexWrap: "wrap"
        },
        _a["& a"] = {
            color: "white",
            textDecoration: "none"
        },
        _a["& a: hover"] = {
            color: "white"
        },
        _a["& figure"] = {
            marginLeft: 0
        },
        _a),
    noPrint: (_b = {},
        _b["@media print"] = {
            display: "none"
        },
        _b)
});
//# sourceMappingURL=footer.js.map
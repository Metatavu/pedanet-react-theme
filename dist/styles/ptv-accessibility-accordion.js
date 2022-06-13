import { createStyles } from "@material-ui/core";
export default createStyles({
    accessibilityTitle: {
        fontWeight: "bold"
    },
    accessibilityGroupLabel: {
        fontWeight: "bold",
        color: "#54575a",
        margin: 0,
        marginLeft: 10
    },
    expandIcon: {
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "50%",
        color: "#888"
    },
    accordionContent: {
        padding: "24px 48px 12px"
    },
    sentence: {
        position: "relative",
        "&:before": {
            content: '"•"',
            display: "block",
            position: "absolute",
            left: -15
        }
    }
});
//# sourceMappingURL=ptv-accessibility-accordion.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { withStyles } from "@material-ui/core";
import styles from "../../styles/right-side-bar";
/**
 * A component for post page right side bar content
 */
var RightSideBar = /** @class */ (function (_super) {
    __extends(RightSideBar, _super);
    /**
     * Component constructor
     *
     * @param props
     */
    function RightSideBar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    /**
     * Component did mount life-cycle handler
     */
    RightSideBar.prototype.componentDidMount = function () {
    };
    /**
     * Component render
     */
    RightSideBar.prototype.render = function () {
        var classes = this.props.classes;
        return (React.createElement("div", { className: classes.root + " readthis" }, this.props.rightSideBarContent));
    };
    return RightSideBar;
}(React.Component));
export default withStyles(styles)(RightSideBar);
//# sourceMappingURL=RightSideBar.js.map
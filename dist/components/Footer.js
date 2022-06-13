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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Grid, withStyles } from "@material-ui/core";
import * as React from "react";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/footer";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
/**
 * Footer component
 */
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    /**
     * Constructor
     * @param props component properties
     */
    function Footer(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Renders columns
         */
        _this.renderColumns = function () {
            if (_this.state.columns) {
                return _this.state.columns.map(function (column) {
                    return (React.createElement(Grid, { item: true, style: { display: "flex", flexWrap: "wrap", flexDirection: "column" } }, column.props.children.map(function (child) {
                        return child;
                    })));
                });
            }
            return React.createElement(React.Fragment, null);
        };
        /**
         * Transform html source content before it is rendered
         *
         * @param node DomElement
         * @param index DomElement index
         */
        _this.transformContent = function (node, index) {
            if (!_this.state.columns) {
                _this.setState({
                    columns: _this.wpColumnParsing(node, index)
                });
            }
            return convertNodeToElement(node, index, _this.transformContent);
        };
        /**
         * Parses columns from wp-columns
         *
         * @param node DomElement
         * @param index current node index
         */
        _this.wpColumnParsing = function (node, index) {
            if (!node.children) {
                return undefined;
            }
            var columnsDividedToTwo = node.children.filter(function (child) { return child.attribs && child.attribs.class.match("wp-block-column"); });
            var nodes = columnsDividedToTwo.map(function (item) {
                return convertNodeToElement(item, index, function () { });
            });
            return nodes;
        };
        _this.state = {};
        return _this;
    }
    /**
     * Component lifecycle handler
     */
    Footer.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, footerPosts, postContent, rendered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = ApiUtils.getApi();
                        return [4 /*yield*/, api.getWpV2Posts({ lang: [this.props.lang], slug: ["footer"] })];
                    case 1:
                        footerPosts = _a.sent();
                        if (footerPosts.length > 0) {
                            postContent = footerPosts[0].content;
                            if (postContent) {
                                rendered = postContent.rendered;
                                if (rendered) {
                                    ReactHtmlParser(rendered, { transform: this.transformContent });
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Footer.prototype.render = function () {
        var classes = this.props.classes;
        return (React.createElement("div", { className: classes.noPrint },
            React.createElement(Grid, { container: true, justifyContent: "space-around", style: { backgroundColor: "#234c8e" } },
                React.createElement(Grid, { className: classes.footerContainer, container: true, lg: 8, md: 12, sm: 12 }, this.renderColumns())),
            React.createElement("img", { style: { height: "8px", width: "100%" }, src: "https://mikkeli.fi/gfx/layout/mikkeli-banner-border.png" })));
    };
    return Footer;
}(React.Component));
export default withStyles(styles)(Footer);
//# sourceMappingURL=Footer.js.map
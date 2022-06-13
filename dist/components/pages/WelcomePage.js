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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from "react";
import BasicLayout from "../BasicLayout";
import ApiUtils from "../../utils/ApiUtils";
import { Container, withStyles } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
/**
 * WelcomePage component
 */
var WelcomePage = /** @class */ (function (_super) {
    __extends(WelcomePage, _super);
    /**
     * Constructor
     *
     * @param props component properties
     */
    function WelcomePage(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Component did mount life-cycle handler
         */
        _this.componentDidMount = function () { return __awaiter(_this, void 0, void 0, function () {
            var api, _a, posts, frontPageColumnPost, frontPageTextPost;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        window.addEventListener("scroll", this.handleScroll);
                        this.setState({
                            loading: true
                        });
                        api = ApiUtils.getApi();
                        return [4 /*yield*/, Promise.all([
                                api.getWpV2Posts({ lang: [this.props.lang] }),
                                api.getWpV2Posts({ lang: [this.props.lang], slug: ["etusivun-kolumnit"] }),
                                api.getWpV2Posts({ lang: [this.props.lang], slug: ["etusivun-teksti"] })
                            ])];
                    case 1:
                        _a = _b.sent(), posts = _a[0], frontPageColumnPost = _a[1], frontPageTextPost = _a[2];
                        this.setState({
                            posts: posts,
                            loading: false,
                            frontPageColumnPost: frontPageColumnPost.length > 0 ? frontPageColumnPost[0] : undefined,
                            textSection: this.renderTextSection(frontPageTextPost)
                        });
                        this.getColumnsContent();
                        this.hidePageLoader();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Renders the front page text section
         *
         * @param posts posts
         */
        _this.renderTextSection = function (posts) {
            if (!posts.length || !posts[0].content || !posts[0].content.rendered) {
                return [React.createElement("p", null)];
            }
            return ReactHtmlParser(posts[0].content.rendered);
        };
        /**
         * Renders colums
         */
        _this.renderColumns = function () {
            return (React.createElement(React.Fragment, null, !_this.state.loading &&
                _this.columnsRendered()));
        };
        /**
         * Returns columns
         */
        _this.columnsRendered = function () {
            var classes = _this.props.classes;
            var columns = _this.state.columns;
            if (!columns) {
                return;
            }
            return columns.map(function (column) {
                return (React.createElement("div", { className: classes.column + " " + column.props.className }, column.props.children.map(function (child) {
                    return child;
                })));
            });
        };
        /**
         * Set html source for columns content
         */
        _this.getColumnsContent = function () {
            var frontPageColumnPost = _this.state.frontPageColumnPost;
            if (!frontPageColumnPost) {
                return;
            }
            var renderedContent = frontPageColumnPost.content ? frontPageColumnPost.content.rendered : undefined;
            if (!renderedContent) {
                return;
            }
            ReactHtmlParser(renderedContent, { transform: _this.transformContent });
        };
        /**
         * Transform html source content before it is rendered
         *
         * @param node DomElement
         * @param index DomElement index
         */
        _this.transformContent = function (node, index) {
            var classNames = _this.getElementClasses(node);
            if (classNames.indexOf("kolumnit") > -1) {
                if (!_this.state.columns) {
                    _this.setState({
                        columns: _this.wpColumnParsing(node, index)
                    });
                }
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
            var columnsDividedTwiceToTwo = [];
            columnsDividedToTwo.forEach(function (item) {
                if (item.children) {
                    columnsDividedTwiceToTwo = __spreadArrays(columnsDividedTwiceToTwo, item.children.filter(function (child) { return child.attribs && child.attribs.class && child.attribs.class.match("wp-block-column"); }));
                }
            });
            var columnsDividedToFour = [];
            columnsDividedTwiceToTwo.forEach(function (item) {
                if (item.children) {
                    columnsDividedToFour = __spreadArrays(columnsDividedToFour, item.children.filter(function (child) { return child.attribs && child.attribs.class && child.attribs.class.match("wp-block-column"); }));
                }
            });
            var nodes = columnsDividedToFour.map(function (item) {
                return convertNodeToElement(item, index, _this.transformContent);
            });
            return nodes;
        };
        /**
         * get html element classes
         *
         * @param node DomElement
         *
         * @returns string[]
         */
        _this.getElementClasses = function (node) {
            var classString = node.attribs ? node.attribs.class : "";
            if (node.attribs && node.attribs.class) {
                return classString.split(" ");
            }
            return [];
        };
        /**
         * Update scrolling position method
         */
        _this.handleScroll = function () {
            var currentScrollPos = window.pageYOffset;
            _this.setState({
                scrollPosition: currentScrollPos
            });
        };
        _this.state = {
            posts: [],
            loading: false,
            scrollPosition: 0,
            siteMenuVisible: false,
            siteSearchVisible: false,
            textSection: []
        };
        return _this;
    }
    /**
     * Component will unmount life-cycle handler
     */
    WelcomePage.prototype.componentWillUnmount = function () {
        window.removeEventListener("scroll", this.handleScroll);
    };
    /**
     * Component render method
     */
    WelcomePage.prototype.render = function () {
        var _a = this.props, lang = _a.lang, classes = _a.classes;
        return (React.createElement(BasicLayout, { lang: lang, frontPage: true },
            React.createElement(Container, { style: { marginBottom: 50 }, fixed: true },
                React.createElement("div", { className: classes.frontPageText }, this.state.textSection),
                React.createElement("div", { className: classes.columnSection, role: "heading", "aria-level": 1 }, this.renderColumns()))));
    };
    /**
     * Hide page loader
     */
    WelcomePage.prototype.hidePageLoader = function () {
        var loaderElement = document.getElementById("pageLoader");
        if (loaderElement) {
            loaderElement.style.opacity = "0";
            setTimeout(function () {
                loaderElement.style.display = "none";
            }, 500);
        }
    };
    return WelcomePage;
}(React.Component));
export default withStyles(styles)(WelcomePage);
//# sourceMappingURL=WelcomePage.js.map
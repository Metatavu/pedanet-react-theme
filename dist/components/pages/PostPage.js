var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, withStyles, Breadcrumbs, Link, Typography, CircularProgress, Hidden, Collapse, Button } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import strings from "../../localization/strings";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from "../generic/TreeView";
import RightSideBar from "../generic/RightSideBar";
import PtvAccessibilityAccordion from "../generic/ptv-accessibility-accordion";
import MenuIcon from "@material-ui/icons/Menu";
/**
 * PostPage component
 */
var PostPage = /** @class */ (function (_super) {
    __extends(PostPage, _super);
    /**
     * Constructor
     *
     * @param props component properties
     */
    function PostPage(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Component did mount life-cycle handler
         */
        _this.componentDidMount = function () {
            _this.loadContent();
        };
        /**
         * Component did update life-cycle handler
         */
        _this.componentDidUpdate = function (prevProps) {
            if (prevProps.slug !== _this.props.slug) {
                _this.loadContent();
            }
        };
        /**
         * Renders breadcrumb
         */
        _this.renderBreadcrumb = function () {
            var breadcrumb = _this.state.breadcrumb;
            return breadcrumb.map(function (crumb) {
                return (React.createElement(Link, { key: crumb.label, color: "inherit", href: crumb.link }, crumb.label));
            });
        };
        /**
         * Render content method
         */
        _this.renderContent = function () {
            var classes = _this.props.classes;
            return (React.createElement(Container, { className: classNames(classes.root, _this.state.isArticle && "article") }, _this.renderPostContent()));
        };
        /**
         * Loads page or post content
         */
        _this.loadContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var lang, slugParts, slug, api, apiCalls, page, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            loading: true
                        });
                        lang = this.props.lang;
                        slugParts = this.props.slug.split("/");
                        slug = slugParts.pop() || slugParts.pop();
                        if (!slug) {
                            // TODO: handle error
                            return [2 /*return*/];
                        }
                        api = ApiUtils.getApi();
                        return [4 /*yield*/, Promise.all([
                                api.getWpV2Pages({ lang: [lang], slug: [slug] }),
                                api.getWpV2Posts({ lang: [lang], slug: [slug] })
                            ])];
                    case 1:
                        apiCalls = _a.sent();
                        page = apiCalls[0][0];
                        post = apiCalls[1][0];
                        this.setState({
                            page: page,
                            post: post,
                            isArticle: !!post
                        });
                        this.breadcrumbPath();
                        this.hidePageLoader();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Initializes building a breadcrumb
         */
        _this.breadcrumbPath = function () { return __awaiter(_this, void 0, void 0, function () {
            var page, api_1, breadcrumb_1, pageTitle_1, treeMenuTitle_1, buildPath_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.state.page;
                        if (!page) return [3 /*break*/, 2];
                        api_1 = ApiUtils.getApi();
                        breadcrumb_1 = [];
                        treeMenuTitle_1 = "";
                        buildPath_1 = function (current) { return __awaiter(_this, void 0, void 0, function () {
                            var title, link, parentId, parent_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        title = current.title ? "".concat(current.title.rendered) : "";
                                        link = "".concat(current.link);
                                        breadcrumb_1 = __spreadArray([{ label: title, link: link }], breadcrumb_1, true);
                                        if (!(current.parent !== undefined && current.parent !== 0)) return [3 /*break*/, 3];
                                        parentId = current.parent;
                                        return [4 /*yield*/, api_1.getWpV2PagesById({ id: "".concat(parentId) })];
                                    case 1:
                                        parent_1 = _a.sent();
                                        if (parent_1.taxonomy_academy !== undefined &&
                                            parent_1.taxonomy_academy.length === 0 &&
                                            current.taxonomy_academy !== undefined &&
                                            current.taxonomy_academy.length > 0) {
                                            breadcrumb_1 = [{ label: title, link: link }];
                                            treeMenuTitle_1 = title;
                                        }
                                        return [4 /*yield*/, buildPath_1(parent_1)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        pageTitle_1 = current.title;
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, buildPath_1(page)];
                    case 1:
                        _a.sent();
                        this.setState({
                            breadcrumb: breadcrumb_1,
                            treeMenuTitle: treeMenuTitle_1,
                            pageTitle: pageTitle_1,
                            loading: false
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Render post content method
         */
        _this.renderPostContent = function () {
            var _a = _this.props, classes = _a.classes, lang = _a.lang;
            var page = _this.state.page;
            moment.locale(lang);
            return (React.createElement("div", { className: classNames(classes.htmlContainer, _this.state.isArticle && "article"), role: "main" },
                page && page.title &&
                    React.createElement("h1", { className: classes.pageTitle }, page.title.rendered),
                !_this.state.loading &&
                    _this.getPageOrPostContent(),
                _this.state.loading &&
                    React.createElement("div", { className: classes.contentLoader },
                        React.createElement(CircularProgress, null))));
        };
        /**
         * Render side bar content method
         */
        _this.renderSideBarContent = function () {
            return (React.createElement(React.Fragment, null, !_this.state.loading &&
                _this.getSideBarContent()));
        };
        /**
         * Mobile menu toggle
         */
        _this.onMobileMenuClick = function () {
            _this.setState({ showMobileMenu: !_this.state.showMobileMenu });
        };
        /**
         * get html element classes
         *
         * @param node DomElement
         */
        _this.getElementClasses = function (node) {
            var classString = node.attribs ? node.attribs.class : "";
            if (node.attribs && node.attribs.class) {
                return classString.split(" ");
            }
            return [];
        };
        /**
         * Set html source for page content
         */
        _this.getPageOrPostContent = function () {
            var _a = _this.state, page = _a.page, post = _a.post;
            var noContentError = React.createElement("h2", { className: "error-text" }, strings.pageNotFound);
            var undefinedContentError = React.createElement("h2", { className: "error-text" }, strings.somethingWentWrong);
            if (!page && !post) {
                return noContentError;
            }
            var renderedContent = page && page.content ? page.content.rendered : post && post.content ? post.content.rendered : undefined;
            if (!renderedContent) {
                return undefinedContentError;
            }
            return ReactHtmlParser(renderedContent, { transform: _this.transformContent });
        };
        /**
         * Set html source for side panel content
         */
        _this.getSideBarContent = function () {
            var _a = _this.state, page = _a.page, post = _a.post;
            var noContentError = React.createElement("h2", { className: "error-text" }, strings.pageNotFound);
            var undefinedContentError = React.createElement("h2", { className: "error-text" }, strings.somethingWentWrong);
            if (!page && !post) {
                return noContentError;
            }
            var renderedContent = page && page.content ? page.content.rendered : post && post.content ? post.content.rendered : undefined;
            if (!renderedContent) {
                return undefinedContentError;
            }
            return ReactHtmlParser(renderedContent, { transform: _this.transformSidePanelContent });
        };
        /**
         * Set html source for page content
         */
        _this.setTitleSource = function () {
            var _a = _this.state, pageTitle = _a.pageTitle, loading = _a.loading;
            var noContentError = "".concat(strings.whoops);
            var undefinedContentError = "".concat(strings.error);
            if (pageTitle) {
                return pageTitle.rendered || undefinedContentError;
            }
            else if (!loading) {
                return noContentError;
            }
            else {
                return undefined;
            }
        };
        /**
         * transform html source content before it is rendered
         *
         * @param node DomElement
         * @param index DomElement index
         */
        _this.transformContent = function (node, index) {
            var classes = _this.props.classes;
            var classNames = _this.getElementClasses(node);
            if (classNames.includes("meta-side-panel")) {
                return null;
            }
            if (classNames.includes("accessibility")) {
                var attribs = node.attribs || {};
                if (attribs["data-entrances"]) {
                    var entranceData = JSON.parse(attribs["data-entrances"]);
                    if (!entranceData || entranceData.length === 0) {
                        return null;
                    }
                    return (React.createElement(React.Fragment, null,
                        React.createElement("h2", { className: classes.accessibilityTitle }, strings.accessibility),
                        entranceData.map(function (entrance) { return _this.renderPtvEntrance(entrance); })));
                }
            }
            return convertNodeToElement(node, index, _this.transformContent);
        };
        /**
         * Renders PTV entrance data
         *
         * @param entranceData entrance data
         */
        _this.renderPtvEntrance = function (entranceData) {
            if (!entranceData.accessibilitySentences) {
                return null;
            }
            return entranceData.accessibilitySentences.map(function (accessibilitySentence, index) {
                return _this.renderPtvAccessibilitySentence(accessibilitySentence, index);
            });
        };
        /**
         * Renders PTV accessibility sentence
         *
         * @param accessibilitySentence accessibility sentence
         * @param index index
         */
        _this.renderPtvAccessibilitySentence = function (accessibilitySentence, index) {
            return (React.createElement(PtvAccessibilityAccordion, { key: index, accessibilitySentence: accessibilitySentence }));
        };
        /**
         * Extract possible side panel content from HTML structure and transform it to React elements
         *
         * @param node DomElement
         * @param index DomElement index
         */
        _this.transformSidePanelContent = function (node, index) {
            var sidePanelContent = _this.findContentByClassnames([node], ["meta-side-panel"]);
            return sidePanelContent ?
                convertNodeToElement(sidePanelContent, 0, _this.defaultTransformContent) :
                null;
        };
        /**
         * Finds first node from DOM tree that matches all given class names
         *
         * @param domElements DOM elements as list
         * @param classNames class names list to be matched
         * @returns matching DOM element if found, otherwise undefined
         */
        _this.findContentByClassnames = function (domElements, classNames) {
            var _loop_1 = function (i) {
                var element = domElements[i];
                var elementClasses = _this.getElementClasses(element);
                if (classNames.every(function (className) { return elementClasses.includes(className); })) {
                    return { value: element };
                }
                if (element.children && element.children.length > 0) {
                    var childMatch = _this.findContentByClassnames(element.children, classNames);
                    if (childMatch) {
                        return { value: childMatch };
                    }
                }
            };
            for (var i = 0; i < domElements.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return undefined;
        };
        /**
         * Default transform content
         *
         * @param node DOM element
         * @param index index of DOM element
         */
        _this.defaultTransformContent = function (node, index) {
            return convertNodeToElement(node, index, _this.defaultTransformContent);
        };
        _this.state = {
            isArticle: false,
            loading: false,
            showMobileMenu: false,
            breadcrumb: []
        };
        return _this;
    }
    /**
     * Component render method
     */
    PostPage.prototype.render = function () {
        var _a = this.props, classes = _a.classes, lang = _a.lang, slug = _a.slug, mainPageSlug = _a.mainPageSlug;
        var _b = this.state, treeMenuTitle = _b.treeMenuTitle, showMobileMenu = _b.showMobileMenu;
        var rightSidebarContent = this.renderSideBarContent();
        var currentScript = document.scripts["bundle_script"];
        var readSpeakerId = currentScript.getAttribute("data-read-speaker-id");
        return (React.createElement(BasicLayout, { lang: lang, innerPageSlug: slug, mainPageSlug: mainPageSlug, title: this.setTitleSource() || React.createElement(CircularProgress, null) },
            React.createElement("div", { className: classes.wrapper },
                React.createElement("div", { className: classes.pageContent },
                    React.createElement("div", { className: classes.breadcrumb },
                        React.createElement(Breadcrumbs, { separator: ">", "aria-label": "breadcrumb" },
                            React.createElement(Link, { color: "inherit", href: "/" }, "Etusivu"),
                            this.state.breadcrumb && this.renderBreadcrumb()),
                        React.createElement("div", { id: "readspeaker_button1", className: "rs_skip rsbtn rs_preserve" },
                            React.createElement("a", { rel: "nofollow", className: "rsbtn_play", accessKey: "L", title: "Kuuntele", href: "//app-eu.readspeaker.com/cgi-bin/rsent?customerid=".concat(readSpeakerId, "&amp;lang=fi_fi&amp;readclass=readthis&amp;url=").concat(encodeURIComponent(window.location.href)) },
                                React.createElement("span", { className: "rsbtn_left rsimg rspart" },
                                    React.createElement("span", { className: "rsbtn_text" },
                                        React.createElement("span", null, "Kuuntele"))),
                                React.createElement("span", { className: "rsbtn_right rsimg rsplay rspart" })))),
                    React.createElement("div", { className: classes.columns },
                        React.createElement(Hidden, { smDown: true },
                            React.createElement("div", { className: "".concat(classes.leftsidebar, " ").concat(classes.noPrint), role: "navigation", "aria-label": "nav wrapper" },
                                React.createElement(Typography, { className: classes.treeMenuTitle }, treeMenuTitle || this.setTitleSource()),
                                React.createElement(TreeView, { lang: lang, slug: slug }))),
                        React.createElement(Hidden, { mdUp: true },
                            React.createElement(Button, { endIcon: React.createElement(MenuIcon, null), className: classes.noPrint, color: "primary", variant: "outlined", onClick: this.onMobileMenuClick },
                                React.createElement("div", null, treeMenuTitle || this.setTitleSource()))),
                        React.createElement(Hidden, { mdUp: true },
                            React.createElement(Collapse, { in: showMobileMenu },
                                React.createElement("div", { className: "".concat(classes.leftsidebar, " ").concat(classes.noPrint), role: "navigation", "aria-label": "nav wrapper" },
                                    React.createElement(TreeView, { lang: lang, slug: slug })))),
                        React.createElement("div", { className: "".concat(classes.contentArea, " readthis") }, this.renderContent()),
                        React.createElement(RightSideBar, { rightSideBarContent: rightSidebarContent }))))));
    };
    /**
     * Hide page loader
     */
    PostPage.prototype.hidePageLoader = function () {
        var loaderElement = document.getElementById("pageLoader");
        if (loaderElement) {
            loaderElement.style.opacity = "0";
            setTimeout(function () {
                loaderElement.style.display = "none";
            }, 500);
        }
    };
    return PostPage;
}(React.Component));
export default withStyles(styles)(PostPage);
//# sourceMappingURL=PostPage.js.map
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as React from "react";
import { withStyles, Link, Container, Hidden, IconButton, Collapse, TextField, Typography } from "@material-ui/core";
import bar from "../resources/img/bar.png";
import mikkeliLogo from "../resources/img/mikkeliLogo.png";
import headerImage from "../resources/img/headerImage.png";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";
import { Autocomplete } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";
import Footer from "./Footer";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import CommentOutlined from "@material-ui/icons/CommentOutlined";
import strings from "../localization/strings";
/**
 * React component for basic application layout
 */
var BasicLayout = /** @class */ (function (_super) {
    __extends(BasicLayout, _super);
    /**
     * Constructor
     * @param props component properties
     */
    function BasicLayout(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Component did mount life-cycle handler
         */
        _this.componentDidMount = function () { return __awaiter(_this, void 0, void 0, function () {
            var component, eventCalendarUrl, api, mainMenu, bannerImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = this;
                        window.addEventListener("keydown", function (event) {
                            if (event.key === "Enter" && event.target.id === "site-wide-search") {
                                component.setState({ redirectToSearch: true });
                            }
                        });
                        window.addEventListener("scroll", this.handleScroll);
                        this.setState({
                            loading: true,
                        });
                        eventCalendarUrl = "".concat(window.location.origin, "/koulutuskalenteri/");
                        api = ApiUtils.getApi();
                        return [4 /*yield*/, api.getMainMenu()];
                    case 1:
                        mainMenu = (_a.sent()).filter(function (item) { return item.title != "Haku"; });
                        return [4 /*yield*/, this.getBannerImage()];
                    case 2:
                        bannerImage = _a.sent();
                        if (bannerImage) {
                            this.setState({ postThumbnail: bannerImage });
                        }
                        this.setState({
                            loading: false,
                            mainMenu: mainMenu,
                            eventCalendarUrl: eventCalendarUrl
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Builds request params
         *
         * @param query query
         * @param elasticKey Elasticsearch key
         * @param resultType Result type
         * @param baseUrl base url
         */
        _this.buildSearchRequestParams = function (query, elasticKey, resultType, baseUrl) { return ({
            method: "POST",
            body: JSON.stringify({
                page: {
                    size: 5
                },
                query: query,
                filters: {
                    "all": [
                        { "all": [
                                { "base_url": baseUrl },
                                { "type": resultType }
                            ] }
                    ]
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer ".concat(elasticKey)
            }
        }); };
        /**
         * Reacts to changing search text
         *
         * @param _ event
         * @param value search text
         */
        _this.onSearchChange = function (_, value) { return __awaiter(_this, void 0, void 0, function () {
            var currentScript, url, key, oppiminenDomain, mikkeliDomain, news, pages, mikkeliPages, pageOptions, newsOptions, mikkeliOptions, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ search: { type: "", title: value, url: "" } });
                        currentScript = document.scripts["bundle_script"];
                        if (!currentScript) {
                            return [2 /*return*/];
                        }
                        url = currentScript.getAttribute('data-elastic-url');
                        key = currentScript.getAttribute('data-elastic-key');
                        oppiminenDomain = currentScript.getAttribute('data-oppiminen-domain');
                        mikkeliDomain = currentScript.getAttribute('data-mikkeli-domain');
                        if (!url || !key || !oppiminenDomain || !mikkeliDomain) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fetch(url + "/search.json", this.buildSearchRequestParams(value, key, "post", mikkeliDomain))];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        news = _a.sent();
                        return [4 /*yield*/, fetch(url + "/search.json", this.buildSearchRequestParams(value, key, "page", oppiminenDomain))];
                    case 3: return [4 /*yield*/, (_a.sent()).json()];
                    case 4:
                        pages = _a.sent();
                        return [4 /*yield*/, fetch(url + "/search.json", this.buildSearchRequestParams(value, key, "page", mikkeliDomain))];
                    case 5: return [4 /*yield*/, (_a.sent()).json()];
                    case 6:
                        mikkeliPages = _a.sent();
                        pageOptions = pages.results.map(function (result) { return ({ title: result.title.raw, type: strings.pages, url: result.url.raw }); });
                        newsOptions = news.results.map(function (result) { return ({ title: result.title.raw, type: strings.news, url: result.url.raw }); });
                        mikkeliOptions = mikkeliPages.results.map(function (result) { return ({ title: result.title.raw, type: strings.mikkeli, url: result.url.raw }); });
                        options = pageOptions.concat(newsOptions).concat(mikkeliOptions);
                        this.setState({ options: options });
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Renders the search bar
         */
        _this.renderSearchbar = function () {
            var classes = _this.props.classes;
            return (React.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: 400,
                    marginLeft: 20,
                    marginBottom: 10
                } },
                React.createElement(Autocomplete, { "aria-labelledby": strings.search, id: "site-wide-search", value: _this.state.search, size: "small", style: { alignSelf: "flex-start", width: "400px" }, options: _this.state.options, getOptionLabel: function (option) { return option.title; }, groupBy: function (option) { return option.type; }, onInputChange: _this.onSearchChange, renderGroup: _this.renderGroup, renderInput: function (params) { return React.createElement(TextField, __assign({}, params, { label: strings.search, variant: "outlined" })); }, renderOption: _this.renderOption, ListboxProps: { style: { maxHeight: "1000px" } }, disablePortal: true, classes: {
                        popperDisablePortal: classes.popperDisablePortal,
                        paper: classes.paper
                    } })));
        };
        /**
         * Renders one group for the searchbar results
         *
         * @param params group params
         */
        _this.renderGroup = function (params) {
            return (React.createElement(React.Fragment, null,
                React.createElement(Typography, { style: { marginLeft: "10px", fontSize: "1.5rem", fontWeight: "bold" } }, params.group),
                React.createElement(Container, { style: { overflow: "hidden", paddingLeft: 0 } }, params.children)));
        };
        /**
         * Renders an option
         *
         * @param option option to render
         */
        _this.renderOption = function (option) {
            var title = option.title.length > 50 ? option.title.substring(0, 50) + "..." : option.title;
            var icon = option.type === strings.news ? React.createElement(CommentOutlined, { fontSize: "medium" }) : React.createElement(DescriptionOutlined, { fontSize: "medium" });
            return (React.createElement(Link, { style: { fontSize: "1.5rem", fontWeight: "normal", whiteSpace: "nowrap", display: "flex", alignItems: "center" }, color: "inherit", href: option.url },
                icon,
                title));
        };
        /**
         * Render menu method
         */
        _this.renderMenu = function () {
            var _a = _this.state, mainMenu = _a.mainMenu, eventCalendarUrl = _a.eventCalendarUrl;
            var classes = _this.props.classes;
            if (!mainMenu || mainMenu.length < 1) {
                return null;
            }
            return (React.createElement("div", { style: { flexWrap: 'nowrap' }, className: classes.nav },
                mainMenu.map(_this.renderMenuItem),
                eventCalendarUrl && _this.renderEventCalendarLink(eventCalendarUrl)));
        };
        /**
         * Render menu item method
         *
         * @param item menu item
         */
        _this.renderMenuItem = function (item) {
            var classes = _this.props.classes;
            return (React.createElement(Link, { variant: "h6", key: item.title, href: item.link, className: classes.navLink }, item.title));
        };
        /**
         * Returns event calendar link rendered
         *
         * @param link link to event calendar page
         */
        _this.renderEventCalendarLink = function (link) {
            var classes = _this.props.classes;
            return (React.createElement(Link, { variant: "h6", href: link, className: classes.navLink }, "Koulutuskalenteri"));
        };
        /**
         * Gets banner image
         */
        _this.getBannerImage = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, frontPage, innerPageSlug, mainPageSlug, api, innerPageBannerImage, mainPageBannerImage, frontPageBannerImage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, frontPage = _a.frontPage, innerPageSlug = _a.innerPageSlug, mainPageSlug = _a.mainPageSlug;
                        api = ApiUtils.getApi();
                        if (!innerPageSlug) return [3 /*break*/, 2];
                        return [4 /*yield*/, api.getPostThumbnail({ slug: innerPageSlug })];
                    case 1:
                        innerPageBannerImage = _b.sent();
                        if (innerPageBannerImage !== "false") {
                            return [2 /*return*/, innerPageBannerImage];
                        }
                        _b.label = 2;
                    case 2:
                        if (!mainPageSlug) return [3 /*break*/, 4];
                        return [4 /*yield*/, api.getPostThumbnail({ slug: mainPageSlug })];
                    case 3:
                        mainPageBannerImage = _b.sent();
                        if (mainPageBannerImage !== "false") {
                            return [2 /*return*/, mainPageBannerImage];
                        }
                        _b.label = 4;
                    case 4:
                        if (!frontPage) return [3 /*break*/, 6];
                        return [4 /*yield*/, api.getPostThumbnail({
                                slug: "etusivun-kolumnit",
                                post_type: "post"
                            })];
                    case 5:
                        frontPageBannerImage = _b.sent();
                        if (frontPageBannerImage !== "false") {
                            return [2 /*return*/, frontPageBannerImage];
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/, undefined];
                }
            });
        }); };
        /**
         * Update scrolling position method
         */
        _this.handleScroll = function () {
            var currentScrollPos = window.pageYOffset;
            _this.setState({
                scrollPosition: currentScrollPos
            });
        };
        /**
         * Mobile menu toggle
         */
        _this.onMenuClick = function () {
            return (_this.state.showMenu ? _this.hideMobileMenu() : _this.showMobileMenu());
        };
        /**
         * Mobile menu visibility method
         */
        _this.showMobileMenu = function () {
            return (_this.setState({
                showMenu: true
            }));
        };
        /**
         * Mobile menu visibility method
         */
        _this.hideMobileMenu = function () {
            return (_this.setState({
                showMenu: false
            }));
        };
        _this.state = {
            loading: false,
            scrollPosition: 0,
            postThumbnail: headerImage,
            showMenu: false,
            options: [],
            search: { title: "", type: "", url: "" },
            redirectToSearch: false
        };
        return _this;
    }
    /**
     * Component will unmount life-cycle handler
     */
    BasicLayout.prototype.componentWillUnmount = function () {
        window.removeEventListener("scroll", this.handleScroll);
    };
    /**
     * Render header layout
     */
    BasicLayout.prototype.render = function () {
        var classes = this.props.classes;
        var _a = this.state, postThumbnail = _a.postThumbnail, showMenu = _a.showMenu;
        if (this.state.redirectToSearch) {
            this.setState({ redirectToSearch: false });
            location.href = "/haku?search=".concat(this.state.search.title);
        }
        return (React.createElement("div", { className: classes.root },
            React.createElement("div", { className: classes.noPrint, role: "navigation", "aria-label": "top nav" },
                React.createElement("div", { className: classes.horizontalColorBar, "aria-label": "top bar", style: { backgroundImage: "url( ".concat(bar, " )") } }),
                React.createElement(Container, { maxWidth: "lg" },
                    React.createElement("div", { className: classes.logoSection },
                        React.createElement(Hidden, { mdUp: true, implementation: "js" },
                            React.createElement(IconButton, { size: "medium", onClick: this.onMenuClick },
                                React.createElement(MenuIcon, { color: "primary" }))),
                        React.createElement("a", { href: "/" },
                            React.createElement("img", { className: classes.logo, src: mikkeliLogo, alt: "mikkeli logo" })),
                        React.createElement(Hidden, { smDown: true, implementation: "js" }, this.renderSearchbar())),
                    React.createElement(Hidden, { smDown: true, implementation: "js" },
                        React.createElement("div", { className: classes.topNavDesktop }, this.renderMenu()))),
                React.createElement("div", { className: classes.topNavMobile },
                    React.createElement(Collapse, { in: showMenu }, this.renderMenu()),
                    this.renderSearchbar())),
            React.createElement("div", { role: "banner", className: "".concat(classes.logoBar, " ").concat(classes.headerImage, " ").concat(classes.noPrint), style: { backgroundImage: "url(".concat(this.state.loading ? "" : postThumbnail, ")") } }),
            this.props.children,
            React.createElement(Footer, { lang: this.props.lang })));
    };
    return BasicLayout;
}(React.Component));
export default withStyles(styles)(BasicLayout);
//# sourceMappingURL=BasicLayout.js.map
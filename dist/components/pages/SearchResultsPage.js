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
import { Button, ButtonGroup, Container, Link, TextField } from "@material-ui/core";
import React from "react";
import strings from "../../localization/strings";
import BasicLayout from "../BasicLayout";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CircularProgress from '@material-ui/core/CircularProgress';
;
/**
 * SearchResultsPage component
 */
var SearchResultsPage = /** @class */ (function (_super) {
    __extends(SearchResultsPage, _super);
    /**
     * Constructor
     *
     * @param props component properties
     */
    function SearchResultsPage(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Component did mount life-cycle handler
         */
        _this.componentDidMount = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ query: this.props.query });
                        return [4 /*yield*/, this.searchItems(this.props.query, 1, "page")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Changes the search result type
         *
         * @param selectedResultType selected result type
         */
        _this.changeResultType = function (selectedResultType) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ selectedResultType: selectedResultType, currentPage: 1 });
                        return [4 /*yield*/, this.searchItems(this.state.query, 1, selectedResultType)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Renders the loader
         */
        _this.renderLoader = function () { return (React.createElement(Container, { style: { height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } },
            React.createElement(CircularProgress, null))); };
        /**
         * Renders page navigation
         */
        _this.renderPageNavigation = function () {
            var previousPageElement = _this.renderPreviousPageLink();
            var nextPageElement = _this.renderNextPageLink();
            return (React.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "center", fontSize: "1.6rem", marginTop: "20px", marginBottom: "20px" } },
                previousPageElement,
                " ",
                React.createElement("span", { style: { marginLeft: "10px", marginRight: "10px" } }, "".concat(strings.page, " ").concat(_this.state.currentPage)),
                " ",
                nextPageElement));
        };
        /**
         * Renders the link for the previous page
         */
        _this.renderPreviousPageLink = function () {
            if (_this.state.currentPage > 1) {
                return React.createElement(Link, { onClick: _this.goToPreviousPage, style: { display: "flex", cursor: "pointer" } },
                    React.createElement(ArrowLeft, null),
                    strings.previousPage);
            }
            else {
                return React.createElement("span", { style: { display: "flex" } },
                    React.createElement(ArrowLeft, null),
                    strings.previousPage);
            }
        };
        /**
         * Renders the link for the next page
         */
        _this.renderNextPageLink = function () {
            if (_this.state.currentPage < _this.state.numberOfPages) {
                return React.createElement(Link, { onClick: _this.goToNextPage, style: { display: "flex", cursor: "pointer" }, color: "primary" },
                    strings.nextPage,
                    React.createElement(ArrowRight, null));
            }
            else {
                return React.createElement("span", { style: { display: "flex" } },
                    strings.nextPage,
                    React.createElement(ArrowRight, null));
            }
        };
        /**
         * Navigates to the previous page
         */
        _this.goToPreviousPage = function () { return __awaiter(_this, void 0, void 0, function () {
            var newNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.currentPage > 1)) return [3 /*break*/, 2];
                        newNumber = this.state.currentPage - 1;
                        this.setState({ currentPage: newNumber });
                        return [4 /*yield*/, this.searchItems(this.state.query, newNumber, this.state.selectedResultType)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Navigate to the next page
         */
        _this.goToNextPage = function () { return __awaiter(_this, void 0, void 0, function () {
            var newNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.currentPage < this.state.numberOfPages)) return [3 /*break*/, 2];
                        newNumber = this.state.currentPage + 1;
                        this.setState({ currentPage: newNumber });
                        return [4 /*yield*/, this.searchItems(this.state.query, newNumber, this.state.selectedResultType)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Renders a single search result
         *
         * @param result a result to render
         */
        _this.renderResult = function (result) {
            return (React.createElement("div", { style: {
                    borderBottom: "1px solid #aaa",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                    display: "flex",
                    flexDirection: "row"
                } },
                result.placeholderImage ? React.createElement("img", { alt: strings.searchResultImage, style: { alignSelf: "center" }, src: result.imageUrl, width: 120, height: 60 }) : React.createElement("img", { src: result.imageUrl, width: 120, height: 120 }),
                React.createElement("div", { style: { flexDirection: "column", display: "flex", marginLeft: "15px" } },
                    React.createElement("p", null,
                        result.date,
                        " - ",
                        React.createElement("a", { href: result.url },
                            " ",
                            result.title,
                            " ")),
                    React.createElement("p", null, result.summary))));
        };
        /**
         * Runs when the search button is pressed
         */
        _this.onSearch = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.props.history.push("/haku?search=".concat(this.state.query));
                        this.setState({ selectedResultType: "page", currentPage: 1 });
                        return [4 /*yield*/, this.searchItems(this.state.query, 1, "page")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Builds request params
         *
         * @param query query
         * @param elasticKey Elasticsearch key
         * @param pageToLoad the page to load
         * @param selectedResultType the selected result type
         * @param mikkeliDomain Mikkeli main domain
         * @param oppiminenDomain Oppiminen domain
         */
        _this.buildRequestParams = function (query, elasticKey, pageToLoad, selectedResultType, mikkeliDomain, oppiminenDomain) { return ({
            method: "POST",
            body: JSON.stringify({
                page: {
                    size: 5,
                    current: pageToLoad
                },
                query: query,
                filters: {
                    "all": [
                        { "all": [
                                { "base_url": (selectedResultType === "page" ? oppiminenDomain : mikkeliDomain) },
                                { "type": selectedResultType === "mikkeli" ? "page" : selectedResultType }
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
         * Translates a search result
         *
         * @param result result to translate
         * @param placeholderImageUrl placeholder image url
         */
        _this.translateSearchResult = function (result, placeholderImageUrl) { return ({
            title: result.title.raw,
            url: result.url.raw,
            imageUrl: "".concat(result.featured_media_url_thumbnail.raw || placeholderImageUrl),
            summary: result.excerpt.raw,
            date: _this.formatDate(result.date.raw),
            placeholderImage: !result.featured_media_url_thumbnail.raw
        }); };
        /**
         * Searches items from the Elastic search
         *
         * @param query query
         * @param pageToLoad the page to load
         * @param resultType the result type
         */
        _this.searchItems = function (query, pageToLoad, resultType) { return __awaiter(_this, void 0, void 0, function () {
            var currentScript, url, key, oppiminenDomain, mikkeliDomain, placeholderImageUrl, result, body, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentScript = document.scripts["bundle_script"];
                        if (!currentScript || query == "") {
                            return [2 /*return*/];
                        }
                        url = currentScript.getAttribute('data-elastic-url');
                        key = currentScript.getAttribute('data-elastic-key');
                        oppiminenDomain = currentScript.getAttribute('data-oppiminen-domain');
                        mikkeliDomain = currentScript.getAttribute('data-mikkeli-domain');
                        placeholderImageUrl = currentScript.getAttribute('data-result-placeholder-image');
                        if (!url || !key || !oppiminenDomain || !mikkeliDomain || !placeholderImageUrl) {
                            return [2 /*return*/];
                        }
                        this.setState({ loading: true });
                        return [4 /*yield*/, fetch(url + "/search.json", this.buildRequestParams(query, key, pageToLoad, resultType, mikkeliDomain, oppiminenDomain))];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        body = _a.sent();
                        results = body.results.map(function (result) { return _this.translateSearchResult(result, placeholderImageUrl); });
                        this.setState({ results: results, numberOfPages: body.meta.page.total_pages, loading: false });
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Formats a date
         *
         * @param datetime datetime to format
         */
        _this.formatDate = function (datetime) {
            var date = datetime.split("T")[0];
            var dateParts = date.split("-");
            return "".concat(dateParts[2], ".").concat(dateParts[1], ".").concat(dateParts[0]);
        };
        _this.state = {
            results: [],
            query: "",
            searchAgain: false,
            currentPage: 1,
            numberOfPages: 1,
            loading: false,
            selectedResultType: "page"
        };
        return _this;
    }
    /**
     * Component render method
     */
    SearchResultsPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(BasicLayout, { lang: this.props.lang },
            React.createElement(Container, { fixed: true },
                React.createElement("h1", null, strings.searchPageTitle),
                React.createElement(TextField, { size: "small", style: { width: "100%", marginBottom: "10px" }, onChange: function (event) { return _this.setState({ query: event.target.value }); }, value: this.state.query, variant: "outlined", "aria-labelledby": strings.search }),
                React.createElement(Button, { onClick: this.onSearch, size: "large", color: "primary", variant: "contained" }, strings.search),
                React.createElement("div", { style: { marginTop: "40px" } },
                    React.createElement(ButtonGroup, { variant: "text", style: { marginBottom: "20px" } },
                        React.createElement(Button, { onClick: function () { return _this.changeResultType("page"); } }, strings.pages),
                        React.createElement(Button, { onClick: function () { return _this.changeResultType("post"); } }, strings.news),
                        React.createElement(Button, { onClick: function () { return _this.changeResultType("attachment"); } }, strings.files),
                        React.createElement(Button, { onClick: function () { return _this.changeResultType("mikkeli"); } }, strings.mikkeli)),
                    this.state.loading ? this.renderLoader() : this.state.results.map(this.renderResult),
                    this.renderPageNavigation()))));
    };
    return SearchResultsPage;
}(React.Component));
export default SearchResultsPage;
//# sourceMappingURL=SearchResultsPage.js.map
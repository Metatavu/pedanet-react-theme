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
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PostPage from "./pages/PostPage";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import pedanetTheme from "../styles/theme";
import * as qs from "query-string";
import strings from "../localization/strings";
import SearchResultsPage from "./pages/SearchResultsPage";
/**
 * Material UI's automated responsive font sizes
 */
var theme = responsiveFontSizes(pedanetTheme);
/**
 * App component
 */
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Takes in a path and returns the last location
         *
         * @param path path as string
         */
        _this.pathToSlug = function (path) {
            if (path) {
                var lastPart = path.match(/\/[^/]+\/?$/g);
                if (lastPart) {
                    var slashesStripped = lastPart[0].replace(/\//g, "");
                    return slashesStripped;
                }
            }
            return "";
        };
        /**
         * Takes in path and returns the first location
         */
        _this.pathToTitle = function (path) {
            if (path) {
                var firstPart = path.match(/^\/[^/]+\//g);
                if (firstPart) {
                    var slashesStripped = firstPart[0].replace(/\//g, "");
                    return slashesStripped;
                }
            }
            return "";
        };
        return _this;
    }
    /**
     * Component render method
     */
    App.prototype.render = function () {
        var _this = this;
        var queryParams = qs.parse(location.search);
        var language = (queryParams.lang || "fi");
        strings.setLanguage(language);
        return (React.createElement(ThemeProvider, { theme: theme },
            React.createElement(CssBaseline, null),
            React.createElement(BrowserRouter, null,
                React.createElement("div", { className: "App" },
                    React.createElement(Switch, null,
                        React.createElement(Route, { path: "/", exact: true, render: function (props) { return (React.createElement(WelcomePage, { lang: language })); } }),
                        React.createElement(Route, { path: "/haku", exact: true, render: function (props) { return (React.createElement(SearchResultsPage, { history: props.history, lang: language, query: queryParams.search || "" })); } }),
                        React.createElement(Route, { path: "/:slug", render: function (props) { return (React.createElement(PostPage, { lang: language, slug: _this.pathToSlug(props.location.pathname), mainPageSlug: _this.pathToTitle(props.location.pathname) })); } }))))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map
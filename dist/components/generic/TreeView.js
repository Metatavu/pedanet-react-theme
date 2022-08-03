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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import styles from "../../styles/tree-view";
import ApiUtils from "../../../src/utils/ApiUtils";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeMenu from "react-simple-tree-menu";
import { withStyles, ListItem, List, CircularProgress } from "@material-ui/core";
/**
 * A component for displaying tree view link structure
 */
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    /**
     * Component constructor
     *
     * @param props
     */
    function TreeView(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Loads the link tree structure
         */
        _this.loadTree = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, lang, slug, api, _b, pageArray, treeMenu, page;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, lang = _a.lang, slug = _a.slug;
                        api = ApiUtils.getApi();
                        return [4 /*yield*/, Promise.all([
                                api.getWpV2Pages({ lang: [lang], slug: [slug] }),
                                api.getTreeMenu({ slug: slug })
                            ])];
                    case 1:
                        _b = _c.sent(), pageArray = _b[0], treeMenu = _b[1];
                        page = pageArray.length > 0 ? pageArray[0] : undefined;
                        this.setState({
                            page: page,
                            onAcademyPage: page && page.taxonomy_academy && page.taxonomy_academy.length > 0 ? true : false,
                            treeData: treeMenu.tree_data || [],
                            initialOpenNodes: treeMenu.initial_open_nodes || []
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Renders tree menu item
         *
         * @param item tree menu item
         */
        _this.renderTreeMenuItem = function (item) {
            var classes = _this.props.classes;
            var toggleIcon = function (on) { return on ?
                React.createElement(ExpandLessIcon, { htmlColor: focused ? "#000" : "#888" }) :
                React.createElement(ExpandMoreIcon, { htmlColor: focused ? "#000" : "#888" }); };
            var level = item.level, focused = item.focused, hasNodes = item.hasNodes, toggleNode = item.toggleNode, isOpen = item.isOpen, label = item.label, link = item.link, key = item.key, current = item.current, active = item.active, openNodes = item.openNodes, searchTerm = item.searchTerm, otherProps = __rest(item, ["level", "focused", "hasNodes", "toggleNode", "isOpen", "label", "link", "key", "current", "active", "openNodes", "searchTerm"]);
            return (React.createElement(ListItem, __assign({ key: key, selected: current, className: classes.listItem, style: { paddingLeft: level * 20 } }, otherProps),
                React.createElement("a", { href: link }, label),
                React.createElement("div", { className: classes.iconWrapper, onClick: _this.onNodeClick(key, hasNodes, toggleNode) }, hasNodes && toggleIcon(isOpen))));
        };
        /**
         * Handler for on node click event
         * @param hasNodes has nodes
         * @param toggleNode handler method for toggle node
         */
        _this.onNodeClick = function (key, hasNodes, toggleNode) { return function (event) {
            if (hasNodes && toggleNode) {
                toggleNode();
            }
            event.stopPropagation();
        }; };
        _this.state = {
            treeData: [],
            onAcademyPage: false,
            loadingChildren: false
        };
        return _this;
    }
    /**
     * Component did mount life-cycle handler
     */
    TreeView.prototype.componentDidMount = function () {
        this.loadTree();
    };
    /**
     * Component render
     */
    TreeView.prototype.render = function () {
        var _this = this;
        var classes = this.props.classes;
        var _a = this.state, treeData = _a.treeData, initialOpenNodes = _a.initialOpenNodes;
        return (React.createElement("div", { className: classes.treeWrapper, role: "navigation", "aria-label": "side nav" },
            initialOpenNodes !== undefined &&
                React.createElement(TreeMenu, { data: treeData, initialOpenNodes: initialOpenNodes, hasSearch: false }, function (_a) {
                    var items = _a.items;
                    return (React.createElement(List, null, items.map(function (item) { return _this.renderTreeMenuItem(item); })));
                }),
            initialOpenNodes === undefined &&
                React.createElement(CircularProgress, null)));
    };
    return TreeView;
}(React.Component));
export default withStyles(styles)(TreeView);
//# sourceMappingURL=TreeView.js.map
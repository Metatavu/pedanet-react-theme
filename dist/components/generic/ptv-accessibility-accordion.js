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
import * as React from "react";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, withStyles } from "@material-ui/core";
import styles from "../../styles/ptv-accessibility-accordion";
import strings from "../../localization/strings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
/**
 * A component for Ptv accessibility accordion
 */
var PtvAccessibilityAccordion = /** @class */ (function (_super) {
    __extends(PtvAccessibilityAccordion, _super);
    /**
     * Component constructor
     *
     * @param props
     */
    function PtvAccessibilityAccordion(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Renders single localized PTV accessibility sentence
         *
         * @param sentence sentence
         */
        _this.renderPtvLocalizedAccessibilitySentence = function (sentence, index) {
            var classes = _this.props.classes;
            return (React.createElement(Typography, { paragraph: true, key: index, className: classes.sentence }, sentence));
        };
        /**
         * Returns localized string with current language
         *
         * @param localizedValues localized values
         * @return localized string with current language or null if not found
         */
        _this.getPtvLocalizedString = function (localizedValues) {
            var result = _this.getPtvLocalizedValue(localizedValues, strings.getLanguage());
            return result ? result.value : "";
        };
        /**
         * Returns localized value with given language
         *
         * @param localizedValues localized values
         * @param language language
         * @return localized value with given language or null if not found
         */
        _this.getPtvLocalizedValue = function (localizedValues, language) {
            return (localizedValues || []).find(function (item) { return item.language === language; });
        };
        /**
         * Event handler for toggle accordion
         */
        _this.toggleOpen = function (expanded) {
            _this.setState({ expanded: expanded });
        };
        _this.state = {
            expanded: false
        };
        return _this;
    }
    /**
     * Component render
     */
    PtvAccessibilityAccordion.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, accessibilitySentence = _a.accessibilitySentence;
        var expanded = this.state.expanded;
        var groupName = this.getPtvLocalizedString(accessibilitySentence.sentenceGroup);
        var sentences = (accessibilitySentence.sentences || []).map(function (sentence) {
            return _this.getPtvLocalizedString(sentence.sentence);
        });
        var toggleIcon = expanded ?
            React.createElement(ExpandLessIcon, { className: classes.expandIcon }) :
            React.createElement(ExpandMoreIcon, { className: classes.expandIcon });
        return (React.createElement(ExpansionPanel, { square: true, elevation: 0, expanded: expanded, onChange: function (_e, expanded) { return _this.toggleOpen(expanded); } },
            React.createElement(ExpansionPanelSummary, null,
                toggleIcon,
                React.createElement("h3", { className: classes.accessibilityGroupLabel }, groupName)),
            React.createElement(ExpansionPanelDetails, { className: classes.accordionContent }, sentences.map(function (sentence, index) { return _this.renderPtvLocalizedAccessibilitySentence(sentence, index); }))));
    };
    return PtvAccessibilityAccordion;
}(React.Component));
export default withStyles(styles)(PtvAccessibilityAccordion);
//# sourceMappingURL=ptv-accessibility-accordion.js.map
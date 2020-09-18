import * as React from "react";

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/ptv-accessibility-accordion";
import strings from "../../localization/strings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  accessibilitySentence: PtvAccessibilitySentence;
}

/**
 * Component state
 */
interface State {
  expanded: boolean;
}

/**
 * A component for Ptv accessibility accordion
 */
class PtvAccessibilityAccordion extends React.Component<Props, State> {

  /**
   * Component constructor
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  /**
   * Component render
   */
  public render() {
    const { classes, accessibilitySentence } = this.props;
    const { expanded } = this.state;
    const groupName = this.getPtvLocalizedString(accessibilitySentence.sentenceGroup);
            
    const sentences = (accessibilitySentence.sentences || []).map(sentence => {
      return this.getPtvLocalizedString(sentence.sentence);
    });

    const toggleIcon = expanded ?
    <ExpandLessIcon className={ classes.expandIcon } /> :
    <ExpandMoreIcon className={ classes.expandIcon } />;

    return (
      <ExpansionPanel
        square
        elevation={ 0 }
        expanded={ expanded }
        onChange={ (_e, expanded) => this.toggleOpen(expanded) }
      >
        <ExpansionPanelSummary>
          { toggleIcon }
          <Typography variant="h3" className={ classes.accessibilityGroupLabel }>
            { groupName }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={ classes.accordionContent }>
          {
            sentences.map(sentence => this.renderPtvLocalizedAccessibilitySentence(sentence))
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  /**
   * Renders single localized PTV accessibility sentence
   * 
   * @param sentence sentence
   */
  private renderPtvLocalizedAccessibilitySentence = (sentence: string) => {
    return (
      <Typography paragraph>
        { sentence }
      </Typography>
    );
  }

  /**
   * Returns localized string with current language
   * 
   * @param localizedValues localized values
   * @return localized string with current language or null if not found
   */
  private getPtvLocalizedString = (localizedValues: PtvLocalizedValue[] | undefined): string => {
    const result = this.getPtvLocalizedValue(localizedValues, strings.getLanguage() as PtvLanguage);
    return result ? result.value : "";
  }

  /**
   * Returns localized value with given language
   * 
   * @param localizedValues localized values
   * @param language language
   * @return localized value with given language or null if not found
   */
  private getPtvLocalizedValue = (localizedValues: PtvLocalizedValue[] | undefined, language: PtvLanguage) => {
    return (localizedValues || []).find(item => item.language === language);
  }

  /**
   * Event handler for toggle accordion
   */
  private toggleOpen = (expanded: boolean) => {
    this.setState({ expanded });
  }
}

export default withStyles(styles)(PtvAccessibilityAccordion);
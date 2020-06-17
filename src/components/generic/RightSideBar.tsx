import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '../../styles/right-side-bar';
import { RelatedLink } from '../pages/PostPage';

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  links: RelatedLink[];
}

/**
 * Component state
 */
interface State {
}

/**
 * A component for post page right side bar content
 */
class RightSideBar extends React.Component<Props, State> {

  /**
   * Component constructor
   * 
   * @param props 
   */
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount() {
  }

  /**
   * Component render
   */
  public render() {
    const { links } = this.props;
    return (
      <>
        <p>Aiheeseen liittyviä linkkejä</p>
        {
          links.map(linkObject => {
            if (!linkObject.link.match(/^https:\/\/|^http:\/\//g)) {
              linkObject.link = `https://${linkObject.link}`;
            }
            return (
              <div>
                <a target="_blank" href={ linkObject.link }>{ linkObject.name }</a>
              </div>
            )
          })
        }
      </>
    )
  }
}

export default withStyles(styles)(RightSideBar);
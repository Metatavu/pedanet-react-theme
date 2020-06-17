import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '../../styles/right-side-bar';

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
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
    return (
      <>
        <p>Aiheeseen liittyviä linkkejä</p>
      </>
    )
  }
}

export default withStyles(styles)(RightSideBar);
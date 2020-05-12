import * as React from 'react';
import TreeMenu, { TreeNodeInArray, TreeMenuItem } from 'react-simple-tree-menu';
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';
import ChevronRightIcon from '@material-ui/icons/ArrowRight';
import { withStyles, WithStyles, ListItem, List } from '@material-ui/core';
import styles from '../../styles/tree-view';

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
}

/**
 * Component state
 */
interface State {
  treeData?: TreeNodeInArray[]
}

/**
 * A component for displaying tree view link structure
 */
class TreeView extends React.Component<Props, State> {

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
    this.setState({
      treeData: [
        {
          key: "1",
          label: "Yhteiset käytännöt"
        },
        {
          key: "2",
          label: "Peruskoulut"
        },
        {
          key: "3",
          label: "Nettiperuskoulu aikuisille"
        },
        {
          key: "4",
          label: "Monikulttuurinen opetus"
        },
        {
          key: "5",
          label: "Painotettu opetus"
        }
      ]
    });
  }

  /**
   * Component render
   */
  public render() {
    const { treeData } = this.state;
    return (
      <TreeMenu data={ treeData } hasSearch={ false }>
        {({ search, items }) => (
          <>
            <List>
              { items.map((item: any) => { return this.renderTreeMenuItem(item) }) }
            </List>
          </>
        )}
      </TreeMenu>
    )
  }

  /**
   * Renders tree menu item
   *
   * @param item tree menu item
   */
  private renderTreeMenuItem = (item: TreeMenuItem) => {
    const toggleIcon = (on: boolean) => on ? 
      <ExpandMoreIcon htmlColor={ focused ? "#fff" : "#888" } /> :
      <ChevronRightIcon htmlColor={ focused ? "#fff" : "#888" }  />;
    const { level, focused, hasNodes, toggleNode, isOpen, label } = item;

    return (
      <ListItem { ...item }
        style={{ paddingLeft: level * 20 }}
      >
        <div style={{ display: 'inline-block' }} onClick={ this.onNodeClick(hasNodes, toggleNode) }>
          { toggleIcon(isOpen) }
        </div>
        { label }
      </ListItem>
    );
  }

  /**
   * Handler for on node click event
   * @param hasNodes has nodes
   * @param toggleNode handler method for toggle node
   */
  private onNodeClick = (hasNodes: boolean, toggleNode: (() => void) | undefined) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hasNodes && toggleNode) {
      toggleNode();
    }
    event.stopPropagation();
  }
}

export default withStyles(styles)(TreeView);
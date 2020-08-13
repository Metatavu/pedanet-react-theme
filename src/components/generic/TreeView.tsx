import * as React from "react";
import styles from "../../styles/tree-view";
import ApiUtils from "../../../src/utils/ApiUtils";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeMenu, { TreeNodeInArray, TreeMenuItem } from "react-simple-tree-menu";
import { Page, GetWpV2PagesOrderbyEnum } from "../../generated/client/src";
import { withStyles, WithStyles, ListItem, List, CircularProgress } from "@material-ui/core";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  lang: string;
  slug: string;
}

/**
 * Component state
 */
interface State {
  treeData: any[];
  initialOpenNodes?: string[];
  page?: Page;
  onAcademyPage: boolean;
  loadingChildren: boolean;
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
    this.state = {
      treeData: [],
      onAcademyPage: false,
      loadingChildren: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount() {
    this.loadTree();
  }

  /**
   * Component render
   */
  public render() {
    const { classes } = this.props;
    const { treeData, initialOpenNodes } = this.state;
    return (
      <div className={ classes.treeWrapper }>
        { initialOpenNodes !== undefined &&
          <TreeMenu data={ treeData } initialOpenNodes={ initialOpenNodes } hasSearch={ false }>
            {({ search, items }) => (
              <List>
                { items.map((item: any) => this.renderTreeMenuItem(item)) }
              </List>
            )}
          </TreeMenu>
        }
        { initialOpenNodes === undefined &&
          <CircularProgress />
        }
      </div>
    );
  }

  /**
   * Loads the link tree structure
   */
  private loadTree = async () => {
    const { lang, slug } = this.props;
    const api = ApiUtils.getApi();
    const [pageArray, treeMenu] = await Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getTreeMenu({ slug: slug })
    ]);
    const page = pageArray.length > 0 ? pageArray[0] : undefined;
    this.setState({
      page: page,
      onAcademyPage: page && page.taxonomy_academy && page.taxonomy_academy.length > 0 ? true : false,
      treeData: treeMenu.tree_data || [],
      initialOpenNodes: treeMenu.initial_open_nodes || []
    });
  }

  /**
   * Renders tree menu item
   *
   * @param item tree menu item
   */
  private renderTreeMenuItem = (item: TreeMenuItem) => {
    const { classes } = this.props;
    const toggleIcon = (on: boolean) => on ?
      <ExpandLessIcon htmlColor={ focused ? "#000" : "#888" } /> :
      <ExpandMoreIcon htmlColor={ focused ? "#000" : "#888" }  />;
    const { level, focused, hasNodes, toggleNode, isOpen, label, link, key, current } = item;
    return (
      <ListItem selected={ current } { ...item } className={ classes.listItem } style={{ paddingLeft: level * 20 }}>
        <a href={ link }>{ label }</a>
        <div className={ classes.iconWrapper } onClick={ this.onNodeClick(key, hasNodes, toggleNode) }>
          { hasNodes && toggleIcon(isOpen) }
        </div>
      </ListItem>
    );
  }

  /**
   * Handler for on node click event
   * @param hasNodes has nodes
   * @param toggleNode handler method for toggle node
   */
  private onNodeClick = (key: string, hasNodes: boolean, toggleNode: (() => void) | undefined) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hasNodes && toggleNode) {
      toggleNode();
    }
    event.stopPropagation();
  }
}

export default withStyles(styles)(TreeView);

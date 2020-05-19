import * as React from 'react';
import TreeMenu, { TreeNodeInArray, TreeMenuItem } from 'react-simple-tree-menu';
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';
import ChevronRightIcon from '@material-ui/icons/ArrowRight';
import { withStyles, WithStyles, ListItem, List, Typography } from '@material-ui/core';
import styles from '../../styles/tree-view';
import ApiUtils from "../../../src/utils/ApiUtils";
import { MenuItemData } from 'src/generated/client/src';

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
  treeData: LinkTreeStructure[];
  title?: string;
  initialOpenNodes?: string[];
}

interface LinkTreeStructure extends TreeNodeInArray {
  link: string;
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
      treeData: []
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
    const { treeData, title, initialOpenNodes } = this.state;
    return (
      <>
        <Typography variant="h5">{ title }</Typography>
        { initialOpenNodes &&
          <TreeMenu data={ treeData } initialOpenNodes={ initialOpenNodes } hasSearch={ false }>
            {({ search, items }) => (
              <List>
                { items.map((item: any) => { return this.renderTreeMenuItem(item) }) }
              </List>
            )}
          </TreeMenu>
        }
      </>
    )
  }

  /**
   * Loads the link tree structure
   */
  private loadTree = async () => {
    const { lang, slug } = this.props;
    const api = ApiUtils.getApi();
    const [page, post, menus] = await Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" })
    ]);
    const currentPageOrPostId = (page) ? page[0].id : ((post) ? post[0].id : undefined);
    if (currentPageOrPostId && menus.items) {
      menus.items.forEach((item) => {
        this.formLinkTreeStructure(String(currentPageOrPostId), item.child_items || [], item, []);
      });
    }
  }

  /**
   * Finds current parent link and forms link tree structure from it
   * 
   * @param parentLinkId parent link id
   * @param menuStructure menu structure
   * @param original original menu structure
   * @param opened keeps track of the opened nodes
   */
  private formLinkTreeStructure = (parentLinkId: string, menuStructure: MenuItemData[], original: MenuItemData, opened: string[]) => {
    menuStructure.forEach((menu) => {
      if (menu.object_id === parentLinkId || original.object_id === parentLinkId) {
        this.setState({
          title: original.title,
          treeData: this.linkTreeFromMenuStructure(original.child_items || []),
          initialOpenNodes: opened
        });
      } else if (menu.child_items) {
        this.formLinkTreeStructure(parentLinkId, menu.child_items, original, [...opened, `${ opened.length > 0 ? opened[opened.length - 1] + "/" : ""}${ menu.object_id }`]);
      }
    });
  }

  /**
   * Converts menu item data array to link tree structure
   * 
   * @param menuStructure menu structure
   * 
   * @returns link tree structure
   */
  private linkTreeFromMenuStructure = (menuStructure: MenuItemData[]): LinkTreeStructure[] => {
    return menuStructure.map((menu) => {
      return {
        key: menu.object_id || "",
        label: menu.title || "",
        link: menu.url || "",
        nodes: menu.child_items ? this.linkTreeFromMenuStructure(menu.child_items) : undefined
      }
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
      <ExpandMoreIcon htmlColor={ focused ? "#fff" : "#888" } /> : 
      <ChevronRightIcon htmlColor={ focused ? "#fff" : "#888" }  />;
    const { level, focused, hasNodes, toggleNode, isOpen, label, link } = item;
    return (
      <ListItem { ...item } style={{ paddingLeft: level * 20 }}>
        <a className={ classes.treeDataLink } href={ link }>{ label }</a>
        <div style={{ display: 'inline-block' }} onClick={ this.onNodeClick(hasNodes, toggleNode) }>
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
  private onNodeClick = (hasNodes: boolean, toggleNode: (() => void) | undefined) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hasNodes && toggleNode) {
      toggleNode();
    }
    event.stopPropagation();
  }
}

export default withStyles(styles)(TreeView);
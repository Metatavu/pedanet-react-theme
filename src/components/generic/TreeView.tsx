import * as React from 'react';
import styles from '../../styles/tree-view';
import ApiUtils from '../../../src/utils/ApiUtils';
import ChevronRightIcon from '@material-ui/icons/ArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';
import TreeMenu, { TreeNodeInArray, TreeMenuItem } from 'react-simple-tree-menu';
import { MenuItemData, Page, CustomTaxonomy, Post } from 'src/generated/client/src';
import { withStyles, WithStyles, ListItem, List, Typography } from '@material-ui/core';

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
  pages?: Page[],
  page?: Page,
  post?: Post,
  school?: CustomTaxonomy,
  currentPageOrPostId?: string
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
    const [pages, page, post, menus, schools] = await Promise.all([
      api.getWpV2Pages({}),
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
      api.getWpV2CustomTaxonomy({ name: "schools" })
    ]);
    this.setState({
      pages: pages,
      page: page.length > 0 ? page[0] : undefined,
      post: post.length > 0 ? post[0] : undefined,
      school: schools.find(item => `${ item.id }` === (page.length > 0 && page[0].schools && page[0].schools.length > 0 ? page[0].schools.join("") : "")),
      currentPageOrPostId: String((page) ? page[0].id : ((post) ? post[0].id : undefined))
    });
    if (menus.items) {
      menus.items.forEach((item) => {
        this.formLinkTreeStructure(item.child_items || [], item, []);
      });
    }
  }

  /**
   * Finds current parent link and forms link tree structure from it
   * 
   * @param menuStructure menu structure
   * @param original original menu structure
   * @param opened keeps track of the opened nodes
   */
  private formLinkTreeStructure = (menuStructure: MenuItemData[], original: MenuItemData, opened: string[]) => {
    const { currentPageOrPostId, pages, school } = this.state;
    let isSchoolPage: boolean;
    menuStructure.forEach((menu) => {
      if (pages && school) {
        const page = pages.find((item) => `${ item.id }` === menu.object_id);
        if (page) {
          const parent = pages.find((item) => item.id === page.parent);
          if (parent && parent.schools && parent.schools.length === 0 && page.schools && page.schools.length > 0 && page.schools[0] === school.id) {
            isSchoolPage = true;
            if (menu.child_items) {
              this.formLinkTreeStructure(menu.child_items, menu, []);
            } else {
              this.setState({
                title: menu.title,
                treeData: [],
                initialOpenNodes: []
              });
            }
          }
        }
      }
      if (!isSchoolPage) {
        if (menu.object_id === currentPageOrPostId || original.object_id === currentPageOrPostId) {
          this.setState({
            title: original.title,
            treeData: this.linkTreeFromMenuStructure(original.child_items || []),
            initialOpenNodes: opened
          });
        } else if (menu.child_items) {
          this.formLinkTreeStructure(menu.child_items, original, [...opened, `${ opened.length > 0 ? opened[opened.length - 1] + "/" : ""}${ menu.object_id }`]);
        }
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
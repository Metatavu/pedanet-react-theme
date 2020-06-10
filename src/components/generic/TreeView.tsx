import * as React from "react";
import styles from "../../styles/tree-view";
import ApiUtils from "../../../src/utils/ApiUtils";
import ChevronRightIcon from "@material-ui/icons/ArrowRight";
import ExpandMoreIcon from "@material-ui/icons/ArrowDropDown";
import TreeMenu, { TreeNodeInArray, TreeMenuItem } from "react-simple-tree-menu";
import { Page, CustomTaxonomy, Post, MenuItemData } from "src/generated/client/src";
import { withStyles, WithStyles, ListItem, List, Typography } from "@material-ui/core";

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
  pages?: Page[];
  schoolBlogPages?: Page[],
  page?: Page;
  post?: Post;
  academy?: CustomTaxonomy;
  academyPage?: MenuItemData[];
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
                { items.map((item: any) => this.renderTreeMenuItem(item)) }
              </List>
            )}
          </TreeMenu>
        }
      </>
    );
  }

  /**
   * Loads the link tree structure
   */
  private loadTree = async () => {
    const { lang, slug } = this.props;
    const api = ApiUtils.getApi();
    const [pages, page, post, academies, blogCategory, menus] = await Promise.all([
      api.getWpV2Pages({ per_page: 100 }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2CustomTaxonomy({ name: "academy" }),
      api.getWpV2Categories({ slug: [ "blogi" ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
    ]);
    const academy = academies.find(item => `${ item.id }` === (page.length > 0 && page[0].taxonomy_academy && page[0].taxonomy_academy.length > 0 ? page[0].taxonomy_academy.join("") : ""));
    const [blogPages, schoolBlogPages] = await Promise.all([
      api.getWpV2Pages({ categories: [ blogCategory.length > 0 ? blogCategory[0].id || -1 : -1 ], per_page: 100 }),
      api.getWpV2Pages({ categories: [ blogCategory.length > 0 ? blogCategory[0].id || -1 : -1 ], taxonomy_academy: [ academy ? academy.id || -1 : -1 ], per_page: 100 })
    ]);
    this.setState({
      pages: pages.filter(item => !blogPages.find(blog => blog.id === item.id)),
      schoolBlogPages: schoolBlogPages,
      page: page.length > 0 ? page[0] : undefined,
      post: post.length > 0 ? post[0] : undefined,
      academy: academy
    });
    if (academy && menus.items) {
      this.findAcademyPage(menus.items);
      this.setState({
        treeData: this.buildTree(this.state.academyPage || [], [])
      });
    } else if (menus.items) {
      this.setState({
        treeData: this.buildTree(menus.items, [])
      });
    }
  }

  /**
   * Finds current academy page and returns it
   *
   * @param menus menu structure
   */
  private findAcademyPage = (menus: MenuItemData[]) => {
    const { academy, pages } = this.state;
    if (academy && pages) {
      menus.forEach(menu => {
        const current = pages.find(page => `${ page.id }` === menu.object_id);
        if (current) {
          const parent = pages.find(page => page.id === current.parent);
          if (((parent && parent.taxonomy_academy && parent.taxonomy_academy.length === 0) || (parent && !parent.taxonomy_academy)) && current.taxonomy_academy && current.taxonomy_academy.find(id => id === academy.id)) {
            this.setState({
              academyPage: [menu]
            });
          }
        }
        if (menu.child_items) {
          this.findAcademyPage(menu.child_items);
        }
      });
    }
  }

  /**
   * Creates array from menu structure
   *
   * @param menus menu structure
   */
  private menuStructureToArray = (menus: MenuItemData[]): MenuItemData[] => {
    const array: MenuItemData[] = [];
    menus.forEach(menu => {
      array.push(menu);
      if (menu.child_items) {
        const child_array = this.menuStructureToArray(menu.child_items);
        child_array.forEach(child => {
          array.push(child);
        });
      }
    });
    return array;
  }

  /**
   * Builds link tree structure
   *
   * @param menuItems menu item data array
   */
  private buildTree = (menuItems: MenuItemData[], opened: string[]): any => {
    const { schoolBlogPages, page } = this.state;
    const linkTreeStructure: LinkTreeStructure[] = [];
    menuItems.forEach(item => {
      if ((schoolBlogPages && !schoolBlogPages.find(blog => blog.id === item.object_id)) || !schoolBlogPages) {
        linkTreeStructure.push(
          {
            key: `${ item.object_id }`,
            label: item.title || "",
            link: item.url || "",
            nodes: this.showChildren(item) ? this.buildTree(item.child_items ? item.child_items : [], [...opened, `${ opened.length > 0 ? opened[opened.length - 1] + "/" : ""}${ item.object_id }`]) : undefined
          }
        );
      }
      if (page && `${ page.id }` === item.object_id) {
        this.setState({
          initialOpenNodes: opened
        });
      }
    });
    return linkTreeStructure;
  }

  /**
   * Checks if children exist and whether they should be displayed
   *
   * @param menu menu item data
   */
  private showChildren = (menu: MenuItemData) => {
    const { pages, academy } = this.state;
    if (pages && !academy) {
      const page = pages.find(item => `${ item.id }` === menu.object_id);
      if (page && page.taxonomy_academy && page.taxonomy_academy.length > 0) {
        const parent = pages.find(item => item.id === page.parent);
        if (parent && parent.taxonomy_academy && parent.taxonomy_academy.length === 0) {
          return false;
        }
        return true;
      }
      return true;
    }
    return true;
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
        <div style={{ display: "inline-block" }} onClick={ this.onNodeClick(hasNodes, toggleNode) }>
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

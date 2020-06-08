import * as React from "react";
import styles from "../../styles/tree-view";
import ApiUtils from "../../../src/utils/ApiUtils";
import ChevronRightIcon from "@material-ui/icons/ArrowRight";
import ExpandMoreIcon from "@material-ui/icons/ArrowDropDown";
import TreeMenu, { TreeNodeInArray, TreeMenuItem } from "react-simple-tree-menu";
import { MenuItemData, Page, CustomTaxonomy, Post } from "src/generated/client/src";
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
  page?: Page;
  post?: Post;
  school?: CustomTaxonomy;
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
    const [pages, page, post, schools] = await Promise.all([
      api.getWpV2Pages({ per_page: 100 }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2CustomTaxonomy({ name: "schools" })
    ]);
    this.setState({
      pages: pages,
      page: page.length > 0 ? page[0] : undefined,
      post: post.length > 0 ? post[0] : undefined,
      school: schools.find((item: any) => `${ item.id }` === (page.length > 0 && page[0].taxonomy_schools && page[0].taxonomy_schools.length > 0 ? page[0].taxonomy_schools.join("") : "")),
    });
    this.buildTree(pages);
  }

  /**
   * Builds link tree structure
   *
   * @param pages page array
   */
  private buildTree = (pages: Page[]) => {
    const { page, school } = this.state;
    const linkTreeStructure: LinkTreeStructure[] = [];
    let mainPages = pages.filter(item => item.parent === 0);
    if (school) {
      let mainPage = pages.find(item => item.taxonomy_schools && item.taxonomy_schools.find((x) => x === school.id ));
      if (mainPage) {
        let parent = pages.find(item => item.id === mainPage!.parent);
        while (parent && parent.taxonomy_schools && parent.taxonomy_schools.find(x => x === school.id)) {
          mainPage = parent;
          parent = pages.find(item => item.id === mainPage!.parent);
        }
        mainPages = [mainPage!];
      }
    }
    mainPages.forEach(mainPage => {
      const childPages = pages.filter(item => item.parent === mainPage.id);
      linkTreeStructure.push(
        {
          key: `${ mainPage.id }`,
          label: mainPage.title ? mainPage.title.rendered || "" : "",
          link: mainPage.link || "",
          nodes: this.showChildren(childPages, mainPage) ? this.mapTreeChildren(childPages, pages, [`${ mainPage.id }`]) : undefined
        }
      );
      if (page && page.id === mainPage.id) {
        this.setState({
          initialOpenNodes: [""]
        });
      }
    });
    this.setState({
      treeData: linkTreeStructure
    });
  }

  /**
   * Checks if children exist and whether they should be displayed
   *
   * @param children child page array
   */
  private showChildren = (children: Page[], page: Page) => {
    if (children && children.length > 0) {
      const { school, pages } = this.state;
      if (pages) {
        const parent = pages.find((item) => item.id === page.parent);
        if (!school && page.taxonomy_schools && page.taxonomy_schools.length > 0 && parent && parent.taxonomy_schools && parent.taxonomy_schools.length === 0) {
          return false;
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Maps tree children as link tree structure arrays and returns them
   *
   * @param children child page array
   * @param pages page array
   * @param opened gathers initially opened nodes
   */
  private mapTreeChildren = (children: Page[], pages: Page[], opened: string[]): LinkTreeStructure[] => {
    const { page } = this.state;
    return children.map((child) => {
      if (page && page.id === child.id) {
        this.setState({
          initialOpenNodes: opened
        });
      }
      const childPages = pages.filter((item) => item.parent === child.id);
      return {
        key: `${ child.id }`,
        label: child.title ? child.title.rendered || "" : "",
        link: child.link || "",
        nodes: this.showChildren(childPages, child) ? this.mapTreeChildren(childPages, pages, [...opened, `${ opened.length > 0 ? opened[opened.length - 1] + "/" : ""}${ child.id }`]) : undefined
      };
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

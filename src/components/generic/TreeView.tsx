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
  treeData: LinkTreeStructure[];
  initialOpenNodes?: string[];
  page?: Page;
  onAcademyPage: boolean;
  loadingChildren: boolean;
}

interface LinkTreeStructure extends TreeNodeInArray {
  link: string;
  academyPage: boolean;
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
    const [pageArray] = await Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] })
    ]);
    const page = pageArray.length > 0 ? pageArray[0] : undefined;
    this.setState({
      page: page,
      onAcademyPage: page && page.taxonomy_academy && page.taxonomy_academy.length > 0 ? true : false
    });
    this.buildTree();
  }

  /**
   * Builds tree to current page
   */
  private buildTree = async () => {
    const { page } = this.state;
    const api = ApiUtils.getApi();
    if (!page || page.parent === undefined) {
      return;
    }
    let current: Page = page;
    let treeData: LinkTreeStructure[] = [];
    let initialOpenNodes: string[] = [];
    while (current.parent !== undefined) {
      const parentId = current.parent;
      const parent = parentId ? await api.getWpV2PagesById({ id: `${ parentId }` }) : undefined;
      const layer = parentId ? await this.addTreeLayer(`${ parentId }`) : undefined;
      initialOpenNodes = [
        `${ current.id }`,
        ...initialOpenNodes.map(node => `${ current.id }/${ node }`)
      ];
      initialOpenNodes = page.id !== current.id ? [`${ current.id }`, ...initialOpenNodes] : [];
      if (
        current.taxonomy_academy &&
        current.taxonomy_academy.length > 0 &&
        parent &&
        parent.taxonomy_academy &&
        parent.taxonomy_academy.length === 0
      ) {
        treeData = [
          {
            key: `${ current.id }`,
            label: `${ current.title ? current.title.rendered : "" }`,
            link: `${ current.link }`,
            academyPage: current.taxonomy_academy && current.taxonomy_academy.length > 0 ? true : false,
            nodes: treeData
          }
        ];
        break;
      }
      if (layer) {
        treeData = layer.map(node => {
          if (node.key === `${ current.id }`) {
            return {
              ...node,
              nodes: treeData
            };
          }
          return node;
        });
      } else {
        treeData = [
          {
            key: `${ current.id }`,
            label: `${ current.title ? current.title.rendered : "" }`,
            link: `${ current.link }`,
            academyPage: false,
            nodes: treeData
          }
        ];

      }
      if (current.parent === 0 || !parent) {
        break;
      }
      current = parent;
    }
    this.setState({
      treeData: treeData,
      initialOpenNodes: initialOpenNodes
    });
    this.fetchTreeChildren();
  }

  /**
   * Fetches child nodes for entire tree
   */
  private fetchTreeChildren = async () => {
    const { treeData } = this.state;
    const updatedTreeData = await this.handleLayer(treeData);

    this.setState({
      treeData: updatedTreeData
    });
  }

  /**
   * 
   */
  private handleLayer = async (layer: LinkTreeStructure[]): Promise<LinkTreeStructure[]> => {
    return await Promise.all(
      layer.map(async node => {
        return {
          ...node,
          nodes: (node.nodes && node.nodes.length > 0) ?
            await this.handleLayer(node.nodes as LinkTreeStructure[]) :
            await this.fetchChildren(node.key, node.academyPage)
        };
      })
    );
  };

  /**
   *
   * @param parent
   */
  private fetchChildren = async (parentId: string, academyPage?: boolean): Promise<LinkTreeStructure[]> => {
    const api = ApiUtils.getApi();
    const { onAcademyPage } = this.state;
    const children = await api.getWpV2Pages({ parent: [`${ parentId }`], per_page: 100, orderby: GetWpV2PagesOrderbyEnum.MenuOrder });
    if (!children || (!onAcademyPage && academyPage)) {
      return [];
    }
    children.reverse();
    return await Promise.all(
      children.map(async node => {
        return {
          key: `${ node.id }`,
          label: `${ node.title ? node.title.rendered : "" }`,
          link: `${ node.link }`,
          academyPage: node.taxonomy_academy && node.taxonomy_academy.length > 0 ? true : false,
          nodes: []
        };
      })
    );
  }

  /**
   * Fetches node children and returns them
   *
   * @param parentId id of the parent page
   */
  private addTreeLayer = async (parentId: string) => {
    const api = ApiUtils.getApi();
    const pages = await api.getWpV2Pages({ parent: [`${ parentId }`], per_page: 100, orderby: GetWpV2PagesOrderbyEnum.MenuOrder });
    pages.reverse();
    return pages.map(page => {
      return {
        key: `${ page.id }`,
        label: `${ page.title ? page.title.rendered : "" }`,
        link: `${ page.link }`,
        academyPage: page.taxonomy_academy && page.taxonomy_academy.length > 0 ? true : false,
        nodes: []
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
      <ExpandLessIcon htmlColor={ focused ? "#000" : "#888" } /> :
      <ExpandMoreIcon htmlColor={ focused ? "#000" : "#888" }  />;
    const { level, focused, hasNodes, toggleNode, isOpen, label, link, key } = item;
    return (
      <ListItem { ...item } className={ classes.listItem } style={{ paddingLeft: level * 20 }}>
        <a className={ classes.treeDataLink } href={ link }>{ label }</a>
        <div className={ classes.iconWrapper } onClick={ this.onNodeClick(key, hasNodes, toggleNode) }>
          { hasNodes && toggleIcon(isOpen) }
        </div>
      </ListItem>
    );
  }

  /**
   * Gets tree layers
   *
   * @param key parent key
   */
  private getGrandchildren = async (key: string) => {
    const { treeData, onAcademyPage } = this.state;
    const splitKey = key.split("/");
    const id = splitKey[splitKey.length - 1];

    this.setState({
      loadingChildren: true
    });

    const mapTree = async (tree: LinkTreeStructure[]): Promise<LinkTreeStructure[]> => {
      const promises = tree.map(async node => {
        if (node.key === id) {
          return {
            ...node,
            nodes: await mapChildren(node.nodes as LinkTreeStructure[])
          };
        }

        return {
          ...node,
          nodes: node.nodes && node.nodes.length > 0 ? await mapTree(node.nodes as LinkTreeStructure[]) : []
        };
      });
      return await Promise.all(promises);
    };

    const mapChildren = async (children: LinkTreeStructure[]) => {
      const promises = children.map(async child => {
        if (child.academyPage !== onAcademyPage) {
          return child;
        }
        const layer = await this.addTreeLayer(child.key);
        return {
          ...child,
          nodes: layer
        };
      });
      return await Promise.all(promises);
    };

    const updatedTree = await mapTree(treeData);

    this.setState({
      loadingChildren: false,
      treeData: updatedTree
    });
  }

  /**
   * Handler for on node click event
   * @param hasNodes has nodes
   * @param toggleNode handler method for toggle node
   */
  private onNodeClick = (key: string, hasNodes: boolean, toggleNode: (() => void) | undefined) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hasNodes && toggleNode) {
      toggleNode();
      this.getGrandchildren(key);
    }
    event.stopPropagation();
  }
}

export default withStyles(styles)(TreeView);

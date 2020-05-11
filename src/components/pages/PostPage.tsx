import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link, Typography, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import { Page, Post, MenuLocationData } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../styles/feed.css";
import headerImage from "../../img/headerImage.png";
import TreeMenu, { TreeMenuItem, TreeNodeInArray } from "react-simple-tree-menu";
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';
import ChevronRightIcon from '@material-ui/icons/ArrowRight';
import "../../../node_modules/react-simple-tree-menu/dist/main.css";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  slug: string
  lang: string
}

type PageTemplate = "basic" | "fullscreen" | "dangerous" | "smallgutter";

/**
 * Interface representing component state
 */
interface State {
  page?: Page
  template: PageTemplate
  post?: Post
  loading: boolean
  isArticle: boolean
  heroBanner?: React.ReactElement
  heroContent?: React.ReactElement
  nav?: MenuLocationData
}

/**
 * PostPage component
 */
class PostPage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      template: "basic",
      isArticle: false,
      loading: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.loadContent();
  }

  /**
   * Component will mount life-cycle handler
   */
  public componentWillMount = () => {
    this.setTemplate();
  }

  public componentWillUpdate = (prevProps: Props) => {
    if (prevProps.slug !== this.props.slug) {
      this.setTemplate();
    }
  }

  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.slug !== this.props.slug) {
      this.loadContent();
    }
  }

  /**
   * Component render method
   */
  public render() {
    const { classes, lang } = this.props;
    const pageTitle = this.state.loading ? "" : this.setTitleSource();

    const treeData = [
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
    ];

    return (
      <BasicLayout lang={lang}>
        <div className={ classes.logoBar } style={{ backgroundImage: `url(${headerImage})` }}>
          <div className={ classes.titleContainer }>
            { pageTitle }
          </div>
        </div>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Breadcrumbs separator=">">
                <Link color="inherit" href="/" onClick={() => {}}>
                  Etusivu
                </Link>
                <Link color="inherit" href="/perusopetus/" onClick={() => {}}>
                  Perusopetus
                </Link>
              </Breadcrumbs>
            </div>
            <div className={ classes.columns }>
              <div className={ classes.sidebar }>
                <Typography variant="h5">Perusopetus</Typography>
                <TreeMenu data={ treeData }
                  hasSearch={ false }
                >
                  {({ search, items }) => (
                    <>
                      <List>
                        { items.map(item => this.renderTreeMenuItem(item)) }
                      </List>
                    </>
                  )}
                </TreeMenu>
              </div>
              <div className={ classes.contentarea }>
                { this.renderContent(pageTitle) }
              </div>
              <div className={ classes.sidebar }>
                <p>Aiheeseen liittyviä linkkejä</p>
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    );
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

  /**
   * Render content method
   */
  private renderContent = (pageTitle: string) => {
    const { classes } = this.props;
    if (this.state.template === "fullscreen") {
      return this.renderPostContent(pageTitle);
    }

    return (
      <Container className={ classNames( classes.root, this.state.isArticle && "article") }>
        { this.renderPostContent(pageTitle) }
      </Container>
    );

  }

  private setTemplate = () => {
    this.setState({
      template: this.getTemplate()
    });
  }

  private loadContent = async () => {
    this.setState({
      loading: true
    });

    const lang = this.props.lang;
    const slugParts = this.props.slug.split("/");
    const slug = slugParts.pop() || slugParts.pop();
    if (!slug) {
      // TODO: handle error
      return;
    }

    const api = ApiUtils.getApi();

    const apiCalls = await Promise.all([
      api.getWpV2Pages({ lang: [ lang ], slug: [slug] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [slug] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" })
    ]);

    const page = apiCalls[0][0];
    const post = apiCalls[1][0];
    const nav = apiCalls[2];

    this.setState({
      page: page,
      post: post,
      isArticle: !!post,
      loading: false,
      nav: nav
    });

    this.hidePageLoader();
  }

  /**
   * Render post content method
   */
  private renderPostContent = (pageTitle: string) => {
    const { classes, lang } = this.props;
    moment.locale(lang);
    return (
      <div className={
        classNames(classes.htmlContainer,
        this.state.isArticle && "article",
        this.state.template === "fullscreen" ? "fullscreen" : "",
        this.state.template === "smallgutter" ? "smallgutter" : "")
        }
      >
      { !this.state.heroBanner &&
        <>
          { this.state.post ? <p className={ classes.date }>{ moment(this.state.post.date).format("dddd, DD. MMMM YYYY") }</p> : "" }
          <h2 className={ classNames(classes.title, this.state.isArticle && "article") }>{ pageTitle }</h2>
        </>
      }
      { !this.state.loading &&
        this.getPageOrPostContent()
      }
    </div>
    );
  }

  /**
   * get html element classes
   *
   * @param node DomElement
   */
  private getElementClasses = (node: DomElement): string[] => {
    const classString = node.attribs ? node.attribs.class : "";
    if (node.attribs && node.attribs.class) {
      return classString.split(" ");
    }

    return [];
  }

  /**
   * Get html link href
   */
  private getLinkHref = (node: DomElement) => {
    return node.attribs && node.attribs.href ? node.attribs.href : "";
  }

  /**
   * Get html text content
   */
  private getElementTextContent = (node: DomElement) => {
    return node.children && node.children[0] ? node.children[0].data as string : "";
  }

  /**
   * Set html source for page content
   */
  private getPageOrPostContent = () => {
    const {page, post} = this.state;

    const noContentError = <h2 className="error-text">{ strings.pageNotFound }</h2>;
    const undefinedContentError = <h2 className="error-text">{ strings.somethingWentWrong }</h2>;
    if (!page && !post) {
      return noContentError;
    }

    const renderedContent = page && page.content ? page.content.rendered : post && post.content ? post.content.rendered : undefined;
    if (!renderedContent) {
      return undefinedContentError;
    }

    if (this.state.template === "dangerous") {
      return <div dangerouslySetInnerHTML={{__html:renderedContent}} />;
    }

    return ReactHtmlParser(renderedContent, { transform: this.transformContent });

  }

  /**
   * Hide page loader
   */
  private hidePageLoader() {
    const loaderElement = document.getElementById("pageLoader");
    if (loaderElement) {
      loaderElement.style.opacity = "0";
      setTimeout(() => {
        loaderElement.style.display = "none";
      }, 500);
    }
  }

  /**
   * Set html source for page content
   */
  private setTitleSource = () => {
    const noContentError = `${ strings.whoops }`;
    const undefinedContentError = `${ strings.error }`;

    if (this.state.page && this.state.page.title) {
      return this.state.page.title.rendered || undefinedContentError;
    } else if (this.state.post && this.state.post.title) {
      return this.state.post.title.rendered || undefinedContentError;
    } else {
      return noContentError;
    }
  }

  /**
   * transform html source content before it is rendered
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transformContent = (node: DomElement, index: number) => {
    const { classes } = this.props;
    const classNames = this.getElementClasses(node);

    // Find hero banner and set it to state
    if (classNames.indexOf("hero") > -1) {
      if (!this.state.heroBanner) {
        this.setState({
          heroBanner: convertNodeToElement(node, index, this.transformContent)
        });
      }
      return null;
    }

    // Find hero content and set it to state
    if (classNames.indexOf("hero-content") > -1) {
      if (!this.state.heroContent) {
        this.setState({
          heroContent: convertNodeToElement(node, index, this.transformContent)
        });
      }
      return null;
    }

    // Find any buttons and replace them with Material UI button
    if (classNames.indexOf("wp-block-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <a href={this.getLinkHref(childNode)} style={{ textDecoration: "none" }}>
            <Button className={ classes.button } color="primary" variant="outlined" endIcon={ <ArrowIcon /> }>
              {this.getElementTextContent(childNode)}
            </Button>
          </a>
        );
      }
    }

    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Returns current page template from body class
   *
   * @returns page template
   */
  private getTemplate = (): PageTemplate => {
    const templateClass = (document.body.className || "").split(" ").find((className) => className.indexOf("template-") === 0);
    return templateClass ? templateClass.substring(9) as PageTemplate : "basic";
  }
}

export default withStyles(styles)(PostPage);

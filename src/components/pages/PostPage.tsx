import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import { Page, Post, MenuLocationData, MenuItemData, PostTitle, CustomTaxonomy } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from '../generic/TreeView';
import RightSideBar from "../generic/RightSideBar";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  slug: string
  lang: string
  mainPageSlug: string
}

/**
 * Interface representing component state
 */
interface State {
  page?: Page;
  post?: Post;
  loading: boolean;
  isArticle: boolean;
  heroBanner?: React.ReactElement;
  heroContent?: React.ReactElement;
  nav?: MenuLocationData;
  breadcrumb: Breadcrumb[];
  pageTitle?: PostTitle;
}

/**
 * Interface for breadcrumb items
 */
interface Breadcrumb {
  label?: string;
  link?: string;
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
      isArticle: false,
      loading: false,
      breadcrumb: []
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = () => {
    this.loadContent();
  }

  /**
   * Component did update life-cycle handler
   */
  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.slug !== this.props.slug) {
      this.loadContent();
    }
  }

  /**
   * Component render method
   */
  public render() {
    const { classes, lang, slug } = this.props;

    return (
      <BasicLayout lang={ lang } title={ this.setTitleSource() }>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Breadcrumbs separator=">">
                <Link color="inherit" href="/" onClick={() => {}}>
                  Etusivu
                </Link>
                { this.state.breadcrumb && this.renderBreadcrumb() }
              </Breadcrumbs>
            </div>
            <div className={ classes.columns }>
              <div className={ classes.sidebar }>
                <TreeView lang={ lang } slug={ slug } />
              </div>
              <div className={ classes.contentarea }>
                { this.renderContent() }
              </div>
              <div className={ classes.sidebar }>
                <RightSideBar />
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    );
  }

  /**
   * Renders breadcrumb
   */
  private renderBreadcrumb = () => {
    const { breadcrumb } = this.state;
    return breadcrumb.map((crumb) => {
      return (
        <Link color="inherit" href={ crumb.link } onClick={() => {}}>
          { crumb.label }
        </Link>
      );
    });
  }

  /**
   * Render content method
   */
  private renderContent = () => {
    const { classes } = this.props;

    return (
      <Container className={ classNames( classes.root, this.state.isArticle && "article") }>
        { this.renderPostContent() }
      </Container>
    );
  }

  /**
   * Loads page or post content
   */
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
      api.getWpV2Pages({ lang: [ lang ], slug: [ slug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] }),
      api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
      api.getWpV2Pages({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
      api.getWpV2Posts({ lang: [ lang ], slug: [ this.props.mainPageSlug ] }),
    ]);

    const page = apiCalls[0][0];
    const post = apiCalls[1][0];
    const nav = apiCalls[2];
    const pageTitle = apiCalls[3][0].title || apiCalls[4][0].title;

    const currentPageOrPostId = (page) ? page.id : ((post) ? post.id : undefined);
    this.breadcrumbPath(String(currentPageOrPostId), nav.items || []);

    this.setState({
      page: page,
      post: post,
      isArticle: !!post,
      loading: false,
      nav: nav,
      pageTitle: pageTitle
    });

    this.hidePageLoader();
  }

  /**
   * Collects breadcrumbs
   * 
   * @param currentPageOrPostId current page or post id
   * @param locations menu item data array
   * @param path array of breadcrumbs
   */
  private breadcrumbPath = (currentPageOrPostId: string, locations: MenuItemData[], path?: Breadcrumb[]) => {
    if (locations.length > 0) {
      locations.forEach((location) => {
        if (currentPageOrPostId === location.object_id) {
          this.setState({
            breadcrumb: path ? [...path, { label: location.title, link: location.url }] : [{ label: location.title, link: location.url }]
          });
        } else if (location.child_items) {
          this.breadcrumbPath(
            currentPageOrPostId,
            location.child_items,
            path ? [...path, { label: location.title, link: location.url }] : [{ label: location.title, link: location.url }]
          )
        }
      });
    }
  }

  /**
   * Render post content method
   */
  private renderPostContent = () => {
    const { classes, lang } = this.props;
    moment.locale(lang);
    return (
      <div className={
        classNames(classes.htmlContainer,
        this.state.isArticle && "article")
        }
      >
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
    const { pageTitle, loading } = this.state;
    const noContentError = `${ strings.whoops }`;
    const undefinedContentError = `${ strings.error }`;

    if (pageTitle) {
      return pageTitle.rendered || undefinedContentError;
    } else if (!loading) {
      return noContentError;
    } else {
      return "";
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

    // Find any buttons and replace them with Material UI button
    if (classNames.indexOf("wp-block-button") > -1) {
      const childNode = node.children && node.children.length ? node.children[0] : null;
      if (childNode) {
        return (
          <a href={ this.getLinkHref(childNode) } style={{ textDecoration: "none" }}>
            <Button className={ classes.button } color="primary" variant="outlined" endIcon={ <ArrowIcon /> }>
              { this.getElementTextContent(childNode) }
            </Button>
          </a>
        );
      }
    }

    return convertNodeToElement(node, index, this.transformContent);
  }
}

export default withStyles(styles)(PostPage);

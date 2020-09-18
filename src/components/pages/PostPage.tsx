import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link, Typography, CircularProgress } from "@material-ui/core";
import styles from "../../styles/page-content";
import ApiUtils from "../../../src/utils/ApiUtils";
import { Page, Post, MenuLocationData, PostTitle } from "../../../src/generated/client/src";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";
import strings from "../../localization/strings";
import ArrowIcon from "@material-ui/icons/ArrowForwardRounded";
import * as classNames from "classnames";
import * as moment from "moment";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import TreeView from "../generic/TreeView";
import RightSideBar from "../generic/RightSideBar";
import PtvAccessibilityAccordion from "../generic/ptv-accessibility-accordion";
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
  treeMenuTitle?: string;
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
      breadcrumb: [],
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
    const { classes, lang, slug, mainPageSlug } = this.props;
    const { treeMenuTitle } = this.state;
    const rightSidebarContent = this.renderSideBarContent();

    return (
      <BasicLayout lang={ lang } mainPageSlug={ mainPageSlug } title={ this.setTitleSource() || <CircularProgress /> }>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Breadcrumbs separator=">">
                <Link color="inherit" href="/">
                  Etusivu
                </Link>
                { this.state.breadcrumb && this.renderBreadcrumb() }
              </Breadcrumbs>
            </div>
            <div className={ classes.columns }>
              <div className={ classes.leftsidebar }>
                <Typography variant="h3" className={ classes.treeMenuTitle }>{ treeMenuTitle || this.setTitleSource() }</Typography>
                <TreeView lang={ lang } slug={ slug } />
              </div>
              <div className={ classes.contentarea }>
                { this.renderContent() }
              </div>
              <RightSideBar rightSideBarContent={ rightSidebarContent }/>
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
      api.getWpV2Posts({ lang: [ lang ], slug: [ slug ] })
    ]);

    const page = apiCalls[0][0];
    const post = apiCalls[1][0];

    this.setState({
      page: page,
      post: post,
      isArticle: !!post
    });

    this.breadcrumbPath();
    this.hidePageLoader();
  }

  /**
   * Initializes building a breadcrumb
   */
  private breadcrumbPath = async () => {
    const { page } = this.state;
    if (page) {
      const api = ApiUtils.getApi();
      let breadcrumb: Breadcrumb[] = [];
      let pageTitle: PostTitle | undefined;
      let treeMenuTitle: string = "";

      const buildPath = async (current: Page) => {
        const title = current.title ? `${ current.title.rendered }` : "";
        const link = `${ current.link }`;
        breadcrumb = [{ label: title, link: link }, ...breadcrumb];
        if (current.parent !== undefined && current.parent !== 0) {
          const parentId = current.parent;
          const parent = await api.getWpV2PagesById({ id: `${ parentId }` });

          if (
            parent.taxonomy_academy !== undefined &&
            parent.taxonomy_academy.length === 0 &&
            current.taxonomy_academy !== undefined &&
            current.taxonomy_academy.length > 0
          ) {
            breadcrumb = [{ label: title, link: link }];
            treeMenuTitle = title;
          }

          await buildPath(parent);
        } else {
          pageTitle = current.title;
        }
      };

      await buildPath(page);

      this.setState({
        breadcrumb: breadcrumb,
        treeMenuTitle: treeMenuTitle,
        pageTitle: pageTitle,
        loading: false
      });
    }
  }

  /**
   * Render post content method
   */
  private renderPostContent = () => {
    const { classes, lang } = this.props;
    const { page } = this.state;
    moment.locale(lang);
    return (
      <div className={
        classNames(classes.htmlContainer,
        this.state.isArticle && "article")
        }
      >
      { page && page.title &&
        <h1 style={{ fontWeight: 700 }}>{ page.title.rendered }</h1>
      }
      { !this.state.loading &&
        this.getPageOrPostContent()
      }
      { this.state.loading &&
        <CircularProgress />
      }
    </div>
    );
  }

  /**
   * Render side bar content method
   */
  private renderSideBarContent = () => {
    return (
      <>
        { !this.state.loading &&
          this.getSideBarContent()
        }
      </>
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
   * Set html source for side panel content
   */
  private getSideBarContent = () => {
    const { page, post } = this.state;

    const noContentError = <h2 className="error-text">{ strings.pageNotFound }</h2>;
    const undefinedContentError = <h2 className="error-text">{ strings.somethingWentWrong }</h2>;
    if (!page && !post) {
      return noContentError;
    }

    const renderedContent = page && page.content ? page.content.rendered : post && post.content ? post.content.rendered : undefined;
    if (!renderedContent) {
      return undefinedContentError;
    }

    return ReactHtmlParser(renderedContent, { transform: this.transformSidePanelContent });
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
      return undefined;
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
    const { page, post } = this.state;

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

    /**
     * Get right sidebar content to variable
     * Right sidebar has added custom class in wordpress custom block
     */
    if (classNames.indexOf("meta-side-panel") > -1) {
      return null;
    }

    if (classNames.indexOf("accessibility") > -1) {
      const attribs = node.attribs || {};
      if (attribs["data-entrances"]) {
        const entranceData: PtvEntranceData[] = JSON.parse(attribs["data-entrances"]);

        if (!entranceData || entranceData.length === 0) {
          return null;
        }

        return (
          <>
            <h2 className={ classes.accessibilityTitle }>
              { strings.accessibility }
            </h2>
            {
              entranceData.map(entrance => this.renderPtvEntrance(entrance))
            }
          </>
        );
      }
    }

    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Renders PTV entrance data
   * 
   * @param entranceData entrance data
   */
  private renderPtvEntrance = (entranceData: PtvEntranceData) => {
    if (!entranceData.accessibilitySentences) {
      return null;
    }

    return entranceData.accessibilitySentences.map(accessibilitySentence => {
      return this.renderPtvAccessibilitySentence(accessibilitySentence);
    });
  }

  /**
   * Renders PTV accessibility sentence
   * 
   * @param accessibilitySentence accessibility sentence
   */
  private renderPtvAccessibilitySentence = (accessibilitySentence: PtvAccessibilitySentence) => {
    return (
      <PtvAccessibilityAccordion
        accessibilitySentence={ accessibilitySentence }
      />
    );
  }

  /**
   * transform html source content before it is rendered
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transformSidePanelContent = (node: DomElement, index: number) => {
    const classNames = this.getElementClasses(node);

    if (classNames.indexOf("meta-side-panel-layout") > -1) {
      return convertNodeToElement(node, index, this.transformSidePanelContent);
    }
    /**
     * Get right sidebar content to variable
     * Right sidebar has added custom class in wordpress custom block
     */
    if (classNames.indexOf("meta-side-panel") > -1) {
      return convertNodeToElement(node, index, this.transformContent);
    }

    return null;
  }
}

export default withStyles(styles)(PostPage);

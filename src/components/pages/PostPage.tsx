import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Container, WithStyles, withStyles, Button, Breadcrumbs, Link } from "@material-ui/core";
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
    return (
      <BasicLayout lang={lang}>
        <div className={ classes.wrapper }>
          <div className={ classes.pageContent }>
            <div className={ classes.breadcrumb }>
              <Breadcrumbs separator=">>">
                <Link color="inherit" href="/" onClick={() => {}}>
                  sivu 1
                </Link>
                <Link color="inherit" href="/" onClick={() => {}}>
                  sivu 2
                </Link>
              </Breadcrumbs>
            </div>
            <div className={ classes.columns }>
              <div className={ classes.navigation }>
                <p>Navigation here</p>
              </div>
              <div className={ classes.contentarea }>
                { this.renderContent(pageTitle) }
              </div>
              <div className={ classes.sidebar }>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non odio convallis, sagittis mauris at, feugiat libero. Nulla quis nunc ac dolor bibendum vestibulum at id dui. Vestibulum commodo nibh a nisl tincidunt tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam massa diam, pretium non pulvinar eu, imperdiet id enim. Aliquam quis placerat tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tellus quam, gravida ac dui quis, tempor convallis risus. Vivamus tortor erat, ultricies nec laoreet sed, euismod sed ex.

Ut vitae nulla faucibus, fermentum urna ut, lobortis diam. Phasellus mattis maximus mauris a porta. Duis condimentum vulputate massa in facilisis. Sed dapibus sapien velit, eu efficitur nisi feugiat vitae. Maecenas tincidunt cursus augue, vel volutpat mauris efficitur in. Vestibulum ullamcorper libero eu diam congue molestie. Vestibulum et turpis tellus. Aenean suscipit blandit diam quis laoreet.

Integer volutpat efficitur cursus. Aliquam in fermentum est. Cras quis sollicitudin sem, finibus iaculis dolor. Ut ac diam ex. Morbi eu turpis ullamcorper, fermentum ligula id, fringilla turpis. Suspendisse euismod fermentum neque a volutpat. Ut fermentum nibh eget turpis sollicitudin, vel vulputate nulla posuere. Maecenas eu tortor ligula. Pellentesque ac maximus justo. Pellentesque quis convallis nibh, pellentesque facilisis libero. Aliquam id tellus dignissim, faucibus nibh ut, tempor massa. Quisque vel sem ut lectus varius luctus. Phasellus eget neque convallis, finibus mauris a, interdum tellus. </p>
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    );
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
          <h1 className={ classNames(classes.title, this.state.isArticle && "article") }>{ pageTitle }</h1>
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

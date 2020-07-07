import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Post, MenuLocationData } from "../../generated/client/src";
import ApiUtils from "../../utils/ApiUtils";
import { WithStyles, withStyles, Button } from "@material-ui/core";
import styles from "../../styles/welcome-page";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { DomElement } from "domhandler";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string
}

/**
 * Interface representing component state
 */
interface State {
  posts: Post[];
  loading: boolean;
  mainMenu?: MenuLocationData;
  localeMenu?: MenuLocationData;
  frontPageColumnPost?: Post;
  scrollPosition: number;
  siteMenuVisible: boolean;
  siteSearchVisible: boolean;
  columns?: any;
}

/**
 * WelcomePage component
 */
class WelcomePage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      scrollPosition: 0,
      siteMenuVisible: false,
      siteSearchVisible: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true
    });

    const api = ApiUtils.getApi();

    const [ posts, mainMenu, localeMenu, frontPageColumnPost ] = await Promise.all(
      [
        api.getWpV2Posts({lang: [ this.props.lang ]}),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" }),
        api.getWpV2Posts({lang: [ this.props.lang ], slug: [ "etusivun-kolumnit" ]})
      ]
    );

    this.setState({
      posts: posts,
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
      frontPageColumnPost: frontPageColumnPost.length > 0 ? frontPageColumnPost[0] : undefined
    });

    this.getColumnsContent();
    this.hidePageLoader();
  }

  /**
   * Component will unmount life-cycle handler
   */
  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Component render method
   */
  public render() {
    const { lang, classes } = this.props;

    return (
      <BasicLayout lang={ lang }>
        <div className={ classes.columnSection }>
          { this.renderColumns() }
        </div>
      </BasicLayout>
    );
  }

  /**
   * Renders colums
   */
  private renderColumns = () => {
    return (
      <>
        { !this.state.loading &&
          this.columnsRendered()
        }
      </>
    );
  }

  /**
   * Returns columns
   */
  private columnsRendered = () => {
    const { classes } = this.props;
    const { columns } = this.state;
    
    if (!columns) {
      return;
    }
    
    return columns.map((column: any) => {
      return (
        <div className={ classes.column }>
          {
            column.map((child: any) => {
              return child;
            })
          }
        </div>
      );
    });
  }

  /**
   * Set html source for columns content
   */
  private getColumnsContent = () => {
    const { frontPageColumnPost } = this.state;

    if (!frontPageColumnPost) {
      return;
    }

    const renderedContent = frontPageColumnPost.content ? frontPageColumnPost.content.rendered : undefined;
    if (!renderedContent) {
      return;
    }
    
    ReactHtmlParser(renderedContent, { transform: this.transformContent });
  }

  /**
   * Transform html source content before it is rendered
   *
   * @param node DomElement
   * @param index DomElement index
   */
  private transformContent = (node: DomElement, index: number) => {
    const classNames = this.getElementClasses(node);

    if (classNames.indexOf("kolumnit") > -1) {
      if (!this.state.columns) {
        this.setState({
          columns: this.wpColumnParsing(node, index)
        });
      }
    }

    return convertNodeToElement(node, index, this.transformContent);
  }

  /**
   * Parses columns from wp-columns
   * 
   * @param node DomElement
   * @param index current node index
   */
  private wpColumnParsing = (node: DomElement, index: number) => {
    if (!node.children) {
      return undefined;
    }
    
    const columnsDividedToTwo = node.children.filter(child => child.attribs && child.attribs.class === "wp-block-column");
    let columnsDividedTwiceToTwo: DomElement[] = [];
    columnsDividedToTwo.forEach(item => {
      if (item.children) {
        columnsDividedTwiceToTwo = [ ...columnsDividedTwiceToTwo, ...item.children.filter(child => child.attribs && child.attribs.class === "wp-block-columns") ];
      }
    });
    let columnsDividedToFour: DomElement[] = [];
    columnsDividedTwiceToTwo.forEach(item => {
      if (item.children) {
        columnsDividedToFour = [ ...columnsDividedToFour, ...item.children.filter(child => child.attribs && child.attribs.class === "wp-block-column") ];
      }
    });
    const nodes = columnsDividedToFour.map(item => {
      const converted = convertNodeToElement(item, index, this.transformContent);
      const children = converted.props.children;
      return [...children];
    });

    return nodes;
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
   * Update scrolling position method
   */
  private handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      scrollPosition: currentScrollPos
    });
  }
}

export default withStyles(styles)(WelcomePage);

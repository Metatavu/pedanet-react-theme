import * as React from "react";
import BasicLayout from "../BasicLayout";
import { Post, MenuLocationData } from "../../generated/client/src";
import ApiUtils from "../../utils/ApiUtils";
import { Container, WithStyles, withStyles } from "@material-ui/core";
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
  columns?: React.ReactElement<any>[];
  textSection: React.ReactElement[];
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
      siteSearchVisible: false,
      textSection: []
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

    const [ posts, frontPageColumnPost, frontPageTextPost ] = await Promise.all(
      [
        api.getWpV2Posts({lang: [ this.props.lang ]}),
        api.getWpV2Posts({lang: [ this.props.lang ], slug: [ "etusivun-kolumnit" ]}),
        api.getWpV2Posts({lang: [ this.props.lang ], slug: [ "etusivun-teksti" ]})
      ]
    );

    this.setState({
      posts: posts,
      loading: false,
      frontPageColumnPost: frontPageColumnPost.length > 0 ? frontPageColumnPost[0] : undefined,
      textSection: this.renderTextSection(frontPageTextPost)
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

    const currentScript = document.scripts["bundle_script"];
    const readSpeakerId = currentScript.getAttribute("data-read-speaker-id");

    return (
      <BasicLayout lang={ lang } frontPage>
        <Container style={{ marginBottom: 50 }} fixed>
          <div
            id="readspeaker_button1"
            className="rs_skip rsbtn rs_preserve"
          >
            <a 
              rel="nofollow" 
              className="rsbtn_play" 
              accessKey="L" 
              title="Kuuntele" 
              href={`//app-eu.readspeaker.com/cgi-bin/rsent?customerid=${readSpeakerId}&amp;lang=fi_fi&amp;readclass=readthis&amp;url=${encodeURIComponent(window.location.href)}`}
            >
              <span className="rsbtn_left rsimg rspart">
                <span className="rsbtn_text">
                  <span>Kuuntele</span>
                </span>
              </span>
              <span className="rsbtn_right rsimg rsplay rspart"></span>
            </a>
          </div>

          <div className={ `${classes.frontPageText} readthis` }>
            { this.state.textSection }
          </div>

          <div
            className={ `${classes.columnSection} readthis` }
            role="heading"
            aria-level={ 1 }
          >
            { this.renderColumns() }
          </div>
        </Container>
      </BasicLayout>
    );
  }

  /**
   * Renders the front page text section
   * 
   * @param posts posts
   */
  private renderTextSection = (posts: Post[]) => {
    if(!posts.length || !posts[0].content || !posts[0].content.rendered) {
      return [ <p></p> ];
    }

    return ReactHtmlParser(posts[0].content.rendered);
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

    return columns.map((column) => {
      return (
        <div className={ `${ classes.column } ${ column.props.className }` }>
          {
            column.props.children.map((child: any) => {
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
    
    const columnsDividedToTwo = node.children.filter(child => child.attribs && child.attribs.class.match("wp-block-column"));
    let columnsDividedTwiceToTwo: DomElement[] = [];
    columnsDividedToTwo.forEach(item => {
      if (item.children) {
        columnsDividedTwiceToTwo = [ ...columnsDividedTwiceToTwo, ...item.children.filter(child => child.attribs && child.attribs.class && child.attribs.class.match("wp-block-column")) ];
      }
    });

    let columnsDividedToFour: DomElement[] = [];
    columnsDividedTwiceToTwo.forEach(item => {
      if (item.children) {
        columnsDividedToFour = [ ...columnsDividedToFour, ...item.children.filter(child => child.attribs && child.attribs.class && child.attribs.class.match("wp-block-column")) ];
      }
    });

    const nodes = columnsDividedToFour.map(item => {
      return convertNodeToElement(item, index, this.transformContent);
    });

    return nodes;
  }

  /**
   * get html element classes
   *
   * @param node DomElement
   *
   * @returns string[]
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

import { Grid, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/footer";
import { DomElement } from "domhandler";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  lang: string;
}

/**
 * Component state
 */
interface State {
  columns?: React.ReactElement<any>[];
}

/**
 * Footer component
 */
class Footer extends React.Component<Props, State> {
  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  /**
   * Component lifecycle handler
   */
  public async componentDidMount() {
    const api = ApiUtils.getApi();

    const footerPosts  = await api.getWpV2Posts({lang: [ this.props.lang ], slug: [ "footer" ]});
    if (footerPosts.length > 0) {
      const postContent = footerPosts[0].content;
      if (postContent) {
        const rendered = postContent.rendered;
        if (rendered) {
          ReactHtmlParser(rendered, { transform: this.transformContent });
        }
      }
    }
  }

  public render() {
    const { classes } = this.props;
    
    return (
      <div className={ classes.noPrint }>
          <Grid
            container
            justifyContent="space-around"
            style= {{ backgroundColor: "#234c8e", marginTop: "50px" }}
          >
            <Grid
              className={ classes.footerContainer }
              container
              lg={ 8 }
              md={ 12 }
              sm={ 12 }
            >
              { this.renderColumns() }  
            </Grid>
          </Grid>
        
        <img style={{ height: "8px", width: "100%" }} src="https://mikkeli.fi/gfx/layout/mikkeli-banner-border.png"/>
      </div>
    );
  }

  /**
   * Renders columns
   */
  private renderColumns = () => {
    if (this.state.columns) {
      return this.state.columns.map(column => {
        return (
          <Grid item style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
          { 
            column.props.children.map((child: any) => {
              return child;
            }) 
          }
          </Grid>
        )
      });
    }

    return <></>
  }


  /**
   * Transform html source content before it is rendered
   *
   * @param node DomElement
   * @param index DomElement index
   */
   private transformContent = (node: DomElement, index: number) => {
      if (!this.state.columns) {
        this.setState({
          columns: this.wpColumnParsing(node, index)
        });
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

    const nodes = columnsDividedToTwo.map(item => {
      return convertNodeToElement(item, index, function () {});
    });

    return nodes;
  }
}

export default withStyles(styles)(Footer);
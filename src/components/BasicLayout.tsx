import * as React from "react";
import { WithStyles, withStyles, Link, Container } from "@material-ui/core";
import bar from "../resources/img/bar.png";
import mikkeliLogo from "../resources/img/mikkeliLogo.png";
import socialNetworks from "../resources/img/social.png";
import { MenuLocationData, MenuItemData } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string,
  title?: string
}

/**
 * Interface representing component state
 */
interface State {
  loading: boolean
  mainMenu?: MenuLocationData
  localeMenu?: MenuLocationData
  scrollPosition: number
}

/**
 * React component for basic application layout
 */
class BasicLayout extends React.Component<Props, State> {

  /**
   * Constructor
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      scrollPosition: 0,
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true,
    });

    const api = ApiUtils.getApi();

    const [mainMenu, localeMenu] = await Promise.all(
      [
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "main" }),
        api.getMenusV1LocationsById({ lang: this.props.lang, id: "locale" })
      ]
    )

    this.setState({
      loading: false,
      mainMenu: mainMenu,
      localeMenu: localeMenu,
    });
  }

  /**
   * Component will unmount life-cycle handler
   */
  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Render header layout
   */
  public render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div>
          <img className={ classes.logoBar } src={ bar } />
          <div className={ classes.searchSection }>
            <input type="text" placeholder="Search.." />
            <img className={ classes.social } src={ socialNetworks } />
          </div>
          <Container maxWidth="lg">
            <a href="/?lang=fi">
              <img className={ classes.logo } src={ mikkeliLogo } />
            </a>
            <div className={ classes.topNavDesktop }>
              { this.renderMenu() }
            </div>
          </Container>
        </div>
        <div className={ `${classes.logoBar} ${classes.headerImage}` }>
          { this.props.title &&
            <div className={ classes.titleContainer }>
              { this.props.title }
            </div>
          }
        </div>
        { this.props.children }
      </div>
    );
  }

  /**
   * Render menu method
   */
  private renderMenu = () => {
    const mainMenu = this.state.mainMenu;
    const { classes } = this.props;

    if (!mainMenu || !mainMenu.items) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          mainMenu.items.map(this.renderMenuItem)
        }
      </div>
    );
  }

  /**
   * Render menu item method
   */
  private renderMenuItem = (item: MenuItemData) => {
    const { classes } = this.props;
    return (
      <Link
        variant="h6"
        key={ item.db_id }
        href={ item.url }
        className={ classes.navLink }
      >
        {
          item.title
        }
      </Link>
    );
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

export default withStyles(styles)(BasicLayout);
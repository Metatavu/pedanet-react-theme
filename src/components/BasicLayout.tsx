import * as React from "react";
import classNames from "classnames";
import { AppBar, WithStyles, withStyles, Button, IconButton, Link, Hidden } from "@material-ui/core";
import bar from "../img/bar.png";
import mikkeliLogo from "../img/mikkeliLogo.png";
import socialNetworks from "../img/social.png";
import { MenuLocationData, MenuItemData } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/header";

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
  loading: boolean
  mainMenu?: MenuLocationData
  localeMenu?: MenuLocationData
  scrollPosition: number
  siteMenuVisible: boolean
  siteSearchVisible: boolean
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
      siteMenuVisible: false,
      siteSearchVisible: false
    };
  }

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

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Render header layout
   */
  public render() {
    const { classes } = this.props;
    let mikkeliLogoClasses = classNames( classes.logo );
    let logoBarClasses = classNames( classes.logoBar );
    let socialClasses = classNames( classes.social );

    return (
        <div>
            <div>
                <Link href={`/?lang=${this.props.lang}`}>
                    <img className={logoBarClasses} src={bar} />
                </Link>
                <div className={ classes.searchSection }>
                    <input type="text" placeholder="Search.."></input>
                    <img className={socialClasses} src={socialNetworks} />
                </div>  
                <a>Social networking + language select + search bar</a>
                <a>
                    <img className={mikkeliLogoClasses} src={mikkeliLogo} />
                </a>
                <div className={classes.topNavDesktop}>
                  {this.renderMenu()}
                </div>
            </div>
            <div>
              {this.props.children}
            </div>
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
   * Site menu visibility method
   */
  private showSiteMenu = () => {
    return (
      this.setState({
        siteMenuVisible: true
      })
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
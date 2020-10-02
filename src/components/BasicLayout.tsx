import * as React from "react";
import { WithStyles, withStyles, Link, Container, Typography, Hidden, IconButton, Collapse } from "@material-ui/core";
import bar from "../resources/img/bar.png";
import mikkeliLogo from "../resources/img/mikkeliLogo.png";
import headerImage from "../resources/img/headerImage.png";
import { MenuItem } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";

import MenuIcon from "@material-ui/icons/Menu";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string,
  title?: string | JSX.Element,
  mainPageSlug?: string
}

/**
 * Interface representing component state
 */
interface State {
  loading: boolean;
  mainMenu?: MenuItem[];
  scrollPosition: number;
  postThumbnail: string;
  eventCalendarUrl?: string;
  showMenu: boolean;
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
      postThumbnail: headerImage,
      showMenu: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    const initialPostThumbnail = this.state.postThumbnail;
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true,
    });

    const api = ApiUtils.getApi();

    const [mainMenu, postThumbnail] = await Promise.all(
      [
        api.getMainMenu(),
        api.getPostThumbnail({ slug: this.props.mainPageSlug })
      ]
    );

    const eventCalendarUrl = `${ window.location.origin }/koulutuskalenteri/`;

    this.setState({
      loading: false,
      mainMenu: mainMenu,
      postThumbnail: postThumbnail !== "false" ? postThumbnail : initialPostThumbnail,
      eventCalendarUrl: eventCalendarUrl
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
    const { postThumbnail, showMenu } = this.state;

    return (
      <div className={ classes.root }>
        <div className={ classes.top } role="navigation" aria-label="top nav">
          <div className={ classes.horizontalColorBar } aria-label="top bar" style={{ backgroundImage: `url( ${ bar } )` }} />
          <Container maxWidth="lg">
            <div className={ classes.logoSection }>
              <Hidden mdUp>
                <IconButton size="medium" onClick={ this.onMenuClick }>
                  <MenuIcon color="primary" />
                </IconButton>
              </Hidden>
              <a href="/?lang=fi">
                <img className={ classes.logo } src={ mikkeliLogo } alt="mikkeli logo" />
              </a>
            </div>
            {/* Desktop menu, hidden from mobile devices */}
            <Hidden smDown>
              <div className={ classes.topNavDesktop }>
                { this.renderMenu() }
              </div>
            </Hidden>
          </Container>
          {/* Mobile menu */}
          <div className={ classes.topNavMobile }>
            <Collapse in={ showMenu }>
              { this.renderMenu() }
            </Collapse>
          </div>
        </div>
        <div
          role="banner"
          className={ `${ classes.logoBar } ${ classes.headerImage }` }
          style={{ backgroundImage: `url(${ this.state.loading ? "" : postThumbnail })` }}
        >
          { this.props.title &&
            <div className={ classes.titleContainer }>
              <Typography variant="h1">{ this.props.title }</Typography>
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
    const { mainMenu, eventCalendarUrl } = this.state;
    const { classes } = this.props;

    if (!mainMenu || mainMenu.length < 1) {
      return null;
    }

    return (
      <div className={ classes.nav }>
        {
          mainMenu.map(this.renderMenuItem)
        }
        {
          eventCalendarUrl && this.renderEventCalendarLink(eventCalendarUrl)
        }
      </div>
    );
  }

  /**
   * Render menu item method
   *
   * @param item menu item
   */
  private renderMenuItem = (item: MenuItem) => {
    const { classes } = this.props;
    return (
      <Link
        variant="h6"
        key={ item.title }
        href={ item.link }
        className={ classes.navLink }
      >
        { item.title }
      </Link>
    );
  }

  /**
   * Returns event calendar link rendered
   *
   * @param link link to event calendar page
   */
  private renderEventCalendarLink = (link: string) => {
    const { classes } = this.props;
    return (
      <Link
        variant="h6"
        href={ link }
        className={ classes.navLink }
      >
        {
          "Koulutuskalenteri"
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

  /**
   * Mobile menu toggle
   */
  private onMenuClick = () => {
    return ( this.state.showMenu ? this.hideMobileMenu() : this.showMobileMenu() );
  }

  /**
   * Mobile menu visibility method
   */
  private showMobileMenu = () => {
    return (
      this.setState({
        showMenu: true
      })
    );
  }

  /**
   * Mobile menu visibility method
   */
  private hideMobileMenu = () => {
    return (
      this.setState({
        showMenu: false
      })
    );
  }
}

export default withStyles(styles)(BasicLayout);

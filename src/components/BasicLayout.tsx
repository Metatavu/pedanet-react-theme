import * as React from "react";
import { WithStyles, withStyles, Link, Container, Hidden, IconButton, Collapse, TextField, Typography, Popper, Card, Paper } from "@material-ui/core";
import bar from "../resources/img/bar.png";
import mikkeliLogo from "../resources/img/mikkeliLogo.png";
import headerImage from "../resources/img/headerImage.png";
import { MenuItem } from "../generated/client/src";
import ApiUtils from "../utils/ApiUtils";
import styles from "../styles/basic-layout";
import { Autocomplete } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";
import Footer from "./Footer";

import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import CommentOutlined from "@material-ui/icons/CommentOutlined";

import strings from "../localization/strings";
import classNames from "classnames";


/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  lang: string,
  title?: string | JSX.Element,
  innerPageSlug?: string,
  mainPageSlug?: string,
  frontPage?: boolean
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
  options: SearchOption[];
  search: SearchOption;
  redirectToSearch: boolean;
}

/**
 * Search result option
 */
interface SearchOption {
  title: string;
  type: string;
  url: string;
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
      showMenu: false,
      options: [],
      search: { title: "", type: "", url: "" },
      redirectToSearch: false
    };
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    const component = this;
    window.addEventListener("keydown", function (event: any) {
      if (event.key === "Enter" && event.target.id === "site-wide-search") {
        component.setState({ redirectToSearch: true });
      }
    });
    
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      loading: true,
    });

    const eventCalendarUrl = `${ window.location.origin }/koulutuskalenteri/`;

    const api = ApiUtils.getApi();
    const mainMenu = (await api.getMainMenu()).filter(item => item.title != "Haku");
    const bannerImage = await this.getBannerImage();
    if (bannerImage) {
      this.setState({ postThumbnail: bannerImage });
    }

    this.setState({
      loading: false,
      mainMenu: mainMenu,
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

    if (this.state.redirectToSearch) {
      this.setState({ redirectToSearch: false });
      location.href = `/haku?search=${this.state.search.title}`;
    }

    return (
      <div className={ classes.root }>
        <div className={ classes.noPrint } role="navigation" aria-label="top nav">
          <div
            className={ classes.horizontalColorBar }
            aria-label="top bar"
            style={{ backgroundImage: `url( ${ bar } )` }}
          />
          <Container maxWidth="lg">
            <div className={ classes.logoSection }>
              <Hidden mdUp implementation="js">
                <IconButton size="medium" onClick={ this.onMenuClick }>
                  <MenuIcon color="primary" />
                </IconButton>
              </Hidden>
              <a href="/">
                <img
                  className={ classes.logo }
                  src={ mikkeliLogo }
                  alt="mikkeli logo"
                />
              </a>
              <Hidden smDown implementation="js">
                { this.renderSearchbar() }
              </Hidden>
            </div>
            {/* Desktop menu, hidden from mobile devices */}
            <Hidden smDown implementation="js">
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
            { this.renderSearchbar() }
          </div>
        </div>
        <div
          role="banner"
          className={ `${ classes.logoBar } ${ classes.headerImage } ${classes.noPrint}` }
          style={{ backgroundImage: `url(${ this.state.loading ? "" : postThumbnail })` }}
        />
        { this.props.children }
        <Footer lang={ this.props.lang }/>
      </div>
    );
  }

  /**
   * Builds request params
   * 
   * @param query query
   * @param elasticKey Elasticsearch key
   * @param resultType Result type
   * @param baseUrl base url
   */
  private buildSearchRequestParams = (
      query: string,
      elasticKey: string, 
      resultType: SearchResultType,
      baseUrl: string
  ) => ({
    method: "POST",
    body: JSON.stringify({
      page: {
        size: 5
      },
      query,
      filters: {
        "all": [
          { "all": [
            { "base_url": baseUrl }, 
            { "type" : resultType }
          ]}
        ]
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${elasticKey}`
    }
  });

  /**
   * Reacts to changing search text
   * 
   * @param _ event
   * @param value search text
   */
  private onSearchChange = async (_: React.ChangeEvent<{}>, value: string) => {
    this.setState({ search: { type: "", title: value, url: "" } });
    const currentScript = document.scripts["bundle_script"];
    if (!currentScript) {
      return;
    }
    const url = currentScript.getAttribute('data-elastic-url');
    const key = currentScript.getAttribute('data-elastic-key');
    const oppiminenDomain = currentScript.getAttribute('data-oppiminen-domain');
    const mikkeliDomain = currentScript.getAttribute('data-mikkeli-domain');

    if (!url || !key || !oppiminenDomain || !mikkeliDomain) {
      return;
    }

    const pages = await (await fetch(url + "/search.json", this.buildSearchRequestParams(value, key, "page" , mikkeliDomain))).json();
    const news = await (await fetch(url + "/search.json", this.buildSearchRequestParams(value, key, "post" , mikkeliDomain))).json();
    const oppiminenPages = await (await fetch(url + "/search.json", this.buildSearchRequestParams(value, key, "page" , oppiminenDomain))).json();

    const pageOptions = pages.results.map((result: any) => ({ title: result.title.raw, type: strings.pages, url: result.url.raw }));
    const newsOptions = news.results.map((result: any) => ({ title: result.title.raw, type: strings.news, url: result.url.raw }));
    const oppiminenOptions = oppiminenPages.results.map((result: any) => ({ title: result.title.raw, type: strings.oppiminen, url: result.url.raw }));

    const options = pageOptions.concat(newsOptions).concat(oppiminenOptions);
    this.setState({ options });
  }

  /**
   * Renders the search bar
   */
  private renderSearchbar = () => {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: 400,
          marginLeft: 20,
          marginBottom: 10
        }}
      >
        <Autocomplete
          id="site-wide-search"
          value={ this.state.search }
          size="small"
          style={{ alignSelf: "flex-start", width: "400px" }}
          options={ this.state.options }
          getOptionLabel={ option => option.title }
          groupBy={ option => option.type }
          onInputChange={ this.onSearchChange } 
          renderGroup={ this.renderGroup }
          renderInput={ params => <TextField { ...params } label={ strings.search } variant="outlined"/> }
          renderOption={ this.renderOption }
          ListboxProps={{ style: {  maxHeight: "1000px" }}}
          disablePortal={ true }
          classes={{
            popperDisablePortal: classes.popperDisablePortal,
            paper: classes.paper
          }}
        />
      </div>

    );
  }

  /**
   * Renders one group for the searchbar results
   * 
   * @param params group params
   */
  private renderGroup = (params: any) => {
    return (
      <>
      <Typography style={{ marginLeft: "10px", fontSize: "1.5rem", fontWeight: "bold" }}>{ params.group }</Typography>
      <Container style={{ overflow: "hidden", paddingLeft: 0 }}>
        { params.children }
      </Container>
      </>
    );
  }

  /**
   * Renders an option
   * 
   * @param option option to render
   */
  private renderOption = (option: SearchOption) => {
    const title = option.title.length > 50 ? option.title.substring(0, 50) + "..." : option.title;
    const icon = option.type === strings.news ? <CommentOutlined fontSize="medium"/> : <DescriptionOutlined fontSize="medium"/>;
    return (
      <Link style={{ fontSize: "1.5rem", fontWeight: "normal", whiteSpace: "nowrap", display: "flex", alignItems: "center" }} color="inherit" href={ option.url }>{ icon }{ title }</Link>
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
      <div style={{ flexWrap: 'nowrap' }} className={ classes.nav }>
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
   * Gets banner image
   */
  private getBannerImage = async () => {
    const { frontPage, innerPageSlug, mainPageSlug } = this.props;
    const api = ApiUtils.getApi();

    if (innerPageSlug) {
      const innerPageBannerImage = await api.getPostThumbnail({ slug: innerPageSlug });
      if (innerPageBannerImage !== "false") {
        return innerPageBannerImage;
      }
    }

    if (mainPageSlug) {
      const mainPageBannerImage = await api.getPostThumbnail({ slug: mainPageSlug });
      if (mainPageBannerImage !== "false") {
        return mainPageBannerImage;
      }
    }

    if (frontPage) {
      const frontPageBannerImage = await api.getPostThumbnail({
        slug: "etusivun-kolumnit",
        post_type: "post"
      });

      if (frontPageBannerImage !== "false") {
        return frontPageBannerImage;
      }
    }

    return undefined;
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

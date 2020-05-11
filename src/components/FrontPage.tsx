import * as React from "react";
import classNames from "classnames";
import { AppBar, WithStyles, withStyles, Button, IconButton, Link, Hidden } from "@material-ui/core";
import headerImage from "../img/headerImage.png";
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
class FrontPage extends React.Component<Props, State> {

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
    let logoBarClasses = classNames( classes.logoBar );

    return (
      <div>
        <a>
          <img className={ logoBarClasses } src={headerImage} />
        </a>
        <div className={ classes.buttonSection }>
          <button className={classes.menuButtonOne}>Varhaiskasvatus ja esiopetus</button>
          <button className={classes.menuButtonTwo}>Perusopetus</button>
          <button className={classes.menuButtonThree}>Lukio-opetus</button>
          <button className={classes.menuButtonFour}>Kansalaisopisto</button>
        </div>
      </div>

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

export default withStyles(styles)(FrontPage);
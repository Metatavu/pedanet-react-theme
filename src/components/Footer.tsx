import * as React from "react";

interface Props {

}

interface State {

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

  public componentDidMount() {
    alert("AAAAAAAAAAAAAAAAAAAA");
  }

  public render() {
    return (
      <img style={{ height: "8px", width: "100%" }} src="https://mikkeli.fi/gfx/layout/mikkeli-banner-border.png"/>
    );
  }
}

export default Footer;
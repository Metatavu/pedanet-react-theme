import { Grid, WithStyles, withStyles } from "@material-ui/core";
import { ClassSharp } from "@material-ui/icons";
import * as React from "react";
import styles from "../styles/footer";

interface Props extends WithStyles<typeof styles> {}

interface State {}

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

  }

  public render() {
    const { classes } = this.props;
    return (
      <>
          <Grid
            container
            justifyContent="space-around"
            style= {{ backgroundColor: "#234c8e" }}
          >
          <Grid
            className={ classes.footerContainer }
            container
            lg={ 8 }
            md={ 12 }
            sm={ 12 }
          >
            <Grid item >
              <p><span><strong>Asiointipiste</strong><br/>
              Maaherrankatu 9 – 11</span><br/>
              <span>50100 Mikkeli</span><br/>
              puh. 015 194 2100</p>
              <p>asiakaspalvelu@mikkeli.fi<br/>
              kirjaamo@mikkeli.fi</p>
              <p>Vaihde puh. 015 1941<br/>
              <span>(arkisin klo 8 – 16)</span></p>
              <p><span>Y-tunnus<br/>
              0165116-3</span></p>
              <p>&nbsp;</p>
              <p><strong><a href="https://www.mikkeli.fi/sisalto/verkkoasiointi/digipalvelujen-saavutettavuus/saavutettavuusseloste"><span>Saavutettavuusseloste</span></a></strong></p>
            </Grid>
            <Grid  item>
              <p><span><strong>Asiointipiste</strong><br/>
              Maaherrankatu 9 – 11</span><br/>
              <span>50100 Mikkeli</span><br/>
              puh. 015 194 2100</p>
              <p>asiakaspalvelu@mikkeli.fi<br/>
              kirjaamo@mikkeli.fi</p>
              <p>Vaihde puh. 015 1941<br/>
              <span>(arkisin klo 8 – 16)</span></p>
              <p><span>Y-tunnus<br/>
              0165116-3</span></p>
              <p>&nbsp;</p>
              <p><strong><a href="https://www.mikkeli.fi/sisalto/verkkoasiointi/digipalvelujen-saavutettavuus/saavutettavuusseloste"><span>Saavutettavuusseloste</span></a></strong></p>
            </Grid>
            <Grid item>
              <p><span><strong>Asiointipiste</strong><br/>
              Maaherrankatu 9 – 11</span><br/>
              <span>50100 Mikkeli</span><br/>
              puh. 015 194 2100</p>
              <p>asiakaspalvelu@mikkeli.fi<br/>
              kirjaamo@mikkeli.fi</p>
              <p>Vaihde puh. 015 1941<br/>
              <span>(arkisin klo 8 – 16)</span></p>
              <p><span>Y-tunnus<br/>
              0165116-3</span></p>
              <p>&nbsp;</p>
              <p><strong><a href="https://www.mikkeli.fi/sisalto/verkkoasiointi/digipalvelujen-saavutettavuus/saavutettavuusseloste"><span>Saavutettavuusseloste</span></a></strong></p>
            </Grid>
            <Grid item>
              <p><span><strong>Asiointipiste</strong><br/>
              Maaherrankatu 9 – 11</span><br/>
              <span>50100 Mikkeli</span><br/>
              puh. 015 194 2100</p>
              <p>asiakaspalvelu@mikkeli.fi<br/>
              kirjaamo@mikkeli.fi</p>
              <p>Vaihde puh. 015 1941<br/>
              <span>(arkisin klo 8 – 16)</span></p>
              <p><span>Y-tunnus<br/>
              0165116-3</span></p>
              <p>&nbsp;</p>
              <p><strong><a href="https://www.mikkeli.fi/sisalto/verkkoasiointi/digipalvelujen-saavutettavuus/saavutettavuusseloste"><span>Saavutettavuusseloste</span></a></strong></p>
            </Grid>
            <Grid item>
              <p><span><strong>Asiointipiste</strong><br/>
              Maaherrankatu 9 – 11</span><br/>
              <span>50100 Mikkeli</span><br/>
              puh. 015 194 2100</p>
              <p>asiakaspalvelu@mikkeli.fi<br/>
              kirjaamo@mikkeli.fi</p>
              <p>Vaihde puh. 015 1941<br/>
              <span>(arkisin klo 8 – 16)</span></p>
              <p><span>Y-tunnus<br/>
              0165116-3</span></p>
              <p>&nbsp;</p>
              <p><strong><a href="https://www.mikkeli.fi/sisalto/verkkoasiointi/digipalvelujen-saavutettavuus/saavutettavuusseloste"><span>Saavutettavuusseloste</span></a></strong></p>
            </Grid>
          </Grid>
          </Grid>
        
        <img style={{ height: "8px", width: "100%" }} src="https://mikkeli.fi/gfx/layout/mikkeli-banner-border.png"/>
      </>
    );
  }
}

export default withStyles(styles)(Footer);
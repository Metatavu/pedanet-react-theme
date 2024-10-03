import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PostPage from "./pages/PostPage";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import pedanetTheme from "../styles/theme";
import * as qs from "query-string";
import strings from "../localization/strings";
import SearchResultsPage from "./pages/SearchResultsPage";
import CookieConsent from "react-cookie-consent";
import ReactGA from 'react-ga4';

/**
 * Interface representing component properties
 */
interface Props { }

/**
 * Material UI's automated responsive font sizes
 */
const theme = responsiveFontSizes(pedanetTheme);

/**
 * App component
 */
const App: React.FC<Props> = () => {
  const [language, setLanguage] = useState<string>("fi");

  useEffect(() => {
    const currentScript = document.scripts["bundle_script"];
    const TRACKING_ID = currentScript.getAttribute("data-google-analytics-measurement-id");
    ReactGA.initialize(TRACKING_ID);
    const queryParams = qs.parse(location.search);
    const lang = (queryParams.lang || "fi") as string;
    setLanguage(lang);
    strings.setLanguage(lang);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <CookieConsent location="center" overlay={true} buttonText="Ok">
            {`${strings.cookieAccept} `}
            <a style={{ color: "#8ac8ff"}} href="https://www.mikkeli.fi/sisalto/tietoja-mikkelista/tietopalvelu-ja-tietosuoja">
              {strings.readMorePrivacy}
            </a>
          </CookieConsent>
          <h1 style={{ display: "none" }}>Mikkeli Oppiminen</h1>
          <h2 style={{ display: "none" }}>Ilo kasvaa ja oppia</h2>
          <Switch>
            <Route
              path="/"
              exact={true}
              render={(props) => (
                <WelcomePage
                  lang={language}
                />
              )}
            />
            <Route
              path="/haku"
              exact={true}
              render={(props) => (
                <SearchResultsPage
                  history={props.history}
                  lang={language}
                  query={qs.parse(props.location.search).search as string || ""}
                />
              )}
            />
            <Route
              path="/:slug"
              render={(props) => (
                <PostPage
                  lang={language}
                  slug={pathToSlug(props.location.pathname)}
                  mainPageSlug={pathToTitle(props.location.pathname)}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

/**
 * Takes in a path and returns the last location
 *
 * @param path path as string
 */
const pathToSlug = (path?: string) => {
  if (path) {
    const lastPart = path.match(/\/[^/]+\/?$/g);
    if (lastPart) {
      const slashesStripped = lastPart[0].replace(/\//g, "");
      return slashesStripped;
    }
  }
  return "";
};

/**
 * Takes in path and returns the first location
 */
const pathToTitle = (path?: string) => {
  if (path) {
    const firstPart = path.match(/^\/[^/]+\//g);
    if (firstPart) {
      const slashesStripped = firstPart[0].replace(/\//g, "");
      return slashesStripped;
    }
  }
  return "";
};

export default App;

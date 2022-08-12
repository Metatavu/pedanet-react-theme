import { Button, ButtonGroup, Container, Link, TextField } from "@material-ui/core";
import React from "react";
import strings from "../../localization/strings";
import BasicLayout from "../BasicLayout";
import { History } from "history";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Component props
 */
interface Props {
  lang: string;
  history: History;
  query: string;
}

/**
 * Component state
 */
interface State {
  results: SearchResult[];
  query: string;
  searchAgain: boolean;
  currentPage: number;
  numberOfPages: number;
  loading: boolean;
  selectedResultType: SearchResultType;
};

/**
 * Search result
 */
interface SearchResult {
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
  url: string;
  placeholderImage: boolean;
}

/**
 * SearchResultsPage component
 */
 class SearchResultsPage extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      query: "",
      searchAgain: false,
      currentPage: 1,
      numberOfPages: 1,
      loading: false,
      selectedResultType: "page"
    }
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    const component = this;
    
    window.addEventListener("keydown", function (event: any) {
      if (event.key === "Enter" && event.target.id === "search-results-search") {
        component.onSearch();
      }
    });

    this.setState({ query: this.props.query });
    await this.searchItems(this.props.query, 1, "page");
  }
  
  /**
   * Component render method
   */
  public render() {
    return (
      <BasicLayout lang={ this.props.lang }>
        <Container fixed>
            <h1>{ strings.searchPageTitle }</h1>
            <TextField
              size="small"
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={ event => this.setState({ query: event.target.value }) } 
              value={ this.state.query }
              label={ strings.search }
              variant="outlined"
              id="search-results-search"
              inputProps={{ "aria-labelledby": "search-results-search-label" }}
            />
            <Button onClick={ this.onSearch } size="large" color="primary" variant="contained">{ strings.search }</Button>
            <div style={{ marginTop: "40px" }}>
              <ButtonGroup variant="text" style={{ marginBottom: "20px" }}>
                <Button onClick={() => this.changeResultType("page") }>{ strings.pages }</Button>
                <Button onClick={() => this.changeResultType("post") }>{ strings.news }</Button>
                <Button onClick={() => this.changeResultType("attachment") }>{ strings.files }</Button>
                <Button onClick={() => this.changeResultType("mikkeli") }>{ strings.mikkeli }</Button>
              </ButtonGroup>
              { this.state.loading ? this.renderLoader() : this.state.results.map(this.renderResult) }
              { this.renderPageNavigation() }
            </div>
        </Container>
    </BasicLayout>
    );
  }

  /**
   * Changes the search result type
   * 
   * @param selectedResultType selected result type
   */
  private changeResultType = async (selectedResultType: SearchResultType) => {
    this.setState({ selectedResultType, currentPage: 1 });
    await this.searchItems(this.state.query, 1, selectedResultType);
  }

  /**
   * Renders the loader
   */
  private renderLoader = () => (
    <Container style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress/>
    </Container>
  );

  /**
   * Renders page navigation
   */
  private renderPageNavigation = () => {
   const previousPageElement = this.renderPreviousPageLink();
   const nextPageElement = this.renderNextPageLink();
   return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", fontSize: "1.6rem", marginTop: "20px", marginBottom: "20px" }}>
      { previousPageElement } <span style={{ marginLeft: "10px", marginRight: "10px" }}>{ `${strings.page} ${this.state.currentPage}` }</span> { nextPageElement }
    </div>
   );
  }

  /**
   * Renders the link for the previous page
   */
  private renderPreviousPageLink = () => {
    if (this.state.currentPage > 1) {
      return <Link onClick={ this.goToPreviousPage } style={{ display: "flex", cursor: "pointer" }}><ArrowLeft/>{ strings.previousPage }</Link>;
    } else {
      return <span style={{display: "flex"}}><ArrowLeft/>{ strings.previousPage }</span>;
    }
  }

  /**
   * Renders the link for the next page
   */
  private renderNextPageLink = () => {
    if (this.state.currentPage < this.state.numberOfPages) {
      return <Link onClick={ this.goToNextPage } style={{display: "flex", cursor: "pointer"}} color="primary">{ strings.nextPage }<ArrowRight/></Link>;
    } else {
      return <span style={{display: "flex"}}>{ strings.nextPage }<ArrowRight/></span>;
    }
  }

  /**
   * Navigates to the previous page
   */
  private goToPreviousPage = async () => {
    if (this.state.currentPage > 1) {
      const newNumber = this.state.currentPage - 1;
      this.setState({ currentPage: newNumber });
      await this.searchItems(this.state.query, newNumber, this.state.selectedResultType);
    }
  }

  /**
   * Navigate to the next page
   */
  private goToNextPage = async () => {
    if (this.state.currentPage < this.state.numberOfPages) {
      const newNumber = this.state.currentPage + 1;
      this.setState({ currentPage: newNumber });
      await this.searchItems(this.state.query, newNumber, this.state.selectedResultType);
    }
  }

  /**
   * Renders a single search result
   * 
   * @param result a result to render
   */
  private renderResult = (result: SearchResult) => {
    const indexOfSplitUrl = result.url.substring(0, -1).lastIndexOf("/");
    const firstPartUrl = result.url.substring(0, indexOfSplitUrl);
    const secondPartUrl = result.url.substring(indexOfSplitUrl);
    return (
      <div style={{
        borderBottom: "1px solid #aaa",
        paddingTop: "7px",
        paddingBottom: "7px",
        display: "flex",
        flexDirection: "row"
      }}>
        { result.placeholderImage ? <img alt={ strings.searchResultImage } style={{ alignSelf: "center" }} src={ result.imageUrl } width={ 120 } height={ 60 }/> : <img src={ result.imageUrl } width={ 120 } height={ 120 }/> }
        <div style={{ flexDirection: "column", display: "flex", marginLeft: "15px" }}>
          <p><a href={ result.url }> { result.title } </a></p>
          <p>{ result.summary }</p>
          <p>{ firstPartUrl }<strong>secondPartUrl</strong></p>
        </div>
      </div>
    );
  }

  /**
   * Runs when the search button is pressed
   */
  private onSearch = async () => {
    this.props.history.push(`/haku?search=${this.state.query}`);
    this.setState({ selectedResultType: "page", currentPage: 1 });
    await this.searchItems(this.state.query, 1, "page");
  }

  /**
   * Builds request params
   * 
   * @param query query
   * @param elasticKey Elasticsearch key
   * @param pageToLoad the page to load
   * @param selectedResultType the selected result type
   * @param mikkeliDomain Mikkeli main domain
   * @param oppiminenDomain Oppiminen domain
   */
  private buildRequestParams = (
      query: string,
      elasticKey: string, 
      pageToLoad: number, 
      selectedResultType: SearchResultType,
      mikkeliDomain: string,
      oppiminenDomain: string
  ) => ({
    method: "POST",
    body: JSON.stringify({
      page: {
        size: 5,
        current: pageToLoad
      },
      query,
      filters: {
        "all": [
          { "all": [
            { "base_url": (selectedResultType === "page" ? oppiminenDomain : mikkeliDomain) }, 
            { "type" : selectedResultType === "mikkeli" ? "page" : selectedResultType }
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
   * Translates a search result
   * 
   * @param result result to translate
   * @param placeholderImageUrl placeholder image url
   */
  private translateSearchResult = (result: any, placeholderImageUrl: string) => ({
    title: result.title.raw,
    url: result.url.raw,
    imageUrl: `${result.featured_media_url_thumbnail.raw || placeholderImageUrl}`,
    summary: result.excerpt.raw,
    date: this.formatDate(result.date.raw),
    placeholderImage: !result.featured_media_url_thumbnail.raw
  }); 

  /**
   * Searches items from the Elastic search
   * 
   * @param query query
   * @param pageToLoad the page to load
   * @param resultType the result type
   */
  private searchItems = async (query: string, pageToLoad: number, resultType: SearchResultType) => {
    const currentScript = document.scripts["bundle_script"];
    if (!currentScript || query == "") {
      return;
    }

    const url = currentScript.getAttribute('data-elastic-url');
    const key = currentScript.getAttribute('data-elastic-key');
    const oppiminenDomain = currentScript.getAttribute('data-oppiminen-domain');
    const mikkeliDomain = currentScript.getAttribute('data-mikkeli-domain');
    const placeholderImageUrl = currentScript.getAttribute('data-result-placeholder-image');

    if (!url || !key || !oppiminenDomain || !mikkeliDomain || !placeholderImageUrl) {
      return;
    }

    this.setState({ loading: true });
    const result = await fetch(url + "/search.json", this.buildRequestParams(
      query,
      key, 
      pageToLoad, 
      resultType, 
      mikkeliDomain, 
      oppiminenDomain
    ));

    const body = await result.json();
    const results = body.results.map((result: any) => this.translateSearchResult(result, placeholderImageUrl));

    this.setState({ results, numberOfPages: body.meta.page.total_pages, loading: false });
  }

  /**
   * Formats a date
   * 
   * @param datetime datetime to format
   */
  private formatDate = (datetime: string) => {
    const date = datetime.split("T")[0];
    const dateParts = date.split("-");
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  } 
}

export default SearchResultsPage;
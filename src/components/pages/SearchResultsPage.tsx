import { Button, Container, Link, TextField, Typography } from "@material-ui/core";
import React from "react";
import strings from "../../localization/strings";
import BasicLayout from "../BasicLayout";
import { History } from "history";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  query: string;
  lang: string;
  history: History;
}

interface State {
  results: SearchResult[];
  query: string;
  searchAgain: boolean;
  currentPage: number;
  numberOfPages: number;
  loading: boolean;
};

interface SearchResult {
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
  url: string;
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
      loading: false
    }
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    this.setState({ query: this.props.query });
    await this.searchItems(1);
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
              variant="outlined" 
            />
            <Button onClick={ this.onSearch } size="large" color="primary" variant="contained">{ strings.search }</Button>
            { this.state.loading ? this.renderLoader() : this.state.results.map(this.renderResult) }
            { this.renderPageNavigation() }
        </Container>
    </BasicLayout>
    );
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
      await this.searchItems(newNumber);
    }
  }

  /**
   * Navigate to the next page
   */
  private goToNextPage = async () => {
    if (this.state.currentPage < this.state.numberOfPages) {
      const newNumber = this.state.currentPage + 1;
      this.setState({ currentPage: newNumber });
      await this.searchItems(newNumber);
    }
  }

  /**
   * Renders a single search result
   * 
   * @param result a result to render
   */
  private renderResult = (result: SearchResult) => {
    return (
      <div style={{
        borderBottom: "1px solid #aaa",
        paddingTop: "7px",
        paddingBottom: "7px",
        display: "flex",
        flexDirection: "row"
      }}>
        <img src={ result.imageUrl } width={ 120 } height={ 120 }/>
        <div style={{ flexDirection: "column", display: "flex", marginLeft: "15px" }}>
          <p>{ result.date } - <a href={ result.url }> { result.title } </a></p>
          <p>{ result.summary }</p>
        </div>
      </div>
    );
  }

  /**
   * Runs when the search button is pressed
   */
  private onSearch = async () => {
    this.props.history.push(`/haku?search=${this.state.query}`);
    await this.searchItems(1);
  }

  /**
   * Builds request params
   * 
   * @param elasticKey Elasticsearch key
   * @param pageToLoad the page to load
   */
  private buildRequestParams = (elasticKey: string, pageToLoad: number) => ({
    method: "POST",
    body: JSON.stringify({
      page: {
        size: 5,
        current: pageToLoad
      },
      query: this.state.query
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
   */
  private translateSearchResult = (result: any) => ({
    title: result.title.raw,
    url: result.url.raw,
    imageUrl: `${result.featured_media_url.raw}`,
    summary: result.content.raw,
    date: this.formatDate(result.date.raw)
  }); 

  /**
   * Searches items from the Elastic search
   */
  private searchItems = async (pageToLoad: number) => {
    const currentScript = document.scripts["bundle_script"];
    if (!currentScript || this.props.query == "") {
      return;
    }
    const url = currentScript.getAttribute('data-elastic-url');
    const key = currentScript.getAttribute('data-elastic-key');
    if (!url || !key) {
      return;
    }

    this.setState({ loading: true });
    const result = await fetch(url + "/search.json", this.buildRequestParams(key, pageToLoad));

    const body = await result.json();
    const results = body.results.map(this.translateSearchResult);

    this.setState({ results, numberOfPages: body.meta.page.total_pages, loading: false });
  }

  /**
   * Formats date
   * @param datetime
   */
  private formatDate = (datetime: string) => {
    const date = datetime.split("T")[0];
    const dateParts = date.split("-");
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  } 
}

export default SearchResultsPage;



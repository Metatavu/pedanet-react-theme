import { Button, Container, Link, TextField, Typography } from "@material-ui/core";
import React from "react";
import strings from "../../localization/strings";
import BasicLayout from "../BasicLayout";
import { History } from "history";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import { throws } from "assert";


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
      numberOfPages: 1
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
            { this.state.results.map(this.renderResult) }
            { this.renderPagination() }
        </Container>
    </BasicLayout>
    );
  }

  private renderPagination = () => {
   const previousPageElement = this.renderPreviousPageLink();
   const nextPageElement = this.renderNextPageLink();
   return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", fontSize: "1.6rem", marginTop: "20px", marginBottom: "20px" }}>
      { previousPageElement } <span style={{ marginLeft: "10px", marginRight: "10px" }}>{ `${strings.page} ${this.state.currentPage}` }</span> { nextPageElement }
    </div>
   );
  }

  private renderPreviousPageLink = () => {
    if (this.state.currentPage > 1) {
      return <Link onClick={ this.lastPage } style={{ display: "flex", cursor: "pointer" }}><ArrowLeft/>{ strings.previousPage }</Link>;
    } else {
      return <span style={{display: "flex"}}><ArrowLeft/>{ strings.previousPage }</span>;
    }
  }

  private renderNextPageLink = () => {
    if (this.state.currentPage < this.state.numberOfPages) {
      return <Link onClick={ this.nextPage } style={{display: "flex", cursor: "pointer"}} color="primary">{ strings.nextPage }<ArrowRight/></Link>;
    } else {
      return <span style={{display: "flex"}}>{ strings.nextPage }<ArrowRight/></span>;
    }
  }

  private lastPage = async () => {
    if (this.state.currentPage > 1) {
      const newNumber = this.state.currentPage - 1;
      this.setState({ currentPage: newNumber });
      await this.searchItems(newNumber);
    }
  }

  private nextPage = async () => {
    if (this.state.currentPage < this.state.numberOfPages) {
      const newNumber = this.state.currentPage + 1;
      this.setState({ currentPage: newNumber });
      await this.searchItems(newNumber);
    }
  }

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

  private onSearch = async () => {
    this.props.history.push(`/haku?search=${this.state.query}`);
    await this.searchItems(1);
  }

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

    const result = await fetch(url + "/search.json", {
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
        'Authorization': `Bearer ${key}`
      }
    });

    const body = await result.json();
    const results = body.results.map((result: any) => ({
      title: result.title.raw,
      url: result.url.raw,
      imageUrl: `${result.featured_media_url.raw}`,
      summary: result.content.raw,
      date: this.formatDate(result.date.raw)
    }));

    this.setState({ results, numberOfPages: body.meta.page.total_pages });
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



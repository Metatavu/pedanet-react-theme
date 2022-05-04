import { Button, Container, TextField } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router-dom";
import strings from "../../localization/strings";
import BasicLayout from "../BasicLayout";
import { History } from "history";

interface Props {
  query: string;
  lang: string;
  history: History;
}

interface State {
  results: SearchResult[];
  query: string;
  searchAgain: boolean;
};

interface SearchResult {
  title: string;
  summary: string;
  imageUrl: string;
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
      searchAgain: false
    }
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    this.setState({ query: this.props.query });
  }

  /**
   * Component did update life-cycle handler
   */
  public componentDidUpdate = async (prevProps: Props) => {
    if (prevProps.query !== this.props.query) {
      this.setState({ query: this.props.query });

    }
  }
  
  /**this.setState({ searchAgain: true })
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
        </Container>
    </BasicLayout>
    );
  }

  private onSearch = () => {
    this.props.history.push(`/haku?search=${this.state.query}`);
  }

  /**
   * Searches items from the Elastic search
   */
  private searchItems = async () => {
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
        query: this.props.query
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    });

    const body = await result.json();
    console.log(body);
  }
}

export default SearchResultsPage;



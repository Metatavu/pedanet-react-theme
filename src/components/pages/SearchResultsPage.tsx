import { Container } from "@material-ui/core";
import React from "react";
import strings from "../../localization/strings";
import BasicLayout from "../BasicLayout";

interface Props {
  query: string;
  lang: string;
}

interface State {
  
};

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
  }

  /**
   * Component did mount life-cycle handler
   */
  public componentDidMount = async () => {
    await this.searchItems();
  }
  
  /**
   * Component render method
   */
  public render() {
    return (
      <BasicLayout lang={ this.props.lang }>
        <Container fixed>
            <h1>{ strings.searchPageTitle }</h1>
        </Container>
    </BasicLayout>
    );
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



import React from "react";

interface Props {
  query: string;
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
  public componentDidMount = () => {
  }
  
  /**
   * Component render method
   */
  public render() {
    return (
      <h1>{ this.props.query }</h1>
    );
  }

}

export default SearchResultsPage;



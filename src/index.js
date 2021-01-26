import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       lat: null,
  //       errorMessage: '',
  //     };
  //   }
  /**
   * We can use constructor to initialize state of a component OR
   * As shown below is also a valid statement
   * This line of code is translated internally by BABEL same as constructor above
   * state = {propertyName: initialValue};
   * NOTE: 'this' keyword is not used when you write as below
   */
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContentConditionally() {
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    return <Spinner message="Please allow location" />;
  }

  render() {
    return <div>{this.renderContentConditionally()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

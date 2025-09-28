import { Component } from "react";
import { Oval } from "react-loader-spinner";

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <Oval height={40} width={40} color="blue" ariaLabel="loading" />
      </div>
    );
  }
}

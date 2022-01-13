import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Searchbar extends Component {
  state = {
    inputValue: "",
  };
  handleInput = (event) => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputValue.trim() === "") {
      toast.error("Insert smth");
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

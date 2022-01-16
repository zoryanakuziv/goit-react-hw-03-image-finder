import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchbarStyled } from "./Searchbar.styled";
import { AiOutlineSearch } from "react-icons/ai";

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
      <SearchbarStyled>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <AiOutlineSearch stroke="grey" size={20} />
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
      </SearchbarStyled>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "../searchbar/Searchbar";
import ImageGallery from "../imageGallery/ImageGallery";
import "./App.css";

export default class App extends Component {
  state = {
    inputValue: "",
  };
  formSubmitHandler = (inputValue) => {
    this.setState({ inputValue });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery inputValue={this.state.inputValue} />
        <ToastContainer autoClose={5000} />
      </>
    );
  }
}

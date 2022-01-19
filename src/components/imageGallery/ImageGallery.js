import React, { Component } from "react";
import pixabayAPI from "../../api/PixabayApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import Loader from "../loader/Loader";
import GalleryErrorView from "../imageGalleryError/ImageGalleryError";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import { ListStyled } from "./ImageGallery.styled";

export default class ImageGallery extends Component {
  state = {
    status: "idle",
    images: [],
    error: null,
    page: 1,
    largeImageURL: "",
    showButton: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ images: [], page: 1 });
    }
    if (
      (prevProps.inputValue !== this.props.inputValue &&
        this.state.page === 1) ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: "pending" });
      this.fetchImages();
    }
    if (this.state.images.length - prevState.images.length === 12) {
      this.setState({ showButton: true });
    }
  }
  fetchImages = () => {
    pixabayAPI
      .getImages(this.props.inputValue, this.state.page)
      .then((images) => {
        if (images.hits.length === 0) {
          toast.error(
            `No results for "${this.props.inputValue}" . Please, enter something else.`
          );
          this.setState({ status: "idle" });
          return;
        } else if (images.hits.length < 12) {
          this.setState({ showButton: false });
          toast("No more results found");
        }
        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...images.hits],
            status: "resolved",
          };
        });
      })
      .catch((error) =>
        this.setState({
          status: "rejected",
          error: error.massege,
          page: 1,
          images: [],
        })
      )
      .finally(() => {
        this.scrollDown();
      });
  };

  onClickButton = () => {
    this.setState((state) => ({
      page: state.page + 1,
    }));
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ largeImageURL: null });
  };

  handleModalImage = (url) => {
    this.toggleModal();
    this.setState({ largeImageURL: url });
  };

  render() {
    const { images, status, showModal, showButton, largeImageURL } = this.state;

    if (status === "rejected") {
      return <GalleryErrorView />;
    }

    return (
      <>
        <ListStyled>
          {images?.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                modalImage={this.handleModalImage}
                largeImageURL={largeImageURL}
              />
            );
          })}
        </ListStyled>
        {showButton && <Button onClickButton={this.onClickButton} />}
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {status === "pending" && <Loader />}
      </>
    );
  }
}

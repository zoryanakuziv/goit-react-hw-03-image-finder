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
const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    error: null,
    page: 1,
    largeImageURL: "",
    showButton: true,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ images: [], page: 1 });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    this.setState({ status: Status.PENDING });
    setTimeout(() => {
      pixabayAPI
        .getImages(this.props.inputValue, this.state.page)
        .then((images) => {
          if (images.hits.length === 0) {
            this.setState({ showButton: false });
            toast.error(
              `No results for "${this.props.inputValue}" . Please, enter something else.`
            );
            this.setState({ status: Status.IDLE });
            return;
          } else if (images.hits.length !== 12) {
            toast("No more results found");
            this.setState({ showButton: false });
          }
          this.setState((prevState) => {
            return {
              images: [...prevState.images, ...images.hits],
              page: prevState.page + 1,
              status: Status.RESOLVED,
            };
          });
        })
        .catch((error) =>
          this.setState({
            status: Status.REJECTED,
            error: error.massege,
            page: 1,
            images: [],
          })
        )
        .finally(() => {
          this.scrollDown();
        });
    }, 3000);
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
    const { images, status, showModal, largeImageURL } = this.state;

    if (status === "idle") {
      return <div></div>;
    }

    if (status === "pending") {
      return <Loader />;
    }

    if (status === "rejected") {
      return <GalleryErrorView />;
    }

    if (status === "resolved") {
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
          <Button onClickButton={this.fetchImages} />
          {showModal && (
            <Modal onCloseModal={this.toggleModal}>
              <img src={largeImageURL} alt="" />
            </Modal>
          )}
        </>
      );
    }
  }
}

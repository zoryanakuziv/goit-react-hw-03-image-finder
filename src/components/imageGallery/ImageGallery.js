import React, { Component } from "react";
import pixabayAPI from "../../api/PixabayApi";

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    loading: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      setTimeout(() => {
        pixabayAPI
          .getImages(this.props.inputValue)
          .then((response) =>
            this.setState((state) => {
              return { images: [...state.images, ...response.hits] };
            })
          )
          .catch((error) => this.setState({ error }));
      }, 3000);
    }
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <ul>
          {images?.map(({ id, webformatURL }) => {
            return <li key={id} url={webformatURL} />;
          })}
        </ul>
      </div>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import { Item } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ url, modalImage, largeImageURL }) => {
  return (
    <Item>
      <img
        src={url}
        alt=""
        data-url={largeImageURL}
        onClick={() => modalImage(largeImageURL)}
        //className={styles.ImageGalleryItemImage}
        //data-source={largeImageURL}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  modalImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

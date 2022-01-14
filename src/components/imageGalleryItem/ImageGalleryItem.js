import React from "react";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ url, modalImage, largeImageURL }) => {
  return (
    <li>
      <img
        src={url}
        alt=""
        data-url={largeImageURL}
        onClick={() => modalImage(largeImageURL)}
        //className={styles.ImageGalleryItemImage}
        //data-source={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  modalImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

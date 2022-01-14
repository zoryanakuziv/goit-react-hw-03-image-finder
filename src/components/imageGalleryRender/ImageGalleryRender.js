import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
export default function RenderGalleryList(images) {
  return (
    <div>
      <ul>
        {images?.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              largeImageURL={largeImageURL}
              onClickImg={this.props.onClickImg}
            />
          );
        })}
      </ul>
    </div>
  );
}

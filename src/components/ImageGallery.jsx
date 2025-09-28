import { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";

export default class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <ul className="gallery">
        {images.map(({ id, images }) => (
          <ImageGalleryItem
            key={id}
            small={images.downsized_medium.url}
          />
        ))}
      </ul>
    );
  }
}

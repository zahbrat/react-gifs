import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import Modal from "./Modal";

const PER_PAGE = 8;

export default class App extends Component {
  state = {
    out: false,
    query: "",
    images: [],
    page: 0,
    isLoading: false,
    showModal: false,
    largeImageURL: "",
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ isLoading: true });

    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=24yveDJTIJujJcNLwbbXve0VNis9r4X0&q=${query}&limit=${PER_PAGE}&offset=${
          page * PER_PAGE
        }`
      );
      const data = await res.json();
      console.log(data);

      this.setState((prev) => ({
        images: [...prev.images, ...data.data],
        out: data.pagination.total_count <= (page + 1) * PER_PAGE, // чи ще є дані?
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 0, images: [], out: false }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }), this.fetchImages);
  };

  openModal = (url) => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, out } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && !out && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

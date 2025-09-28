import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import Modal from "./Modal";

const PER_PAGE = 12;

export default class App extends Component {
  state = {
    out: false,
    query: "",
    images: [],
    page: 1,
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
        "https://api.giphy.com/v1/gifs/search/?api_key=24yveDJTIJujJcNLwbbXve0VNis9r4X0&q="+query
      );
      const data = await res.json();
      console.log(data);

      this.setState((prev) => ({
        images: [...prev.images, ...data.data],
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  handleLoadMore = () => {
    if (this.state.images.length < PER_PAGE) {
      this.setState({out: true})
    } else {
      this.setState((prev) => ({ page: prev.page + 1 }), this.fetchImages);
    }
  };

  openModal = (url) => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} out={this.state.out} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

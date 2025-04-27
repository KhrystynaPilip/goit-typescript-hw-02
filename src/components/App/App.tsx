import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { fetchImagesByQuery } from "../../unsplash-api";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { ImageDataType } from "../../commonTypes";
import React from "react";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [images, setImages] = useState<ImageDataType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageDataType | null>(
    null
  );
  const galleryRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (newQuery: string) => {
    const trimmedQuery = newQuery.trim();
    if (!trimmedQuery) return;

    setQuery(trimmedQuery);
    setPage(1);
    setImages([]);
    setSubmittedQuery(trimmedQuery);
  };

  useEffect(() => {
    if (!submittedQuery) return;

    const fetchImages = async () => {
      try {
        setError(false);
        setLoader(true);

        const { results, total, total_pages } = await fetchImagesByQuery(
          submittedQuery,
          page
        );

        if (total === 0) {
          toast("Nothing found", {
            duration: 3000,
            icon: <AiOutlineInfoCircle size={24} />,
          });
          setLoadMoreBtn(false);
          return;
        }

        setImages((prevImages) =>
          page === 1 ? results : [...prevImages, ...results]
        );

        if (page === total_pages) {
          toast("End of collection", {
            duration: 3000,
            icon: <AiOutlineInfoCircle size={24} />,
          });
          setLoadMoreBtn(false);
        } else {
          setLoadMoreBtn(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchImages();
  }, [submittedQuery, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onOpenModal = (image: ImageDataType) => {
    setImageModal(true);
    setSelectedImage(image);
  };

  const onCloseModal = () => {
    setImageModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (page > 1 && galleryRef.current?.children.length) {
      setTimeout(() => {
        const firstChild = galleryRef.current?.children[0] as HTMLElement;
        const { height } = firstChild.getBoundingClientRect();
        window.scrollBy({ top: height * 2.1, behavior: "smooth" });
      }, 100);
    }
  }, [images]);

  return (
    <>
      <SearchBar
        onSubmit={handleSearchSubmit}
        value={query}
        onChange={handleInputChange}
        ref={inputRef}
      />

      {error && <ErrorMessage />}

      {images.length > 0 && (
        <ImageGallery items={images} onModal={onOpenModal} ref={galleryRef} />
      )}

      {loadMoreBtn && images.length > 0 && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      {loader && <Loader />}
      {selectedImage && (
        <ImageModal
          isOpen={imageModal}
          onClose={onCloseModal}
          image={selectedImage}
        />
      )}

      <Toaster />
    </>
  );
}

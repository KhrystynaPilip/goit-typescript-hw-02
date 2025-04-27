import React, { FC, forwardRef, RefObject } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageDataType } from "../../commonTypes";

interface ImageGalleryProps {
  items: ImageDataType[];
  onModal: (image: ImageDataType) => void;
}

const ImageGallery = forwardRef<HTMLUListElement, ImageGalleryProps>(
  ({ items, onModal }, ref) => {
    return (
      <ul className={css.list} ref={ref}>
        {items.map((item) => (
          <li
            className={css.listItem}
            key={item.id}
            onClick={() => onModal(item)}
          >
            <ImageCard image={item} />
          </li>
        ))}
      </ul>
    );
  }
);

export default ImageGallery;

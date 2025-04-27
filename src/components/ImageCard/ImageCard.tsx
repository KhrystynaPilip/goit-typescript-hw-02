// import React from "react";
// import { JSX } from "react";
import React, { FC } from "react";
import { ImageDataType } from "../../commonTypes";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: ImageDataType;
}

const ImageCard: FC<ImageCardProps> = ({ image }) => {
  return (
    <div>
      <img className={css.img} src={image.urls.small} alt={image.description} />
    </div>
  );
};

export default ImageCard;

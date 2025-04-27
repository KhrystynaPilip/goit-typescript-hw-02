import { IoDownloadOutline } from "react-icons/io5";
import { getDownloadLink } from "../../unsplash-api";
import Modal from "react-modal";
import React, { FC, useEffect, useState } from "react";
import css from "./ImageModal.module.css";
import { ImageDataType } from "../../commonTypes";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageDataType;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchDownloadLink() {
      if (image && image.links.download_location) {
        setIsLoading(true);
        try {
          const link = await getDownloadLink(image.links.download_location);
          setDownloadLink(link);
        } catch (error) {
          toast.error("Something went wrong, try again", { duration: 3000 });
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchDownloadLink();
  }, [image]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={css.modalContent}
      overlayClassName={{
        base: css.modalOverlay,
        afterOpen: css.modalOverlayAfterOpen,
        beforeClose: css.modalOverlayBeforeClose,
      }}
      closeTimeoutMS={500}
    >
      {isOpen && (
        <>
          <img
            src={image.urls.regular}
            alt={image.description}
            className={css.modalImg}
          />
          <div className={css.imgInfoWrapper}>
            <p>{image.user.name}</p>

            {isLoading ? (
              <button className={css.downloadButton} disabled>
                <span className={css.spinner}></span>
                Loading ...
              </button>
            ) : (
              <a
                className={css.downloadLink}
                href={downloadLink}
                download={image.description || "downloaded-image"}
              >
                <IoDownloadOutline size={24} />
              </a>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;

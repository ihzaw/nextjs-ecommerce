"use client";

import ModalPreview from "./ModalPreview";

interface ItemCardProps {
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  btnOnClick?: () => void;
  buttonText: string;
  price: string;
  fullDescription: string;
}

const ItemCard = (props: ItemCardProps) => {
  const {
    imageUrl,
    alt,
    title,
    description,
    btnOnClick,
    buttonText,
    price,
    fullDescription,
  } = props;

  const openModal = () => {
    const modal = document.getElementById(
      `modal_${title.trim()}`
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Dialog element not found");
    }
  };

  return (
    <>
      <div
        onClick={() => openModal()}
        className="card bg-base-100 shadow-xl cursor-pointer"
      >
        <figure className="max-h-48">
          <img src={imageUrl} alt={alt} className="object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={btnOnClick}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <ModalPreview
        id={`modal_${title.trim()}`}
        title={title}
        imageUrl={imageUrl}
        alt={alt}
        description={description}
        price={price}
        fullDescription={fullDescription}
      />
    </>
  );
};

export default ItemCard;

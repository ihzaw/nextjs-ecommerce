"use client"

import { useContext, useEffect, useState } from "react";
import useLocalStorageListener from "../hooks/useLocalStorageListener";
import ModalPreview from "./ModalPreview";
import { LoginContext } from "../providers/LoginProvider";

interface ItemCardProps {
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  btnOnClick?: () => void;
  buttonText: string;
  price: string;
  fullDescription: string;
  id: string;
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
    id
  } = props;

  const { isLoggedIn } = useContext(LoginContext)
  
  const openModal = () => {
    const modal = document.getElementById(
      `modal_${id}`
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
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
        id={`modal_${id}`}
        title={title}
        imageUrl={imageUrl}
        alt={alt}
        description={description}
        price={price}
        fullDescription={fullDescription}
        isLoggedIn={isLoggedIn}
        itemId={id}
      />
    </>
  );
};

export default ItemCard;

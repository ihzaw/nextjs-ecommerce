import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { paymentMethods } from "../constants";
import { orderApi } from "../api";
import { Loader } from "react-feather";
import { Bounce, toast } from "react-toastify";
import { LoginContext } from "../providers/LoginProvider";

interface ModalPreviewProps {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
  description: string;
  fullDescription: string;
  price: string;
  isLoggedIn: boolean;
  itemId: string;
}

const ModalPreview = (props: ModalPreviewProps) => {
  const {
    id,
    title,
    imageUrl,
    alt,
    price,
    fullDescription,
    isLoggedIn,
    itemId,
  } = props;

  const {
    notify
  } = useContext(LoginContext)

  const modalRef: RefObject<HTMLDialogElement> = useRef(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    total: Number(price),
    paymentMethod: "",
  });
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [isErrorCheckout, setIsErrorCheckout] = useState(false);

  const resetModal = () => {
    setCheckoutForm({
      total: Number(price),
      paymentMethod: "",
    });
    setIsCheckout(false);
  };

  const closeModal = (): void => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleCheckout = () => {
    setIsLoadingCheckout(true);
    setIsErrorCheckout(false);
    const payload = {
      user: JSON.parse(localStorage.getItem("user") ?? "").id.toString(),
      product: itemId.toString(),
      payment_method: checkoutForm.paymentMethod,
      total: checkoutForm.total,
    };
    const user: UserInterface | null = JSON.parse(
      localStorage.getItem("user") ?? ""
    );
    fetch(orderApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beare ${user?.access}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          setIsErrorCheckout(true);
          return;
        }

        resetModal();
        closeModal();
        notify('Your order is made !')
      })
      .catch((e) => {
        setIsErrorCheckout(true);
      })
      .finally(() => {
        setIsLoadingCheckout(false);
      });
  };

  const CheckoutButton = () => {
    return (
      <div className="flex justify-end">
        {isLoggedIn ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsCheckout(true)}
          >
            Checkout
          </button>
        ) : (
          <div
            className="tooltip tooltip-left z-50"
            data-tip="You must log in before you can make a purchase"
          >
            <button className="btn btn-primary" disabled={!isLoggedIn}>
              Checkout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <dialog id={id} ref={modalRef} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="grid grid-cols-2">
          <div className="flex items-center">
            <figure>
              <img src={imageUrl} alt={alt} className="object-cover" />
            </figure>
          </div>

          <div className="flex flex-col h-full">
            <p className="text-4xl font-weight-bold mb-3 px-8 pt-8">{title}</p>
            <div className="divider mb-3 px-8"></div>
            <p className="mb-3 px-8">{fullDescription}</p>

            {isCheckout ? (
              <div className="px-8 min-h-48">
                <div className="divider mb-3"></div>
                <div className="text-2xl font-weight-bold mb-2 underline">
                  Order Summary
                </div>
                <div className="grid grid-cols-2 mb-1">
                  <div className="font-weight-bold">Delivery</div>
                  <div className="text-right italic">Free</div>
                </div>
                <div className="grid grid-cols-2 mb-2">
                  <div className="font-weight-bold">Total</div>
                  <div className="text-right">
                    {Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                      .format(Number(price))
                      .replace(/,00$/, "")}
                  </div>
                </div>
                <div className="font-weight-bold mb-1">Payment Method</div>
                <div className="mb-3">
                  {paymentMethods.map((method) => {
                    return (
                      <div className="form-control" key={method.value}>
                        <label className="label cursor-pointer">
                          <span className="label-text">{method.label}</span>
                          <input
                            type="radio"
                            className="radio checked:bg-red-500"
                            checked={
                              checkoutForm.paymentMethod === method.value
                            }
                            onClick={() =>
                              setCheckoutForm({
                                ...checkoutForm,
                                paymentMethod: method.value,
                              })
                            }
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
                {isErrorCheckout && (
                  <div className="flex justify-end mb-5 w-full">
                    <p className="text-red-500 text-right text-wrap">
                      Something went wrong, <br /> Please try again
                    </p>
                  </div>
                )}
                <button
                  className="btn btn-primary w-full"
                  onClick={handleCheckout}
                  disabled={
                    !checkoutForm.total ||
                    !checkoutForm.paymentMethod ||
                    isLoadingCheckout
                  }
                >
                  {isLoadingCheckout ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Finish Payment"
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-1 flex-grow justify-end items-end">
                <div className="flex flex-col justify-end">
                  <p className="mb-3 text-2xl">
                    {Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                      .format(Number(price))
                      .replace(/,00$/, "")}
                  </p>
                  <CheckoutButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalPreview;

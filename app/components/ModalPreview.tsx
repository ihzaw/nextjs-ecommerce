interface ModalPreviewProps {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
  description: string;
  fullDescription: string;
  price: string;
}

const ModalPreview = (props: ModalPreviewProps) => {
  const { id, title, imageUrl, alt, description, price, fullDescription } = props;

  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="grid grid-cols-2">
          <div>
            <figure>
              <img src={imageUrl} alt={alt} className="object-cover" />
            </figure>
          </div>
          <div className="flex flex-col h-full">
            <p className="text-4xl font-weight-bold mb-3 px-8 pt-8">{title}</p>
            <div className="divider mb-3p px-8"></div>
            <p className="mb-3 px-8">{fullDescription}</p>
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
                <div className="flex justify-end">
                  <button className="btn btn-primary">Checkout</button>
                </div>
              </div>
            </div>
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

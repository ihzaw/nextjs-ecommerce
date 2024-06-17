"use client";

interface PictureViewerProps {
  id: string;
  pictureUrl: string;
  name: string;
}

const PictureViewer = (props: PictureViewerProps) => {
  const { id, pictureUrl, name } = props;

  const openModal = (id: string) => {
    const modal = document.getElementById(`modal_${id}`) as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="avatar" onClick={() => openModal(id)}>
        <div className="mask mask-squircle w-12 h-12">
          <img src={pictureUrl} alt={name} className="cursor-pointer" />
        </div>
      </div>
      <dialog id={`modal_${id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <figure>
            <img
              src={pictureUrl}
              alt={name}
              className="object-cover"
            />
          </figure>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default PictureViewer;

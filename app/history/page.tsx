"use client"

import { ordersHistoryApi } from "../api";
import formatDate from "../utils/formatDate";

async function getData() {
  const res = await fetch(ordersHistoryApi);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function History() {
  const ordersHistory: OrderHistory[] = await getData();

  const openModal = (id: string) => {
    console.log('id :', id)
    const modal = document.getElementById(
      `modal_${id}`
    ) as HTMLDialogElement;

    console.log('modal L', modal)
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">hey</div>
      <div className="overflow-x-auto col-span-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Ordered at</th>
              <th>Payment Method</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {ordersHistory.map((order) => {
              return (
                <>
                  <tr key={order.id}>
                    <td >
                      <div className="flex items-center gap-3">
                        <div className="avatar" onClick={() => openModal(order.id.toString())}>
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={order.product.picture_url}
                              alt={order.product.name}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{order.product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.payment_method}</td>
                    <td className="font-weight-bold italic">
                      {Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(Number(order.total))
                        .replace(/,00$/, "")}
                    </td>
                  </tr>
                  <dialog id={`modal_${order.id}`} className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <figure>
                        <img
                          src={order.product.picture_url}
                          alt={order.product.name}
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

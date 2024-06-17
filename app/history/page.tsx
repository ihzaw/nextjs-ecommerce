"use client";

import Link from "next/link";
import { ordersHistoryApi } from "../api";
import formatDate from "../utils/formatDate";
import PictureViewer from "../components/PictureViewer";
import { useEffect, useState } from "react";
import { Loader } from "react-feather";

async function getData() {
  const res = await fetch(ordersHistoryApi);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function History() {
  // const ordersHistory: OrderHistory[] = await getData();
  const [ordersHistory, setOrdersHistory] = useState<OrderHistory[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [isErrorHistory, setIsErrorHistory] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingHistory(true);
    setIsErrorHistory(false);
    fetch(ordersHistoryApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          setIsErrorHistory(true);
          return;
        }
        console.log(response)
        const data: OrderHistory[] = await response.json();

        setOrdersHistory(data);
      })
      .catch((e) => {
        setIsErrorHistory(true);
      })
      .finally(() => {
        setIsLoadingHistory(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-5">
      <div className="overflow-x-auto col-span-5 px-9">
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
          {isErrorHistory && (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <div className="min-h-96 flex justify-center items-center">
                    <div>
                      <p className="text-red-500 text-right text-wrap">
                        Something went wrong, <br /> Please try again
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          {isLoadingHistory && (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <div className="min-h-96 flex justify-center items-center">
                    <div>
                      <Loader className="animate-spin" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          {ordersHistory.length < 1 && (!isLoadingHistory || !isErrorHistory) ? (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <div className="min-h-96 flex justify-center items-center">
                    <div>
                      <p className="mb-3">You haven't made any orders yet</p>
                      <div className="flex justify-center">
                        <Link href="/" className="btn btn-primary btn-sm">
                          Make Order
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {ordersHistory.map((order) => {
                return (
                  <>
                    <tr key={order.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <PictureViewer
                            id={order.id.toString()}
                            pictureUrl={order.product.picture_url}
                            name={order.product.name}
                          />
                          <div>
                            <div className="font-bold">
                              {order.product.name}
                            </div>
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
                  </>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

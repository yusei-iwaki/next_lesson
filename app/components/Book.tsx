"use client";

import Image from "next/image";
import { ItemType, User } from "../types/types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ItemProps = {
  item: ItemType;
  isPurchased: boolean;
};

// eslint-disable-next-line react/display-name
const Book = ({ item, isPurchased }: ItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User;
  const router = useRouter();

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: item.title,
            price: item.price,
            userId: user?.id,
            bookId: item.id,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleCansel = () => {
    setShowModal(false);
  };

  const handlePurchaseClick = () => {
    if (isPurchased) {
      alert(`${item.title}は既に購入済みです`);
    } else {
      setShowModal(true);
    }
  };

  const handlePurcahseConfirm = () => {
    if (!user) {
      setShowModal(false);
      // ログインページへリダイレクト
      router.push("/login");
    } else {
      // Stripeで決済する
      startCheckout();
    }
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={item.thumbnail.url}
            alt={item.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この本は○○...</p>
            <p className="mt-2 text-md text-slate-700">値段：{item.price}円</p>
          </div>
        </a>

        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button
                onClick={handlePurcahseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCansel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;

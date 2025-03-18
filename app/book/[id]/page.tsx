import { getDetailContent } from "@/app/lib/microcms/client";
import { get } from "http";
import Image from "next/image";
import React from "react";

const DetailBook = async ({ params }: { params: { id: string } }) => {
  const book = await getDetailContent(params.id);
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={book.thumbnail.url}
          alt={book.title}
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              公開日:{new Date(book.publishedAt as any).toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-500">
              最終更新:{new Date(book.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;

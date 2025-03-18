// "use client";

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllContents } from "./lib/microcms/client";
import { ItemType } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";
import { User } from "./types/types";
import { Purchase } from "./types/types";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllContents();
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchaseBookIds: string[];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" }
    );
    const purchasesData = await response.json();
    // console.log(purchasesData);

    purchaseBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );
    // console.log(purchaseBookIds);
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Item Commerce
        </h2>
        {contents.map((content: ItemType) => (
          <Book
            key={content.id}
            item={content}
            isPurchased={purchaseBookIds.includes(content.id)}
          />
        ))}
      </main>
    </>
  );
}

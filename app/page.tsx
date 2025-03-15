// "use client";

import Book from "./components/Book";
import { getAllContents } from "./lib/microcms/client";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllContents();
  console.log(contents);

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((content) => (
          <Book key={content.id} item={content} />
        ))}
      </main>
    </>
  );
}

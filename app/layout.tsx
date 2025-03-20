import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NextAuthProviders } from "./lib/next-auth/provider";
import { Suspense } from "react";
import Loading from "./loading";

// Noto Sans JP
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "next_lesson",
  description: "next_lesson_app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <NextAuthProviders>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextAuthProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata: Metadata = {
  title: {
    template: "%s / Seoul Capsule Hotel",
    default: "Welcome / Enjoy your stay",
  },
  description:
    "Welcome to our capsule hotel! We are exclusively for foreigners and take dollars only!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

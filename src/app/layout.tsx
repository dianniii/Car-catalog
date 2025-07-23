import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";


export const metadata: Metadata = {
  title: "Car catalog",
  description: "Viewing the car catalog.",
};


const inter = Inter({ subsets: ["latin"] }); 

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className="bg-white">
        <body
          className={`${inter.className} min-h-screen flex flex-col`}
        >
        <Header />
        <main className="flex-1">
          <div className="mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

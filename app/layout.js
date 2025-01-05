import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CRUD - Next Js, Prisma, Postgress",
  description: "CRUD - Next Js, Prisma, Postgress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        {/* Navbar section */}
        <header className="">
          <Header />
        </header>
        {/* Main Section */}
        <main className="min-h-screen my-20 container mx-auto">{children}</main>
        <Toaster richColors />
        {/* Footer Section */}
        <footer className="mx-auto py-4 text-center text-gray-600 bg-blue-200">
          <p>Made in love by coder jk</p>
          <p>All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}

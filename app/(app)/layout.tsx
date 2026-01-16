import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {/* SCROLL AREA */}
      <main className="h-[calc(100vh-64px)] overflow-y-auto bg-gray-50 pb-24 hide-scrollbar">
        {children}
        <Toaster position="top-right" />
      </main>

      <Footer />
    </>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ScrollRestoration } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 font-sans selection:bg-primary selection:text-white">
      {/* ScrollRestoration: এক পেজ থেকে অন্য পেজে গেলে অটোমেটিক স্ক্রল উপরে নিয়ে যাবে */}
      <ScrollRestoration />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 shadow-sm border-b border-base-300">
        <Navbar />
      </header>

      {/* Main Content Area */}
      {/* min-h-[calc(100vh-something)] নিশ্চিত করবে ফুটার সবসময় নিচে থাকবে */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

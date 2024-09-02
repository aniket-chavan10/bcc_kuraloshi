import React from "react";
import Navbar from "../components/Navbar";
import NewsDetails from "../components/NewsDetails";
import Footer from "../components/Footer";

function NewsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {" "}
        {/* Ensure the content takes up the full height */}
        <NewsDetails />
      </div>
      <Footer />
    </>
  );
}

export default NewsPage;

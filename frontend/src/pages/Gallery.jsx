import React from "react";
import Navbar from "../components/Navbar";
import AllGallery from "../components/AllGallery";
import Footer from "../components/Footer";

function Gallery() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <AllGallery />
      </div>
      <Footer />
    </>
  );
}

export default Gallery;

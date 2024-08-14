import React from "react";
import Navbar from "../components/Navbar";
import GalleryDetails from "../components/GalleryDetails";
import Footer from "../components/Footer";

function Gallery() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
      <GalleryDetails />
      </div>
      <Footer />
    </>
  );
}

export default Gallery;

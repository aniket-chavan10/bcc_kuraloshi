import React from "react";
import Fixtures from "../components/Fixtures";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Schedule() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
      <Fixtures />
      </div>
      <Footer />
    </>
  );
}

export default Schedule;

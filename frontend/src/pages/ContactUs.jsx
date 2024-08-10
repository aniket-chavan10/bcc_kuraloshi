import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { submitContactForm } from "../services/api"; // Update this path based on where you place your API functions

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });

  const [statusMessage, setStatusMessage] = useState({
    type: "",
    message: ""
  });

  useEffect(() => {
    gsap.fromTo(
      ".contact-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".form-element",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.2,
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await submitContactForm(formData);
      console.log("Form submitted successfully:", response);
      setStatusMessage({
        type: "success",
        message: "Your message has been sent successfully!"
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage({
        type: "error",
        message: "There was an error submitting your message. Please try again."
      });
    }
  
    // Reset form after submission
    setFormData({
      name: "",
      mobile: "",
      email: "",
      message: ""
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto md:mt-24 mt-16 mb-10 p-8 bg-white max-w-xl shadow-lg rounded-lg contact-container">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4 form-element">
          Contact Us
        </h1>
        <h2 className="text-gray-600 text-center mb-6 form-element">We'd love to hear from you</h2>
        <form onSubmit={handleSubmit} className="space-y-6 form-element">
          <div className="form-element">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 bg-gray-100 outline-none rounded-lg"
              placeholder="Your Name"
            />
          </div>
          <div className="form-element">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 bg-gray-100 outline-none rounded-lg"
              placeholder="Mobile Number"
            />
          </div>
          <div className="form-element">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 bg-gray-100 outline-none rounded-lg"
              placeholder="Email Address"
            />
          </div>
          <div className="form-element">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 bg-gray-100 outline-none rounded-lg"
              rows="5"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="text-center form-element">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
        {statusMessage.message && (
          <div className={`mt-6 text-center p-4 ${statusMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-md form-element`}>
            {statusMessage.message}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

import React, { useState } from "react";
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
      <div className="container mx-auto md:mt-24 mt-16 mb-10 p-8 bg-gradient-to-br from-amber-500 to-orange-600 max-w-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-50">
          Send a message
        </h1>
        <h2 className="text-gray-100">For all enquiries & feedback, please use the form below</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-1 bg-gray-50 outline-none"
              placeholder="Name"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-1 bg-gray-50 outline-none"
              placeholder="Mobile Number"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-1 bg-gray-50 outline-none"
              placeholder="Email Address"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-1 bg-gray-50 outline-none"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-white text-orange-500 font-semibold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              SUBMIT
            </button>
          </div>
        </form>
        {statusMessage.message && (
          <div className={`mt-6 text-center p-4 ${statusMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-md`}>
            {statusMessage.message}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

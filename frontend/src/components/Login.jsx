import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api"; // Adjust the path as needed
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { gsap } from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState({
    type: "",
    message: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(
      ".login-container",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      setStatusMessage({
        type: "success",
        message: "Login successful! Redirecting to the dashboard..."
      });
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1500); // Redirect after showing the success message
    } catch (err) {
      console.error("Login error:", err);
      setStatusMessage({
        type: "error",
        message: "Invalid admin credentials. Please try again."
      });
    }

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto md:mt-24 mt-16 mb-10 p-8 bg-white max-w-xl shadow-lg rounded-lg login-container">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4 form-element">
          Admin Login
        </h1>
        <h2 className="text-gray-600 text-center mb-6 form-element">
          Please enter your credentials
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 form-element">
          <div className="form-element">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-3 bg-gray-100 outline-none rounded-lg"
            />
          </div>
          <div className="form-element">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 bg-gray-100 outline-none rounded-lg"
            />
          </div>
          <div className="text-center form-element">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        {statusMessage.message && (
          <div
            className={`mt-6 text-center p-4 ${statusMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              } rounded-md form-element`}
          >
            {statusMessage.message}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;

// src/SignupForm.js
import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate

const SignupForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" })); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    setLoading(true); // Set loading to true

    try {
      // Validate form data
      await schema.parseAsync(formData);
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setFormData({ username: "", email: "", password: "" }); // Reset form

      // Redirect to the login page after a successful signup
      navigate("/login"); // Use navigate to redirect
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrorMessages(fieldErrors);
      } else {
        setErrorMessages({ api: error.message });
      }
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errorMessages.username ? "border-red-500" : ""
            }`}
          />
          {errorMessages.username && (
            <div className="text-red-500 text-xs">{errorMessages.username}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errorMessages.email ? "border-red-500" : ""
            }`}
          />
          {errorMessages.email && (
            <div className="text-red-500 text-xs">{errorMessages.email}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errorMessages.password ? "border-red-500" : ""
            }`}
          />
          {errorMessages.password && (
            <div className="text-red-500 text-xs">{errorMessages.password}</div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text */}
          </button>
        </div>
        <div className="mt-4">
          {errorMessages.api && (
            <div className="text-red-500">{errorMessages.api}</div>
          )}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}
        </div>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium ">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignupForm;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Client",
    university: "",
    companyName: "",
    isCompany: false,
    currentCompany: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Registration successful!");
      setLoading(false);
      setTimeout(() => {
        navigate("/feed");
      }, 2000);
    } catch (error) {
      toast.error("Error registering user: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Client">Client</option>
            <option value="Alumni">Alumni</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {formData.role === "Client" && (
          <div className="mb-4">
            <label className="block text-gray-700">
              Are you an Individual or a Company?
            </label>
            <select
              name="isCompany"
              value={formData.isCompany ? "Company" : "Individual"}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "isCompany",
                    value: e.target.value === "Company",
                  },
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
          </div>
        )}

        {formData.role === "Client" && (
          <div className="mb-4">
            <label className="block text-gray-700">
              {formData.isCompany ? "Company Name" : "Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.isCompany ? formData.companyName : formData.name}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: formData.isCompany ? "companyName" : "name",
                    value: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {(formData.role === "Student" || formData.role === "Alumni") && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {(formData.role === "Student" || formData.role === "Alumni") && (
          <div className="mb-4">
            <label className="block text-gray-700">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {formData.role === "Alumni" && (
          <div className="mb-4">
            <label className="block text-gray-700">Current Company Name</label>
            <input
              type="text"
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

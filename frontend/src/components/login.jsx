import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import tru from "../assets/tru2.jpg";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("FormData before submit:", formData);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
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

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/feed");
      }, 1200);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error logging in: " +
          (error.response ? error.response.data.message : error.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* ToastContainer to display notifications */}
      <ToastContainer />

      {/* Left Section with background image */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#0a0f29",
          backgroundImage: `url(${tru})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      {/* Right Section with Form */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          padding: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
          For the purpose of safety, your details need to be filled again.
        </Typography>

        {/* Form starts here */}
        <Box
          sx={{ width: "100%", maxWidth: "400px" }}
          component="form"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <TextField
            label="College Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            }}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            }}
          />

          {/* Submit Button with Loader */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#007bff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Save & Continue"
            )}
          </Button>
        </Box>

        {/* Register prompt */}
        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center", color: "#ffffff" }}
        >
          Don't have an account?{" "}
          <Link to="/role" style={{ color: "#007bff" }}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;

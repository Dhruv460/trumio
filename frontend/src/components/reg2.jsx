import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import tru from "../assets/tru2.jpg";
import axios from "axios"; // Import axios
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CompleteProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    linkedInUrl: "",
    password: "",
    confirmPassword: "",
    role: "",
    University: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (location.state && location.state.role) {
      setFormData((prev) => ({
        ...prev,
        role: location.state.role,
      }));
    }
  }, [location.state]);

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
      }, 3000);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error registering user: " +
          (error.response ? error.response.data.message : error.message)
      );
      setLoading(false);
    }
  };
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          Complete Your Profile!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
          For the purpose of better user experience, your details are required.
        </Typography>

        <Box
          sx={{ width: "100%", maxWidth: "400px" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="name"
            name="name"
            value={formData.name}
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
          <TextField
            label="LinkedIn URL"
            name="linkedInUrl"
            value={formData.linkedInUrl}
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
          <TextField
            label="University"
            name="University"
            value={formData.University}
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
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

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#007bff" }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving... " : "Save & Continue"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CompleteProfilePage;

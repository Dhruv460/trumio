import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import tru from "../assets/tru2.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompleteProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allowedDomainExtensions = [
    ".com",
    ".in",
    ".edu",
    ".org",
    ".net",
    ".gov",
  ];
  const [domainError, setDomainError] = useState("");

  const isValidDomainExtension = (email) => {
    return allowedDomainExtensions.some((extension) =>
      email.endsWith(extension)
    );
  };

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    linkedInUrl: "",
    role: "",
    university: "",
  });
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (event) => {
    const emailInput = event.target.value;
    setFormData({ ...formData, email: emailInput });

    if (!isValidDomainExtension(emailInput)) {
      setDomainError("Email domain extension is not allowed");
    } else {
      setDomainError("");
    }
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the third page with the current form data
    navigate("/reg_3", { state: { formData } });
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
            label="username"
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
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
            error={!!domainError}
            helperText={domainError}
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
            label="university"
            name="university"
            value={formData.university}
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
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CompleteProfilePage;

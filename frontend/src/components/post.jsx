import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tru from "../assets/tru2.jpg";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const PostProject = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    deadline: "",
    duration: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.image && formData.image.size > 2000000) {
      toast.error("Project image must be less than 2MB.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/projects/create",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Posted successfully!");
      setLoading(false);
      navigate("/feed");
    } catch (error) {
      toast.error(
        "Error posting project: " +
          (error.response?.data?.message || "An error occurred")
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
          Post a New Project
        </Typography>
        <Box
          sx={{ width: "100%", maxWidth: "400px" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Project Title"
            name="title"
            value={formData.title}
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
            }}
          />
          <TextField
            label="Project Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            }}
          />
          <TextField
            label="Project Deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true, // Ensure label stays above
              style: { color: "#ffffff" },
            }}
            inputProps={{
              style: { color: "#ffffff" },
              sx: {
                "&::-webkit-calendar-picker-indicator": {
                  filter: "invert(1)", // Ensures calendar icon remains visible in dark mode
                },
              },
            }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              boxSizing: "border-box", // Fixes the label cut-off issue
            }}
          />
          <TextField
            label="Project Duration (in days)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            }}
          />
          <TextField
            name="image"
            type="file"
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              backgroundColor: "#0a0f29",
              border: "1px solid #ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostProject;

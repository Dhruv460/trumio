import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import tru from "../assets/tru2.jpg"; // Import the image correctly
import { useNavigate } from "react-router-dom";

const AccountTypePage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);

    navigate("/register", { state: { role: selectedRole } });
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
        <Typography variant="h3" sx={{ mb: 3 }}>
          Join Us!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
          To begin this journey, let us know what type of account you'd be
          opening.
        </Typography>

        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => handleRoleSelection("Student")}
          >
            Student - Manage personal activities
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleRoleSelection("Client")}
          >
            Client - Business/Company Account
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account? <a href="/signin">Sign In</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountTypePage;

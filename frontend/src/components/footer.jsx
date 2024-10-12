import React from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "#0a0f29",
        color: "#ffffff",
        padding: "50px 20px",
        textAlign: "center",
      }}
    >
      {/* Main Content */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            About Us
          </Typography>
          <Typography variant="body2">
            Our platform connects students, alumni, and clients for seamless
            project collaboration, offering a variety of opportunities across
            industries.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Link
            href="/"
            underline="hover"
            color="inherit"
            sx={{ display: "block", mb: 1 }}
          >
            About Us
          </Link>
          <Link
            href="/services"
            underline="hover"
            color="inherit"
            sx={{ display: "block", mb: 1 }}
          >
            Services
          </Link>
          <Link
            href="/feed"
            underline="hover"
            color="inherit"
            sx={{ display: "block", mb: 1 }}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            underline="hover"
            color="inherit"
            sx={{ display: "block", mb: 1 }}
          >
            Contact
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              sx={{ color: "#ffffff", "&:hover": { color: "#3b5998" } }}
            >
              <FaFacebookF />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              sx={{ color: "#ffffff", "&:hover": { color: "#1DA1F2" } }}
            >
              <FaTwitter />
            </IconButton>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              sx={{ color: "#ffffff", "&:hover": { color: "#E4405F" } }}
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              sx={{ color: "#ffffff", "&:hover": { color: "#0077b5" } }}
            >
              <FaLinkedin />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ backgroundColor: "#ffffff", margin: "30px 0" }} />

      {/* Copyright Section */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        &copy; {currentYear} Trumio. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

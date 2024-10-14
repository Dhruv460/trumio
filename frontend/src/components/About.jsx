import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0a0f29",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" gutterBottom>
          About <span className="highlight">Our Platform</span>
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="about-intro"
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "center", maxWidth: "700px", lineHeight: 1.6 }}
        >
          Our platform bridges the gap between{" "}
          <span className="highlight">students</span>,{" "}
          <span className="highlight">alumni</span>, and{" "}
          <span className="highlight">clients</span>. Clients post real-world
          projects, alumni help facilitate the process, and students compete for
          opportunities to contribute and grow their skills. Powered by{" "}
          <span className="highlight">AI</span> technology, we streamline the
          entire project lifecycle—from posting to task management.
        </Typography>
      </motion.div>

      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="feature-box"
        >
          <Typography variant="h5" gutterBottom>
            Real-Time Collaboration
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Our platform enables seamless communication between students,
            alumni, and clients, ensuring transparency and productivity.
          </Typography>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="feature-box"
        >
          <Typography variant="h5" gutterBottom>
            AI-Driven Task Management
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Leveraging AI, our platform assists in task assignment, progress
            tracking, and scheduling, optimizing efficiency for everyone.
          </Typography>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="feature-box"
        >
          <Typography variant="h5" gutterBottom>
            Skill Development
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Students gain hands-on experience by working on real-world projects,
            mentored by alumni and supervised by clients.
          </Typography>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="call-to-action"
      >
        <Button
          component={Link}
          to="/feed"
          variant="contained"
          sx={{ backgroundColor: "#007bff", marginTop: 5, padding: 1.5 }}
          size="large"
        >
          Get Started Today
        </Button>
      </motion.div>
    </Box>
  );
};

export default AboutUs;

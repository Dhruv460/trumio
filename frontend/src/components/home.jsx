import React from "react";
import { motion } from "framer-motion";
import image1 from "../assets/inter.jpg";
import image2 from "../assets/inter2.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.h1
        className="text-5xl font-bold text-center mb-6 animate__animated animate__fadeIn"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Trumio!
      </motion.h1>
      <motion.p
        className="text-xl mb-10 animate__animated animate__fadeIn"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Discover amazing projects and connect with your peers.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.img
          src={image1}
          alt="Project Image 1"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.img
          src={image2}
          alt="Project Image 2"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
      </div>
      <motion.button
        className="mt-8 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-200 transition duration-300"
        whileHover={{ scale: 1.1 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Feed = () => {
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/projects/getProjects",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSendMessage = async (participantId) => {
    if (!message) {
      Swal.fire("Error", "Please enter a message before sending.", "error");
      return;
    }
    var conversationId;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/convo/create",
        { participantId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      conversationId = response.data._id;
      console.log(response.data);
      console.log(conversationId);
    } catch (error) {
      console.error("Error creating conversation:", error);
      // Return null if there's an error
    }

    if (!conversationId) {
      Swal.fire("Error", "Failed to create a conversation.", "error");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/messages/send`,
        {
          conversationId,
          text: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire("Success", "Message sent successfully!", "success");
      setMessage("");
      setSelectedProject(null);
      setSelectedParticipant(null);
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire("Error", "Failed to send the message.", "error");
    }
  };

  const handleRepost = async (projectId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/projects/repost/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Reposted project:", response.data);
      // Optionally, refetch the projects after a repost
      fetchProjects();
    } catch (error) {
      console.error("Error reposting project:", error);
    }
  };

  const handleBid = (projectId) => {
    console.log(`Bidding on project: ${projectId}`);
    //likhta hu bad m iska logic
  };

  useEffect(() => {
    fetchProjects();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);
  // ye majdoori gpt ne kri ..(thanks to gpt)
  return (
    <div className="feed bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Project Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              key={project._id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:shadow-lg hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {role === "Alumni" && project.client && (
                <p className="text-gray-600">
                  Posted by: {project.client.name}
                </p>
              )}
              {role === "Student" && project.client && (
                <p className="text-gray-600">
                  Posted by: {project.client.name} | Reposted by:{" "}
                  {project.repostedBy ? project.repostedBy.name : "N/A"}
                </p>
              )}
              {role === "User" && (
                <button
                  onClick={() => handleBid(project._id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Bid
                </button>
              )}
              {role === "Alumni" && (
                <>
                  <button
                    onClick={() => handleRepost(project._id)}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  >
                    Repost
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setMessage(""); // Reset message input
                    }}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Send Message
                  </button>
                </>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects available</p>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Send Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full border p-2 rounded mb-4"
              placeholder="Type your message here..."
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleSendMessage(selectedProject.client)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Send
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="ml-2 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS
const Feed = () => {
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const [reposting, setReposting] = useState({});
  const formatDate = (dateString) => {
    if (!dateString) {
      console.error("Invalid date string:", dateString);
      return "Invalid date";
    }
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date value:", dateString);
      return "Invalid date";
    }
    return date.toISOString().split("T")[0];
  };

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

    let conversationId;
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
    } catch (error) {
      console.error("Error creating conversation:", error);
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
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire("Error", "Failed to send the message.", "error");
    }
  };

  const handleRepost = async (projectId) => {
    setReposting((prev) => ({ ...prev, [projectId]: true })); // Set reposting status to true

    try {
      await axios.put(
        `http://localhost:3000/api/projects/repost/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Show success toast notification

      toast.success("Project reposted successfully!");
      console.log("reposted");
      fetchProjects(); // Refresh projects after reposting
    } catch (error) {
      console.error("Error reposting project:", error);
      toast.error("Failed to repost the project."); // Show error toast notification
    } finally {
      setReposting((prev) => ({ ...prev, [projectId]: false })); // Reset reposting status
    }
  };

  const handleBid = (projectId) => {
    console.log(`Bidding on project: ${projectId}`);
    // Logic for bidding goes here
  };

  useEffect(() => {
    fetchProjects();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  // Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="feed bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Discover Alumni Projects
      </h1>
      <div className="grid grid-cols-1 gap-0">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <motion.div
              key={project._id}
              className="bg-gray-800 rounded-lg shadow-md p-0 flex h-[33vh] mb-4 border-b border-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-[30vw] h-auto object-contain rounded-l-lg"
                />
              )}
              <div className="flex-1 p-4">
                <div className="flex items-center mb-2">
                  {role === "Client" && project.client && (
                    <p className="text-gray-400">
                      Posted by: {project.client.name}
                    </p>
                  )}
                  {role === "Student" && project.client && (
                    <p className="text-gray-400">
                      Posted by: {project.client.name} | Reposted by:{" "}
                      {project.repostedBy ? project.repostedBy.name : "N/A"}
                    </p>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {project.title}
                </h2>
                <p className="text-gray-300">
                  Deadline to apply:{" "}
                  <span className="font-bold">
                    {project.deadline ? formatDate(project.deadline) : "N/A"}
                  </span>
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/project/${project._id}`} // Update the route to the project detail page
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </Link>
                  {role === "Student" && (
                    <button
                      onClick={() => handleBid(project._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                      Bid
                    </button>
                  )}
                  {role === "Client" && (
                    <>
                      <button
                        onClick={() => handleRepost(project._id)}
                        disabled={reposting[project._id]} // Disable button while reposting
                        className={`${
                          reposting[project._id]
                            ? "bg-gray-500 cursor-not-allowed" // Change to a "disabled" color
                            : "bg-green-500 hover:bg-green-600"
                        } text-white py-2 px-4 rounded transition ml-2`}
                      >
                        {reposting[project._id] ? "Reposting..." : "Repost"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setMessage(""); // Reset message input
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ml-2"
                      >
                        Send Message
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects available</p>
        )}
        <ToastContainer />
      </div>

      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="ml-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Next
          </button>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/getProject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProject(response.data);
    } catch (err) {
      setError("Failed to fetch project details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div className="project-detail bg-gray-900 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">
        {project.title}
      </h1>
      <div className="image-container mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="project-image w-full max-w-2xl h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <p className="text-gray-300 text-lg">
        <strong>Description:</strong> {project.description}
      </p>
      <p className="text-gray-300 text-lg">
        <strong>Posted by:</strong> {project.client.name}
      </p>
      <p className="text-gray-300 text-lg">
        <strong>Deadline:</strong> {formatDate(project.deadline)}{" "}
        {/* Format the deadline */}
      </p>
      <Link
        to="/feed"
        className="mt-6 inline-block bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Back to Projects
      </Link>
    </div>
  );
};

export default ProjectDetail;

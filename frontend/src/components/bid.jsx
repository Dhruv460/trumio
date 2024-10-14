import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/projects/client_projects",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching client projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchBidsForProjects = async () => {
      const allBids = {};

      await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/projects/my-projects/${project._id}/bids`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            allBids[project._id] = response.data;
          } catch (error) {
            console.error(
              `Error fetching bids for project ${project._id}:`,
              error
            );
          }
        })
      );

      setBids(allBids);
    };

    if (projects.length > 0) {
      fetchBidsForProjects();
    }
  }, [projects]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Your Projects and Bids
        </h2>
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover opacity-80"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>

                  <p className="mt-2 text-sm text-gray-300">
                    {project.description.length > 150
                      ? project.description.substring(0, 150) + "..."
                      : project.description}
                  </p>

                  <Link
                    to={`/project/${project._id}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Read more
                  </Link>
                </div>

                <div className="p-4 bg-gray-900 bg-opacity-90 overflow-y-auto">
                  <h4 className="text-xl font-bold mb-2">Bids</h4>
                  {bids[project._id] && bids[project._id].length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {bids[project._id].map((bid) => (
                        <div
                          key={bid._id}
                          className="bg-gray-700 p-4 rounded-md transition transform hover:bg-gray-600 hover:scale-105"
                        >
                          <p className="text-lg font-semibold">
                            Student: {bid.student.name}
                          </p>
                          <p>Bid Amount: ${bid.bidAmount}</p>
                          <p className="italic">Reason: {bid.bidReason}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No bids yet for this project.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            You have not posted any projects yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientProjects;

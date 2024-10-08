import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    university: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error.response.data);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <p className="text-gray-900">{profileData.name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <p className="text-gray-900">{profileData.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <p className="text-gray-900">{profileData.role}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">University</label>
        <p className="text-gray-900">{profileData.university}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

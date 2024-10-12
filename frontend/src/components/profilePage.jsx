import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    university: "",
    bio: "",
  });

  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");

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
        setBioText(response.data.bio); // Initialize bio
      } catch (error) {
        console.error("Error fetching profile data:", error.response.data);
      }
    };

    fetchProfileData();
  }, []);

  const handleBioSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/profile/bio",
        { bio: bioText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData({ ...profileData, bio: bioText });
      setEditingBio(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error saving bio:", error.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Profile
      </h2>

      <div className="mb-4">
        <label className="block text-gray-500 text-sm">Name</label>
        <p className="text-gray-900 font-medium text-lg">{profileData.name}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-500 text-sm">Email</label>
        <p className="text-gray-900 font-medium text-lg">{profileData.email}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-500 text-sm">Role</label>
        <p className="text-gray-900 font-medium text-lg">{profileData.role}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-500 text-sm">University</label>
        <p className="text-gray-900 font-medium text-lg">
          {profileData.university}
        </p>
      </div>

      {/* Bio Section */}
      <div className="mb-4">
        <label className="block text-gray-500 text-sm">Bio</label>
        {editingBio ? (
          <div className="mt-2">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              rows="4"
            />
            <div className="flex justify-end mt-3">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                onClick={() => setEditingBio(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleBioSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            {profileData.bio ? (
              <p className="text-gray-900 text-lg leading-relaxed">
                {profileData.bio}
              </p>
            ) : (
              <p className="text-gray-500 italic">No bio added yet</p>
            )}
            <button
              className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => setEditingBio(true)}
            >
              {profileData.bio ? "Edit Bio" : "Add Bio"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

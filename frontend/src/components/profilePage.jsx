import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    university: "",
    bio: "",
    image: "",
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
      await axios.put(
        "http://localhost:3000/api/auth/addbio",
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
    <div className="min-h-screen bg-gray-900 text-white py-10 px-5">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group mb-4">
            <img
              src={
                profileData.image ||
                "https://freesvg.org/img/abstract-user-flat-4.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover shadow-lg transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700">
                Change Image
              </button>
            </div>
          </div>

          <p className="text-3xl font-semibold">{profileData.name}</p>
          <p className="text-lg text-gray-400">{profileData.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105">
            <label className="block text-gray-400 text-sm">Role</label>
            <p className="text-lg font-medium">{profileData.role}</p>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105">
            <label className="block text-gray-400 text-sm">University</label>
            <p className="text-lg font-medium">{profileData.university}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105">
          <label className="block text-gray-400 text-sm">Bio</label>
          {editingBio ? (
            <div className="mt-2">
              <textarea
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows="4"
              />
              <div className="flex justify-end mt-3">
                <button
                  className="px-4 py-2 mr-2 bg-gray-600 rounded-md text-gray-300 hover:bg-gray-500 transition-transform transform hover:scale-105"
                  onClick={() => setEditingBio(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                  onClick={handleBioSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              {profileData.bio ? (
                <p className="text-gray-300 text-lg leading-relaxed transition-transform transform hover:scale-105">
                  {profileData.bio}
                </p>
              ) : (
                <p className="text-gray-500 italic">No bio added yet</p>
              )}
              <button
                className="mt-3 text-blue-400 hover:text-blue-600 font-medium transition-transform transform hover:scale-105"
                onClick={() => setEditingBio(true)}
              >
                {profileData.bio ? "Edit Bio" : "Add Bio"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

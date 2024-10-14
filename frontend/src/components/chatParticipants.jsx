import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatParticipants = ({ onSelectParticipant }) => {
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/chat/getParticipants",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="chat-participants">
      <h2 className="text-lg font-bold mb-2">Past Chat Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li
            key={participant.id}
            onClick={() => onSelectParticipant(participant)}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
          >
            {participant.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatParticipants;

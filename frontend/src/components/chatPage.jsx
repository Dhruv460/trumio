import React, { useState } from "react";

const ChatPage = () => {
  const [conversations] = useState([
    {
      id: 1,
      name: "Sahil Ranjan (POC Zomato)",
      lastMessage: "We will update you by EOD, some minor work...",
      messages: [
        {
          sender: "Other",
          time: "18:12",
          text: "What is the progress for today guys?",
        },
        {
          sender: "You",
          time: "18:16",
          text: "We will update you by EOD, some minor work is left.",
        },
      ],
    },
    {
      id: 2,
      name: "Al Bot",
      lastMessage: "Ask your doubts to me!",
      messages: [
        { sender: "Other", time: "19:10", text: "Ask your doubts to me!" },
        { sender: "You", time: "19:16", text: "Thank you, I will!" },
      ],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setSelectedConversation((prevConversation) => ({
        ...prevConversation,
        messages: [
          ...prevConversation.messages,
          { sender: "You", time: currentTime, text: newMessage },
        ],
      }));

      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow overflow-hidden">
        <div className="w-1/4 bg-gray-900 text-white flex flex-col">
          <div className="p-5 border-b border-gray-700 bg-gray-800">
            <h2 className="text-lg font-bold">Conversations</h2>
          </div>

          <div className="flex-grow overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-5 cursor-pointer border-b border-gray-700 hover:bg-gray-800 ${
                  selectedConversation.id === conversation.id
                    ? "bg-gray-800"
                    : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <h3 className="font-bold">{conversation.name}</h3>
                <p className="text-gray-400 text-sm truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 bg-black flex flex-col">
          <div className="p-5 text-gray-500 bg-gray-800">
            <h3>{selectedConversation.name}</h3>
          </div>

          <div className="flex-1 p-5 overflow-y-auto">
            {selectedConversation.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700 bg-gray-800">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                placeholder="Message"
                className="w-full p-3 bg-gray-900 text-white rounded-md outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const ChatAi = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/chatHistory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatHistory(res.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [token]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/prompt",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newChat = { prompt, response: res.data };
      setChatHistory((prevHistory) => [...prevHistory, newChat]);
      setPrompt("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container dark-mode">
      <div className="chat-sidebar">
        <h2>Chat History</h2>
        <ul>
          {chatHistory.map((chat, index) => (
            <li key={index}>
              <span>{`you: ${chat.prompt.slice(0, 20)}...`}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main">
        <header className="chat-header">
          <h1>Chat with your AI Assistant</h1>
        </header>
        <div className="chat-messages">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-message-box">
              <div className="chat-message">
                <div className="chat-prompt">
                  <strong>you: {chat.prompt}</strong>
                </div>
                <div className="chat-response">
                  <strong>AI:</strong> {chat.response}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            className="chat-input"
          />
          <button type="submit" className="chat-button" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAi;

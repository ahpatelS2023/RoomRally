import React, { useState } from "react";
import "./chatbot.css";
import axios from "axios";
import bot from "../images/bot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Chatbot = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    try {
      const response = await axios.get(
        `http://localhost:8080/chat/${inputValue}`
      );
      const botReply = response.data.response;
      setMessages([
        ...messages,
        { text: inputValue, sender: "user" },
        { text: botReply, sender: "bot" },
      ]);
      setInputValue("");
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  const handleChatbotOpen = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="chatbot-container">
      {isChatbotOpen && (
        <div className="chatbot-content">
          <div className="chatbot-header">
            <text>RoomRally Assistant</text>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setChatbotOpen(false)}
              className="chatbot-close-icon"
            />
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              className="chatbot-form-input"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Ask me about Anything..."
            />
            <button className="chatbot-form-button" type="submit">
              Send
            </button>
          </form>
        </div>
      )}
      {!isChatbotOpen && (
        <button className="chatbot-toggle" onClick={handleChatbotOpen}>
          <img src={bot} alt="Open chatbot" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;

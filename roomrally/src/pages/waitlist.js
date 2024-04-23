import React, { useState } from "react";
import "./waitlist.css";
import Footer from "../components/footer";
import Chatbot from "../components/chatbot";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RoomWaitlist = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    studentId: "",
    reason: "",
    waitlistStatus: {
      totalStudents: 2,
      estimatedWaitTime: "30 mins",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleJoinWaitlist = () => {
    console.log("Join Waitlist with state: ", state);
  };

  const handleRefresh = (event) => {
    console.log("Refresh Waitlist Status");
    event.preventDefault();
    navigate("/waitlist");
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/rooms");
  };

  return (
    <div>
      <div className="waitlist-container">
        <div className="header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="back-icon"
            onClick={handleBack}
          />
          <h1> Join Waitlist</h1>
        </div>
        <div className="waitlist-status">
          <h2>Current Waitlist Status</h2>
          <p>
            Total students on waitlist: {state.waitlistStatus.totalStudents}
          </p>
          <p>Estimated wait time: {state.waitlistStatus.estimatedWaitTime}</p>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
        <div className="join-waitlist">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={state.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={state.studentId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason for Booking"
            value={state.reason}
            onChange={handleChange}
          ></input>
          <button onClick={handleJoinWaitlist}>Join Waitlist</button>
        </div>
        <p className="confirmation-message">
          Confirmation message will appear here.
        </p>
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default RoomWaitlist;

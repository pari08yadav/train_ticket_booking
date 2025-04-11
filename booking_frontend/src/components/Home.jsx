import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("authToken");

  // const handleLogin = () => {
  //   navigate("/login"); // Navigate to the Login page
  // };

  // const handleSignup = () => {
  //   navigate("/signup"); // Navigate to the Signup page
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken"); // Remove the token from localStorage
  //   navigate("/"); // Redirect to the home page
  // };

  const handleSearchTrain = () => {
    navigate("/search/train"); // Navigate to the Search Train page
  };

  return (
    <div className="home-container">
      
      <div className="welcome-message">
        <h1>Welcome to Booking</h1>
        <p>Book your rides easily and conveniently.</p>
        {/* {isLoggedIn && (
          <button className="btn main-btn" onClick={handleSearchTrain}>
            Search Train
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Home;

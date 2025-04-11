import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchTrain = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [infoMessage, setInfoMessage] = useState(""); // For ticket availability messages
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login if the user is not authenticated
    }
  }, [navigate]);

  const handleSearch = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to search for trains.");
      return;
    }

    if (!source || !destination) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const params = { source, destination };
      if (date) {
        params.date = date; // Only add date if it's provided
      }

      const response = await axios.get("http://127.0.0.1:8000/api/search/tickets/", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the header
        },
        params: params, // Pass the params dynamically
      });
      console.log("**************",response.data);
      setResults(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized. Please log in again.");
        localStorage.removeItem("authToken"); // Clear token
        navigate("/login");
      } else {
        setError("No tickets found for the given criteria.");
        setResults([]);
      }
    }
  };

  const handleBookRedirect = (train) => {
    if (train.available_seats > 0) {
      navigate("/book/ticket", { state: { train : train } });
    } else {
      setInfoMessage("Tickets are not available for this train.");
      setTimeout(() => setInfoMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="search-train-container">
      <h1>Search Train</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {infoMessage && <p className="info">{infoMessage}</p>}
      <div className="results">
        {results.length > 0 ? (
          results.map((train, index) => (
            <div key={index} className="result-item">
              <h3>{train.train_name}</h3>
              <p>Date: {train.date}</p>
              <p>Source: {train.source}</p>
              <p>Destination: {train.destination}</p>
              <p>Available Seats: {train.available_seats}</p>
              {/* <p>Train schedule Id: {train.train_schedule_id} </p> */}
              <button onClick={() => handleBookRedirect(train)}>
                Book Ticket
              </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchTrain;




import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BookTicket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const train = location.state?.train; // Retrieve the train object from state
    
    const [passengers, setPassengers] = useState([{ name: "", age: "", classType: "" }]);
    const [paymentStatus, setPaymentStatus] = useState("Pending");

    // Handle adding a new passenger
    const handleAddPassenger = () => {
        setPassengers([...passengers, { name: "", age: "", classType: "" }]);
    };

    // Handle removing a passenger
    const handleRemovePassenger = (index) => {
        const updatedPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(updatedPassengers);
    };

    // Handle input change for passenger details
    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const handleSubmit = async () => {
        console.log("train value",train);
        // Ensure train schedule is available
        if (!train?.train_schedule_id) {
            alert("Train schedule ID is missing. Please try again.");
            return;
        }
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You are not logged in. Please log in and try again.");
                return;
            }

            // Make the API call to book the tickets
            const response = await axios.post(
                "http://127.0.0.1:8000/api/book/ticket/",
                {
                    train_schedule_id: train.train_schedule_id, // Send train schedule ID
                    passengers: passengers, // Send the list of passengers
                    payment_status: paymentStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token to the headers
                    },
                }
            );

            // Handle success
            alert("Tickets booked successfully!");
            console.log("Response:", response.data);
            navigate("/display/ticket", { state: { bookings: response.data.bookings } });
        } catch (error) {
            // Check if the error has a response from the server
            if (error.response) {
                console.error("Error Response:", error.response);
                console.error("Status Code:", error.response.status);
                console.error("Error Data:", error.response.data);

                // Handle specific error codes
                if (error.response.status === 400) {
                    alert(`Bad Request: ${error.response.data.error || "Invalid input."}`);
                } else if (error.response.status === 401) {
                    alert("Unauthorized. Please log in again.");
                    localStorage.removeItem("authToken");
                    window.location.href = "/login";
                } else if (error.response.status === 404) {
                    alert(`Not Found: ${error.response.data.error || "Resource not found."}`);
                } else {
                    alert(`Error: ${error.response.data.error || "Something went wrong."}`);
                }
            } else if (error.request) {
                // Request was made but no response received
                console.error("Error Request:", error.request);
                alert("No response received from the server. Please try again later.");
            } else {
                // Something else happened while setting up the request
                console.error("Error Message:", error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="book-ticket-container">
            <h2>Book Tickets for {train?.train_name}</h2>

            {/* Passenger details form */}
            {passengers.map((passenger, index) => (
                <div key={index} className="passenger-form">
                    <input
                        type="text"
                        placeholder="Passenger Name"
                        value={passenger.name}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Passenger Age"
                        value={passenger.age}
                        onChange={(e) => handleInputChange(index, "age", e.target.value)}
                    />
                    <select
                        value={passenger.classType}
                        onChange={(e) => handleInputChange(index, "classType", e.target.value)}
                    >
                        <option value="">Select Class</option>
                        <option value="Sleeper">Sleeper</option>
                        <option value="First AC">First AC</option>
                        <option value="Second AC">Second AC</option>
                        <option value="Third AC">Third AC</option>
                    </select>
                    <button
                        className="remove-passenger-btn"
                        onClick={() => handleRemovePassenger(index)}
                        disabled={passengers.length === 1}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button className="add-passenger-btn" onClick={handleAddPassenger}>
                Add Passenger
            </button>
            <button className="book-ticket-btn" onClick={handleSubmit}>
                Book Tickets
            </button>
        </div>
    );
};

export default BookTicket;

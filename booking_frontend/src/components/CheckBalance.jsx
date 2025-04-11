import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckBalance = () => {
    const [balance, setBalance] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Check for token on component load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login"); // Redirect to login if no token
        } else {
        fetchBalance(token);
        }
    }, [navigate]);

    // Fetch balance from the backend
    const fetchBalance = async (token) => {
        
        try {
            
            // Retrieve the token from localStorage
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You are not logged in. Please log in and try again.");
                return;
            }

            const response = await axios.get("http://localhost:8000/api/check/balance/", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setBalance(response.data.balance);
        } catch (error) {
        setMessage(error.response?.data?.error || "Failed to fetch balance!");
        }
    };

    // Navigate to Add Funds page
    const handleAddFunds = () => {
        navigate("/add/funds");
    };

    return (
        <div className="check-balance-container">
        <h2>Check Balance</h2>
        {message && <p className="message error">{message}</p>}
        {balance !== null ? (
            <div className="balance-info">
            <p>Your Available Balance: ₹{balance}</p>
            <button onClick={handleAddFunds}>Add Funds</button>
            </div>
        ) : (
            <p>Loading your balance...</p>
        )}
        </div>
    );
};

export default CheckBalance;

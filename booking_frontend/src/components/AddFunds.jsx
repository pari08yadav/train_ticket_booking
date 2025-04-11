import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFunds = () => {
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Check for token on component load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login"); // Redirect to login if no token
        }
    }, [navigate]);

    const handleAddFunds = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You are not logged in. Please log in and try again.");
                return;
            }
            
            const response = await axios.post(
                "http://localhost:8000/api/add/fund/", 
                { amount },
                {
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure token is stored
                },
                }
            );
            console.log("Response:", response.data);
            setMessage(`Funds added successfully! New balance: ₹${response.data.data.balance}`);
            setAmount("");
        } catch (error) {
        setMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="add-funds-container">
            <h2>Add Funds</h2>
            <form className="add-funds-form" onSubmit={handleAddFunds}>
            <label htmlFor="amount">Amount (₹)</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
            />
            <button type="submit">Add Funds</button>
            </form>
            {message && (
                <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
                {message}
                </p>
            )}
            </div>
        );
    };
    
export default AddFunds;
    
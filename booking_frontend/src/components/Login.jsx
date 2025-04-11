import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        identifier,
        password,
      });
      console.log(identifier, password);
      const token  = response.data.tokens.access;
      console.log(token);
      // Store the token in localStorage
      localStorage.setItem("authToken", token);
      
      // Navigate to the home page or another protected page
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="identifier">Email or Phone:</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn login-btn">
          Login
        </button>
      </form>
      <div className="centered-link">
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>
    </div>
  );
};

export default Login;

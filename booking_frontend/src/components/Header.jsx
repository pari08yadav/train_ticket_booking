import React, {useState,} from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);


  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogin = () => {
    navigate("/login"); // Navigate to the Login page
  };

  const handleSignup = () => {
    navigate("/signup"); // Navigate to the Signup page
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    navigate("/"); // Redirect to the home page
  };

  const handleSearchTrain = () => {
    navigate("/search/train"); // Navigate to the Search Train page
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsWalletMenuOpen(false); // Close wallet menu if profile menu is toggled
  };

  const handleWallet = () => {
    setIsWalletMenuOpen(!isWalletMenuOpen); // Toggle wallet options
  };

  const handleAddFund = () => {
    navigate("/add/funds");
  };

  const handleCheckBalance = () => {
    navigate("/check/balance");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Booking</Link>
        </div>
        <div className="nav-buttons">
          {!isLoggedIn ? (
            <>
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
              <button className="signup-btn" onClick={handleSignup}>
                Signup
              </button>
            </>
          ) : (
            <>
              <button className="search-train-btn" onClick={handleSearchTrain}>
                Search Train
              </button>
              <div className="profile-menu">
                <button className="btn profile-btn" onClick={toggleProfileMenu}>
                  Profile
                </button>
                {isProfileMenuOpen && (
                  <div className="dropdown-menu">
                    <p className="dropdown-item" onClick={handleWallet}>
                      Wallet
                    </p>
                    {isWalletMenuOpen && (
                      <div className="wallet-options">
                        <p className="wallet-option" onClick={handleAddFund}>
                          Add Fund
                        </p>
                        <p className="wallet-option" onClick={handleCheckBalance}>
                          Check Balance
                        </p>
                      </div>
                    )}
                    <p className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </p>
                  </div>
                )}
              </div>
              {/* <button className="btn" onClick={handleLogout}>
                Logout
              </button> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

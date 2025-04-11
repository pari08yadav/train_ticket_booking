import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import bgImage from "../assets/train8.jpeg"; // Adjust the path as necessary


const BaseLayout = ({ children }) => {
  return (
    <div 
      className="base-layout"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        
      }}
      >
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;

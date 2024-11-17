import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      {/* <div className="navbar-brand">TrainAI</div> */}
      <img src={logo} alt="Image Not found"/>
      <div className="navbar-links">
        <a href="/howItWorks">How It Works</a>
        <a href="#">Explore Models</a>
        <a href="#">FAQs</a>
        <a href="#" className="signup-btn">Sign Up</a>
      </div>
    </nav>
  );
};

export default Header;

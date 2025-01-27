import React from 'react';
import './Header.css';
import logo from '../../assets/PiggyBuddy.png';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Piggy Buddy</div>
      <Link className="logo" to="/">
      <img height= "70px" src={logo} alt="Image Not found"/>
    </Link>
      <div className="navbar-links">
        <a href="/InvestNow">Invest Now</a>
        <a href="/learnMore">How It Works</a>
      </div>
    </nav>
  );
};

export default Header;

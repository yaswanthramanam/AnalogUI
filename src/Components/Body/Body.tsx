import React from 'react';
import './Body.css';
import Arweave from '../Arweave/Arweave';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
        Invest & <br /> Grow Together
        </h1>
        <p className="hero-subtitle">
          Invest in Crypto as a Community and Earn Exciting Rewards
        </p>
        <a className="cta-button" href= "/InvestNow">Invest Now</a>
      </div>
    </section>
  );
};

export default HeroSection;

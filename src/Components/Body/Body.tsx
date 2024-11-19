import React from 'react';
import './Body.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Unlocking Smarter AI with <br /> Community Data
        </h1>
        <p className="hero-subtitle">
          Defining AI training in a collaborative data marketplace
        </p>
        <a className="cta-button" href= "/learnMore">Learn More</a>
      </div>
    </section>
  );
};

export default HeroSection;

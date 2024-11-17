import React from 'react';
import Header from '../Header/Header';
import Body from '../Body/Body';
import './home.css';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;
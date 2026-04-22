import React, { useState, useEffect } from 'react';

import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner2.jpg';
import banner3 from '../../../assets/images/banner3.jpg';
import banner4 from '../../../assets/images/banner4.jpg';
import banner5 from '../../../assets/images/banner5.jpg';
import banner6 from '../../../assets/images/banner6.png';
import banner7 from '../../../assets/images/banner7.jpg';

import Hero from './Hero';
import Menu from './Menu';
import Drink from './Drink';
import Dessert from './Dessert';
import Footer from '../../../components/layout/Footer';

function HomePage(){
  const slides = [
    banner1, banner2, banner3, banner4, banner5, banner6, banner7
  ];

  const containerStyles = {
    width: '100%',
    height: '400px',
  }

  return (
    <div>
      <div style={containerStyles}>
        <Hero slides={slides}/>
      </div>
      <Menu />
      <Drink />
      <Dessert />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
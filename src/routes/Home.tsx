import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBar from 'src/components/Navbar';
import HomePage from 'src/pages/HomePage';
//component wrapping all other components in one long page
const Portfolio: React.FC = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
      disable: 'mobile',
      easing: 'ease-out',
    });
  }, []);
  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
};

export default Portfolio;

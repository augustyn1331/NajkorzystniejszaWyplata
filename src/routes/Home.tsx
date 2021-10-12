import React from 'react';
import Header from 'src/components/header/Header';
import HomePage from 'src/pages/HomePage';
//component wrapping all other components in one long page
const Portfolio: React.FC = () => {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
};

export default Portfolio;

import React from 'react';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeYachts from '@/components/HomeYachts';
import FeaturedYachts from '@/components/FeaturedYachts';

const HomePage: React.FC = (): JSX.Element => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedYachts />
      <HomeYachts />
    </>
  );
};

export default HomePage;
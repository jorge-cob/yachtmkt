'use client'

import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingPageProps {
  loading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ loading }) => {
  const override = {
    display: 'block',
    margin: '100px auto',
  };

  return (
    <ClipLoader
      color='#3b82f6'
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
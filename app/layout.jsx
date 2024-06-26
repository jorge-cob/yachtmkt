import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Yachtmkt',
  description: 'Find or offer a yacht',
  keywords: 'yachts, yacht, free, yachts, free, free yachts'
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;

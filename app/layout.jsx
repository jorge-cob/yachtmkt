import React from 'react';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'PropertyPulse | Find the perfect',
  description: 'Find some place to trash!',
  keywords: 'trash, property, find, perfect',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;

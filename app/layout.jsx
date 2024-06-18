import React from 'react';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Electronic Freebies | Re-place your replacement parts',
  description: 'Find or share electronic spare parts',
  keywords: 'spare parts, electronic spare parts, freebies',
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

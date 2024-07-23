import React, { createContext, useContext, useState } from 'react';

// Define the type for the context value
interface GlobalContextValue {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

// Create a provider
export const GlobalProvider = ({ children } : { children: React.ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to access context
export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
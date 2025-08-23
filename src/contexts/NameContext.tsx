
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface NameContextType {
  name: string;
  setName: (name: string) => void;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export const NameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('useName must be used within a NameProvider');
  }
  return context;
};

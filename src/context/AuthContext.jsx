import React, { createContext, useState, useContext } from 'react';

// Mock Roles: 'visitor', 'staff', 'admin'
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // We default to visitor (Landing Page view)
  const [role, setRole] = useState('visitor');
  
  // For staff view, we also need a user id to filter their schedule
  const [user, setUser] = useState({ id: 1, name: 'Dr. Alure Default' });

  const loginAs = (newRole, newUser = null) => {
    setRole(newRole);
    if (newUser) {
      setUser(newUser);
    }
  };

  return (
    <AuthContext.Provider value={{ role, user, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
};

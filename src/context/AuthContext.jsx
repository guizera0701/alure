import React, { createContext, useState, useContext } from 'react';

// Mock Roles: 'visitor', 'staff', 'admin'
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // We default to visitor (Landing Page view)
  const [role, setRole] = useState('visitor');  // the true authentication
  const [viewMode, setViewMode] = useState('visitor'); // the screen currently being viewed
  
  // For staff view, we also need a user id to filter their schedule
  const [user, setUser] = useState({ id: 1, name: 'Dr. Alure Default' });

  // Use this when truly logging in (Admin Dashboard or Staff Panel)
  const loginAs = (newRole, newUser = null) => {
    setRole(newRole);
    setViewMode(newRole); // by default, view what you logged in as
    if (newUser) {
      setUser(newUser);
    }
  };

  // Use this when the admin wants to swap the view without losing their admin status
  const switchView = (newView, newUser = null) => {
    setViewMode(newView);
    if (newUser) {
      setUser(newUser);
    }
  };

  const logout = () => {
    setRole('visitor');
    setViewMode('visitor');
    setUser({ id: 1, name: 'Dr. Alure Default' });
  };

  return (
    <AuthContext.Provider value={{ role, viewMode, user, loginAs, switchView, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

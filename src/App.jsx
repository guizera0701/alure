import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import RoleSwitcher from './components/RoleSwitcher';

// Placeholder Pages (we will create these next)
import LandingPage from './pages/Visitor/LandingPage';
import StaffPanel from './pages/Staff/StaffPanel';
import AdminDashboard from './pages/Admin/AdminDashboard';

function AppContent() {
  const { role } = useAuth();
  
  // Conditionally render based on the active role
  // Using native CSS classes defined in index.css to set base theme
  const themeClass = role === 'visitor' ? 'theme-light' : 'theme-dark';

  return (
    <div className={`app-container ${themeClass}`}>
      {role === 'visitor' && <LandingPage />}
      {role === 'staff' && <StaffPanel />}
      {role === 'admin' && <AdminDashboard />}
      
      {/* Dev helper to switch views quickly */}
      <RoleSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

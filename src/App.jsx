import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import RoleSwitcher from './components/RoleSwitcher';

// Placeholder Pages (we will create these next)
import LandingPage from './pages/Visitor/LandingPage';
import StaffPanel from './pages/Staff/StaffPanel';
import AdminDashboard from './pages/Admin/AdminDashboard';
import LoginPage from './pages/Admin/LoginPage';
import TreatmentsPage from './pages/Visitor/TreatmentsPage';

function AppContent() {
  const { role, viewMode } = useAuth();
  
  // Conditionally render based on the active role
  // Using native CSS classes defined in index.css to set base theme
  const themeClass = viewMode === 'visitor' ? 'theme-light' : 'theme-dark';

  return (
    <div className={`app-container ${themeClass}`}>
      {viewMode === 'visitor' && <LandingPage />}
      {viewMode === 'treatments' && <TreatmentsPage />}
      {viewMode === 'login' && <LoginPage />}
      {viewMode === 'staff' && <StaffPanel />}
      {viewMode === 'admin' && <AdminDashboard />}
      
      {/* Dev helper to switch views quickly - only for admins now */}
      {role === 'admin' && <RoleSwitcher />}
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

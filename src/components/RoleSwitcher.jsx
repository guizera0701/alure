import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './RoleSwitcher.css';

export default function RoleSwitcher() {
  const { role, viewMode, switchView, user } = useAuth();
  const { dentists } = useData();
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false);

  return (
    <div className="role-switcher-container animate-fade-in">
      <span>Modo Atual: <strong>{viewMode.toUpperCase()}</strong></span>
      
      <div className="role-switcher-actions">
        <button 
          className={`btn-role ${viewMode === 'visitor' ? 'active' : ''}`}
          onClick={() => switchView('visitor')}
        >
          Visitor
        </button>
        <button 
          className={`btn-role ${viewMode === 'login' ? 'active' : ''}`}
          onClick={() => switchView('login')}
        >
          Login
        </button>
        <button 
          className={`btn-role ${viewMode === 'admin' ? 'active' : ''}`}
          onClick={() => switchView('admin')}
        >
          Admin
        </button>

        <div className="staff-dropdown" onMouseEnter={() => setIsStaffMenuOpen(true)}>
          <button className={`btn-role ${viewMode === 'staff' ? 'active' : ''}`}>
            Staff (Dentist) ▼
          </button>
          <div className={`dropdown-contents ${isStaffMenuOpen ? 'open' : ''}`}>
            <button 
              className="close-x" 
              onClick={(e) => { e.stopPropagation(); setIsStaffMenuOpen(false); }}
            >
              ✕ Fechar
            </button>
            {dentists.map(dentist => (
              <button 
                key={dentist.id}
                className={viewMode === 'staff' && user.id === dentist.id ? 'active-dentist' : ''}
                onClick={() => switchView('staff', dentist)}
              >
                Log in as {dentist.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

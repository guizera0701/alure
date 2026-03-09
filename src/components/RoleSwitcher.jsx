import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './RoleSwitcher.css';

export default function RoleSwitcher() {
  const { role, loginAs, user } = useAuth();
  const { dentists } = useData();

  return (
    <div className="role-switcher-container animate-fade-in">
      <span>Modo Atual: <strong>{role.toUpperCase()}</strong></span>
      
      <div className="role-switcher-actions">
        <button 
          className={`btn-role ${role === 'visitor' ? 'active' : ''}`}
          onClick={() => loginAs('visitor')}
        >
          Visitor
        </button>
        <button 
          className={`btn-role ${role === 'admin' ? 'active' : ''}`}
          onClick={() => loginAs('admin')}
        >
          Admin
        </button>

        <div className="staff-dropdown">
          <button className={`btn-role ${role === 'staff' ? 'active' : ''}`}>
            Staff (Dentist) ▼
          </button>
          <div className="dropdown-contents">
            {dentists.map(dentist => (
              <button 
                key={dentist.id}
                className={role === 'staff' && user.id === dentist.id ? 'active-dentist' : ''}
                onClick={() => loginAs('staff', dentist)}
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

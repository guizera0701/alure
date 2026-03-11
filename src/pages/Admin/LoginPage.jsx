import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import './LoginPage.css';

export default function LoginPage() {
  const { loginAs, logout } = useAuth();
  const { dentists } = useData();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'adm' && credentials.password === '0000') {
      loginAs('admin');
    } else {
      const matchStaff = dentists.find(
        d => d.login === credentials.username && d.password === credentials.password
      );

      if (matchStaff) {
        loginAs('staff', matchStaff);
      } else {
        setError('Usuário ou senha inválidos.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container" style={{ position: 'relative' }}>
        <button 
          onClick={() => logout()}
          style={{ 
            position: 'absolute', top: '1rem', left: '1rem', 
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-primary-dark)' 
          }}
          title="Voltar para Home"
        >
          ⬅
        </button>

        <h2>Acesso Restrito</h2>
        <p>Área administrativa da Alure.</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Usuário</label>
            <input 
              type="text" 
              name="username" 
              className="input-field"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Digite seu usuário"
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              name="password" 
              className="input-field"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

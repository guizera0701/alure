import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { 
    dentists, 
    appointments, 
    requests, 
    approveRequest, 
    rejectRequest,
    addDentist,
    removeDentist
  } = useData();
  const { logout } = useAuth();

  const [newDentistName, setNewDentistName] = useState('');
  const [newDentistLogin, setNewDentistLogin] = useState('');
  const [newDentistPass, setNewDentistPass] = useState('');

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handleApprove = (requestId) => {
    const success = approveRequest(requestId, dentists[0]?.id);
    if (success) {
      alert('Agendamento aprovado com sucesso!');
    }
  };

  const handleAddDentist = (e) => {
    e.preventDefault();
    if (newDentistName.trim() && newDentistLogin.trim() && newDentistPass.trim()) {
      addDentist(newDentistName, newDentistLogin, newDentistPass);
      setNewDentistName('');
      setNewDentistLogin('');
      setNewDentistPass('');
    }
  };

  return (
    <div className="admin-dashboard animate-fade-in">
      <header className="ad-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => logout()}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            title="Voltar para Home"
          >
            ⬅
          </button>
          <h1>Gestão da Clínica</h1>
        </div>
        <form className="ad-hr-controls" onSubmit={handleAddDentist} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Nome (Ex: Dr. João)" 
            value={newDentistName}
            onChange={(e) => setNewDentistName(e.target.value)}
            className="input-field-small"
            required
          />
          <input 
            type="text" 
            placeholder="Login" 
            value={newDentistLogin}
            onChange={(e) => setNewDentistLogin(e.target.value)}
            className="input-field-small"
            required
          />
          <input 
            type="text" 
            placeholder="Senha" 
            value={newDentistPass}
            onChange={(e) => setNewDentistPass(e.target.value)}
            className="input-field-small"
            required
          />
          <button type="submit" className="btn btn-secondary btn-small">+ Add Staff</button>
        </form>
      </header>

      <main className="ad-main">
        {/* Pending Requests */}
        <section className="ad-section">
          <h2>Solicitações Pendentes (Site)</h2>
          <div className="ad-requests-grid">
            {requests.length === 0 ? (
              <p className="no-data">Nenhuma solicitação pendente no momento.</p>
            ) : null}

            {requests.map(req => (
              <div key={req.id} className="ad-request-card">
                <div className="req-header">
                  <h3>{req.user_name}</h3>
                  <span className="badge-pending">Pendente</span>
                </div>
                <p><strong>Contato:</strong> {req.contact}</p>
                <p><strong>Especialidade:</strong> {req.specialty}</p>
                <p><strong>Horário Desejado:</strong> {formatTime(req.requested_time)}</p>
                
                <div className="req-actions">
                  <button className="btn-approve" onClick={() => handleApprove(req.id)}>Aprovar</button>
                  <button className="btn-reject" onClick={() => rejectRequest(req.id)}>Rejeitar</button>
                </div>
                <small className="req-hint">*Aprovar tentará alocar na agenda do 1º Dentista p/ teste de colisão</small>
              </div>
            ))}
          </div>
        </section>

        {/* Multi-Agenda */}
        <section className="ad-section multi-agenda-section">
          <h2>Visão Multi-Agenda (Hoje)</h2>
          <div className="ad-multi-agenda">
            {dentists.map(dentist => {
              const dentistAppointments = appointments
                .filter(app => app.dentista_id === dentist.id)
                .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

              return (
                <div key={dentist.id} className="ad-agenda-column">
                  <div className="column-header">
                    <h3>{dentist.name}</h3>
                    <button 
                      className="btn-remove-staff" 
                      onClick={() => removeDentist(dentist.id)}
                      title="Remover Dentista"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="column-body">
                    {dentistAppointments.length === 0 ? (
                      <p className="no-data-small">Agenda vazia.</p>
                    ) : null}

                    {dentistAppointments.map(app => (
                      <div key={app.id} className={`ad-mini-card status-${app.status === 'Finalizado' ? 'finished' : app.status === 'Em Atendimento' ? 'progress' : 'waiting'}`}>
                        <div className="mini-time">
                          {new Date(app.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="mini-details">
                          <strong>{app.user_name}</strong>
                          <span>{app.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

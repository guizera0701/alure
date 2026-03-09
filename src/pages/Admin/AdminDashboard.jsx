import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
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

  const [newDentistName, setNewDentistName] = useState('');

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handleApprove = (requestId) => {
    // In a real app, admin would select which dentist takes the patient.
    // For this mock, we just try to assign it to Dentist #1 by default, or #2 if it fails?
    // Let's implement a simple prompt or just assign to Dentist 1 for speed.
    // Actually, let's just pick dentist 1 for the demo, since we want to show conflict resolution.
    const success = approveRequest(requestId, dentists[0]?.id);
    if (success) {
      alert('Agendamento aprovado com sucesso!');
    }
  };

  const handleAddDentist = () => {
    if (newDentistName.trim()) {
      addDentist(newDentistName);
      setNewDentistName('');
    }
  };

  return (
    <div className="admin-dashboard animate-fade-in">
      <header className="ad-header">
        <h1>Gestão da Clínica</h1>
        <div className="ad-hr-controls">
          <input 
            type="text" 
            placeholder="Nome do novo Dentista" 
            value={newDentistName}
            onChange={(e) => setNewDentistName(e.target.value)}
            className="input-field-small"
          />
          <button className="btn btn-secondary btn-small" onClick={handleAddDentist}>+ Add Staff</button>
        </div>
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

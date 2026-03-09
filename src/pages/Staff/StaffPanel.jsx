import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import './StaffPanel.css';

export default function StaffPanel() {
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus, updateAppointmentNotes } = useData();

  // Filter only the logged in dentist's appointments
  const myAppointments = appointments.filter(app => app.dentista_id === user.id);

  // Sort them by start time
  myAppointments.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  return (
    <div className="staff-panel animate-fade-in">
      <header className="sp-header">
        <div className="sp-header-title">
          <h1>Painel Odontológico</h1>
          <p>Bem-vindo(a), <span className="text-gold">{user.name}</span></p>
        </div>
        <div className="sp-header-actions">
          <button className="btn btn-secondary">Bloquear Horário</button>
        </div>
      </header>

      <main className="sp-main">
        <section className="sp-agenda">
          <h2>Agenda de Hoje</h2>
          
          <div className="sp-appointments-list">
            {myAppointments.length === 0 ? (
              <p className="no-data">Nenhuma consulta agendada para hoje.</p>
            ) : null}

            {myAppointments.map(app => (
              <AppointmentCard 
                key={app.id} 
                app={app} 
                updateStatus={updateAppointmentStatus} 
                updateNotes={updateAppointmentNotes}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Internal component for the card
function AppointmentCard({ app, updateStatus, updateNotes }) {
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesTemp, setNotesTemp] = useState(app.notes);

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Aguardando': return 'status-waiting';
      case 'Em Atendimento': return 'status-progress';
      case 'Finalizado': return 'status-finished';
      default: return '';
    }
  };

  const handleNotesSave = () => {
    updateNotes(app.id, notesTemp);
    setEditingNotes(false);
  };

  return (
    <div className={`sp-card ${app.status === 'Finalizado' ? 'card-dimmed' : ''}`}>
      <div className="sp-card-time">
        <span>{formatTime(app.start_time)}</span>
        <span className="time-separator">até</span>
        <span>{formatTime(app.end_time)}</span>
      </div>
      
      <div className="sp-card-details">
        <h3>{app.user_name}</h3>
        
        <div className="sp-card-controls">
          <select 
            value={app.status} 
            onChange={(e) => updateStatus(app.id, e.target.value)}
            className={`status-selector ${getStatusClass(app.status)}`}
          >
            <option value="Aguardando">Aguardando</option>
            <option value="Em Atendimento">Em Atendimento</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        <div className="sp-card-notes">
          {editingNotes ? (
            <div className="notes-edit-mode">
              <textarea 
                value={notesTemp} 
                onChange={(e) => setNotesTemp(e.target.value)}
                placeholder="Adicionar observações clínicas..."
                rows={3}
              />
              <div className="notes-actions">
                <button className="btn-small save" onClick={handleNotesSave}>Salvar</button>
                <button className="btn-small cancel" onClick={() => setEditingNotes(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="notes-view-mode" onClick={() => setEditingNotes(true)}>
              {app.notes ? (
                <p>📝 {app.notes}</p>
              ) : (
                <span className="add-notes-btn">+ Adicionar Obs. Clínica</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

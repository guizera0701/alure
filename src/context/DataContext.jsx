import React, { createContext, useState, useContext } from 'react';

export const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Helper to generate a today date string (YYYY-MM-DD)
const todayStr = new Date().toISOString().split('T')[0];

const initialDentists = [
  { id: 1, name: 'Dr. Arthur V.', login: 'arthur', password: '123' },
  { id: 2, name: 'Dra. Beatriz S.', login: 'beatriz', password: '123' }
];

const initialAppointments = [
  { id: 101, dentista_id: 1, user_name: 'Carlos Oliveira', start_time: `${todayStr}T09:00`, end_time: `${todayStr}T10:00`, status: 'Finalizado', notes: 'Limpeza concluída com sucesso.' },
  { id: 102, dentista_id: 1, user_name: 'Ana Costa', start_time: `${todayStr}T11:00`, end_time: `${todayStr}T12:00`, status: 'Em Atendimento', notes: '' },
  { id: 103, dentista_id: 2, user_name: 'Paulo Silva', start_time: `${todayStr}T09:30`, end_time: `${todayStr}T10:30`, status: 'Aguardando', notes: '' },
];

const initialRequests = [
  { id: 201, user_name: 'Julia Ramos', contact: 'julia@email.com', specialty: 'Implante', requested_time: `${todayStr}T14:00`, status: 'Pendente' }
];

export const DataProvider = ({ children }) => {
  const [dentists, setDentists] = useState(initialDentists);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [requests, setRequests] = useState(initialRequests);

  // Request an appointment (Visitor flow)
  const addRequest = (requestData) => {
    const newReq = {
      ...requestData,
      id: Date.now(),
      status: 'Pendente'
    };
    setRequests(prev => [...prev, newReq]);
  };

  // Approves request & schedules (Admin flow)
  const approveRequest = (requestId, dentista_id) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    // Default to 1 hour duration
    const start_time = request.requested_time;
    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour
    const end_timeStr = endDate.toISOString().slice(0, 16);

    // Collision Check
    const hasConflict = appointments.some(app => {
      if (app.dentista_id !== dentista_id) return false;
      const appStart = new Date(app.start_time).getTime();
      const appEnd = new Date(app.end_time).getTime();
      const reqStart = startDate.getTime();
      const reqEnd = endDate.getTime();
      
      // Overlap condition:
      return (reqStart < appEnd && reqEnd > appStart);
    });

    if (hasConflict) {
      alert('Erro: Choque de horários detectado para este dentista!');
      return false;
    }

    const newAppointment = {
      id: Date.now(),
      dentista_id,
      user_name: request.user_name,
      start_time: start_time,
      end_time: end_timeStr,
      status: 'Aguardando',
      notes: ''
    };

    setAppointments(prev => [...prev, newAppointment]);
    setRequests(prev => prev.filter(r => r.id !== requestId));
    return true;
  };

  const rejectRequest = (requestId) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  // Staff Flow - Update status
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };
  
  // Staff Flow - Add notes
  const updateAppointmentNotes = (id, notes) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, notes } : app));
  };

  // Admin / HR Flow
  const addDentist = (name, login, password) => {
    setDentists(prev => [...prev, { id: Date.now(), name, login, password }]);
  };
  const removeDentist = (id) => {
    setDentists(prev => prev.filter(d => d.id !== id));
    // Also remove their appointments to clean up
    setAppointments(prev => prev.filter(a => a.dentista_id !== id));
  };

  return (
    <DataContext.Provider value={{
      dentists,
      appointments,
      requests,
      addRequest,
      approveRequest,
      rejectRequest,
      updateAppointmentStatus,
      updateAppointmentNotes,
      addDentist,
      removeDentist
    }}>
      {children}
    </DataContext.Provider>
  );
};

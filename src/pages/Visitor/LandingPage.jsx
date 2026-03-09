import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './LandingPage.css';

export default function LandingPage() {
  const { addRequest } = useData();
  const [formData, setFormData] = useState({
    user_name: '',
    contact: '',
    specialty: 'Avaliação Geral',
    requested_time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Helper to restrict dates to future only
  const todayStr = new Date().toISOString().slice(0, 16);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.contact || !formData.requested_time) return;
    
    addRequest(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        user_name: '',
        contact: '',
        specialty: 'Avaliação Geral',
        requested_time: ''
      });
    }, 4000);
  };

  return (
    <div className="landing-page animate-fade-in">
      {/* Header */}
      <header className="lp-header">
        <div className="lp-logo">Alure</div>
        <nav className="lp-nav">
          <a href="#about">A Clínica</a>
          <a href="#services">Tratamentos</a>
          <a href="#contact" className="btn btn-secondary">Agendar Agora</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          <h1>Odontologia de Excelência.</h1>
          <p>
            Uma experiência focada no seu bem-estar, unindo alta tecnologia, 
            estética impecável e um atendimento exclusivo para revelar o seu melhor sorriso.
          </p>
          <a href="#contact" className="btn btn-primary lp-cta-btn">Solicitar Avaliação</a>
        </div>
        <div className="lp-hero-image">
          {/* Aesthetic Placeholder for a dark minimal clinic environment */}
          <div className="image-placeholder"></div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="contact" className="lp-form-section">
        <div className="lp-form-container">
          <h2>Agende sua Consulta</h2>
          <p>Preencha os dados abaixo e nossa equipe confirmará a disponibilidade do seu horário.</p>
          
          {submitted ? (
            <div className="success-message">
              <h3>Solicitação Pendente</h3>
              <p>Recebemos sua solicitação! Em breve nossa equipe entrará em contato para confirmar o horário escolhido.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="input-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  name="user_name" 
                  className="input-field" 
                  value={formData.user_name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ex: Maria Silva"
                />
              </div>
              
              <div className="input-group">
                <label>Contato (Telefone/Email)</label>
                <input 
                  type="text" 
                  name="contact" 
                  className="input-field" 
                  value={formData.contact} 
                  onChange={handleChange} 
                  required 
                  placeholder="Seu telefone ou email"
                />
              </div>

              <div className="input-group">
                <label>Especialidade de Interesse</label>
                <select 
                  name="specialty" 
                  className="input-field" 
                  value={formData.specialty} 
                  onChange={handleChange}
                >
                  <option value="Avaliação Geral">Avaliação Geral</option>
                  <option value="Implantodontia">Implantodontia</option>
                  <option value="Estética Dental (Lentes/Facetas)">Estética Dental</option>
                  <option value="Ortodontia Invisível">Ortodontia Invisível</option>
                </select>
              </div>

              <div className="input-group">
                <label>Data e Hora Desejada</label>
                <input 
                  type="datetime-local" 
                  name="requested_time" 
                  className="input-field" 
                  value={formData.requested_time} 
                  onChange={handleChange} 
                  min={todayStr}
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Solicitar Agendamento
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

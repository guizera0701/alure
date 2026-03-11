import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './TreatmentsPage.css';

import docImplant from '../../img/doc_implant.png';
import docEstetica from '../../img/doc_estetica.png';
import docOrto from '../../img/doc_orto.png';
import docPrev from '../../img/doc_prev.png';

export default function TreatmentsPage() {
  const { switchView } = useAuth();

  const treatments = [
    {
      id: 'implantodontia',
      title: 'Implantodontia',
      description: 'Recupere a funcionalidade e a estética do seu sorriso com implantes dentários de alta tecnologia. Nossos especialistas utilizam materiais biocompatíveis que garantem segurança, durabilidade e um aspecto natural.',
      doctor: 'Dr. Lucas Moraes',
      image: docImplant
    },
    {
      id: 'estetica',
      title: 'Estética Dental',
      description: 'Transforme seu sorriso com lentes de contato dental e facetas de porcelana. Procedimentos minimamente invasivos que corrigem cor, formato e alinhamento dos dentes, proporcionando uma harmonia facial perfeita.',
      doctor: 'Dra. Carolina Mendes',
      image: docEstetica
    },
    {
      id: 'ortodontia',
      title: 'Ortodontia Invisível',
      description: 'Alinhe seus dentes de forma discreta e confortável com alinhadores transparentes de última geração. Sem os incômodos dos aparelhos metálicos tradicionais, o tratamento é previsível e estético do início ao fim.',
      doctor: 'Dr. Rafael Costa',
      image: docOrto
    },
    {
      id: 'prevencao',
      title: 'Prevenção e Limpeza',
      description: 'A base de um sorriso saudável. Realizamos profilaxia avançada, raspagem e aplicação de flúor para manter sua saúde bucal em dia, prevenindo problemas antes que eles ocorram.',
      doctor: 'Dra. Juliana Silva',
      image: docPrev
    }
  ];

  return (
    <div className="treatments-page animate-fade-in">
      {/* Header with return button */}
      <header className="tp-header">
        <button 
          onClick={() => switchView('visitor')}
          className="btn-back"
          title="Voltar para Home"
        >
          ⬅ Voltar
        </button>
        <div className="lp-logo">Alure</div>
      </header>

      {/* Hero Section */}
      <section className="tp-hero">
        <div className="tp-hero-content">
          <h1>Nossos Tratamentos</h1>
          <p>Soluções completas e personalizadas para a saúde e estética do seu sorriso, com tecnologia de ponta e especialistas dedicados.</p>
        </div>
      </section>

      {/* Treatments List */}
      <section className="tp-list-section">
        <div className="tp-grid">
          {treatments.map(treatment => (
            <div key={treatment.id} className="tp-card">
              <div className="tp-card-image">
                <img src={treatment.image} alt={treatment.doctor} />
              </div>
              <h4 className="tp-doctor-name">Especialista: {treatment.doctor}</h4>
              <h2>{treatment.title}</h2>
              <p>{treatment.description}</p>
            </div>
          ))}
        </div>
        
        <div className="tp-cta-container">
          <h3>Pronto para transformar seu sorriso?</h3>
          <button 
            onClick={() => switchView('visitor')} 
            className="btn btn-primary tp-cta-btn"
          >
            Agendar Avaliação
          </button>
        </div>
      </section>
    </div>
  );
}

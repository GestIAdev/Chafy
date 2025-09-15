import React from 'react';
import './UbicacionSection.css';

export default function UbicacionSection() {
  const sectionStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 0,
    boxSizing: 'border-box',
    minHeight: 0,
    minWidth: 0,
    border: 'none',
    background: 'radial-gradient(circle at 50% 50%, rgba(233,30,99,0.13) 0%, rgba(24,24,27,0.80) 55%, rgba(24,24,27,0.0) 100%)',
    boxShadow: '0 4px 24px #0006, 0 2px 12px #ff980033',
    fontFamily: "'Montserrat', 'Roboto', sans-serif",
    padding: 0,
    color: '#fff'
  };
  return (
    <section className="ubicacion-section" style={sectionStyle}>
      {/* Título eliminado para mejor cuadre visual */}
      <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto', textAlign: 'center', lineHeight: '1.6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <iframe
          title="Ubicación Bar Chafy"
          src="https://www.google.com/maps?q=aristides+villanueva+500,+mendoza&output=embed"
          width="100%"
          height="220"
          style={{ border: 0, borderRadius: '12px', minHeight: '160px', maxWidth: '400px', marginBottom: '1rem', display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div style={{ fontSize: '1.1rem', margin: 0, color: '#fff' }}>
          <strong>Aristides Villanueva 500</strong><br />
          Ciudad de Mendoza, Argentina
        </div>
      </div>
    </section>
  );
}

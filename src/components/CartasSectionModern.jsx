import React from 'react';
import './CartasSectionModern.css';
import './panel-block.css';
import { useState } from 'react';

export default function CartasSectionModern() {
  // Slider de cartas
  const cartas = [
    { src: '/images/vinoalbum.png', alt: 'Vino' },
    { src: '/images/CartaAlbumburguer.png', alt: 'Hamburguesa' },
    { src: '/images/entrantesalbum.png', alt: 'Entrantes' },
  ];
  const [start, setStart] = useState(0);
  const getIndex = (offset) => (start + offset + cartas.length) % cartas.length;

  const handleLeft = () => setStart((prev) => (prev - 1 + cartas.length) % cartas.length);
  const handleRight = () => setStart((prev) => (prev + 1) % cartas.length);

  const sectionStyle = {
    width: '100%',
    height: '100%',
    minHeight: 0,
    minWidth: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    border: 'none',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at 50% 50%, rgba(209,61,61,0.13) 0%, rgba(24,24,27,0.80) 55%, rgba(24,24,27,0.0) 100%)',
    boxShadow: '0 4px 24px #0006',
    fontFamily: "'Montserrat', 'Roboto', sans-serif",
    padding: '2.5rem 1.5rem 2rem 1.5rem',
  };

  return (
    <section className="cartas-modern-section panel-block" style={sectionStyle}>
      <h2 className="cartas-modern-title" style={{marginTop: 0, paddingTop: 0}}>Juntá cartas y ganá</h2>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <button className="cartas-slider-arrow" onClick={handleLeft} aria-label="Anterior">&#8592;</button>
        <div className="cartas-modern-panel-redesign">
          <div className="carta-modern carta-modern-side">
            <div className="carta-modern-img-wrap">
              <img src={cartas[getIndex(0)].src} alt={cartas[getIndex(0)].alt} className="carta-modern-img" />
              <div className="carta-modern-overlay"></div>
            </div>
          </div>
          <div className="carta-modern carta-modern-center">
            <div className="carta-modern-img-wrap">
              <img src={cartas[getIndex(1)].src} alt={cartas[getIndex(1)].alt} className="carta-modern-img" />
              <div className="carta-modern-overlay"></div>
            </div>
          </div>
          <div className="carta-modern carta-modern-side">
            <div className="carta-modern-img-wrap">
              <img src={cartas[getIndex(2)].src} alt={cartas[getIndex(2)].alt} className="carta-modern-img" />
              <div className="carta-modern-overlay"></div>
            </div>
          </div>
        </div>
        <button className="cartas-slider-arrow" onClick={handleRight} aria-label="Siguiente">&#8594;</button>
      </div>
    </section>
  );
}

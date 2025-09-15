import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import './ComentariosSection.css';
import './GanadorasComentarios.css';
import './panel-block.css';

const comentarios = [
  {
    nombre: 'Sofía G.',
    texto: '¡Excelente atención y la mejor birra artesanal! Volveremos seguro.',
  },
  {
    nombre: 'Valentina P.',
    texto: 'El ambiente es único y la pizza, increíble. ¡Recomendadísimo!',
  },
  {
    nombre: 'Camila R.',
    texto: 'Las hamburguesas son un 10 y la música, genial. ¡Gracias BarChafy!',
  },
];

export default function GanadorasComentarios() {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % comentarios.length);
    }, 2000);
    return () => clearTimeout(timeoutRef.current);
  }, [active]);

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at 50% 50%, rgba(76,175,80,0.18) 0%, rgba(24,24,27,0.80) 55%, rgba(24,24,27,0.0) 100%)',
    boxShadow: '0 4px 24px #0006, 0 2px 12px #ff980033',
    fontFamily: "'Montserrat', 'Roboto', sans-serif",
    margin: 0,
    padding: '2.5rem 1.5rem 2rem 1.5rem',
  };
  return (
    <section
      className="ganadoras-comentarios-wrapper panel-block"
      style={sectionStyle}
    >
      <div
        className="ganadoras-img-col"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          marginTop: 0,
          paddingTop: 0
        }}
      >
        <img
          src={'/images/ganadoras.jpg'}
          alt="Ganadoras de la semana"
          className="ganadoras-img"
          style={{ display: 'block', margin: '0 auto' }}
        />
        <div
          className="ganadoras-nombres-fecha"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <span
            style={{
              color: '#ff9800',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: 1,
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            Sofia, Camila y Valentina
          </span>
          <span
            style={{
              color: '#232323',
              background: '#ffecb3',
              display: 'inline-block',
              borderRadius: 8,
              padding: '4px 16px',
              fontWeight: 700,
              fontSize: '1rem',
              marginTop: 2,
              boxShadow: '0 1px 6px #ff980033',
              textAlign: 'center',
            }}
          >
            19/7/2025
          </span>
        </div>
      </div>
      <div className="comentarios-slider-col">
        <h2 className="ganadoras-section-title" style={{ marginBottom: 18 }}>
          Ganadoras de la semana
        </h2>
        <div
          style={{
            width: '100%',
            minHeight: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {comentarios.map((c, i) => (
            <div
              key={i}
              className="comentario"
              style={{
                opacity: i === active ? 1 : 0,
                pointerEvents: i === active ? 'auto' : 'none',
                position: i === active ? 'relative' : 'absolute',
                transition: 'opacity 0.5s',
                width: '100%',
                display: i === active ? 'block' : 'none',
              }}
            >
              <div
                className="estrellas"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} color="#FFD700" size={18} />
                ))}
              </div>
              <p
                className="comentario-texto"
                style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  marginBottom: 8,
                }}
              >
                {c.texto}
              </p>
              <span
                className="comentario-nombre"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: '#ff9800',
                  fontWeight: 700,
                }}
              >
                - {c.nombre}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16,
          }}
        >
          {comentarios.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: 'none',
                background: i === active ? '#ff9800' : '#fff',
                opacity: i === active ? 1 : 0.5,
                cursor: 'pointer',
                transition: 'background 0.2s, opacity 0.2s',
                outline: 'none',
                boxShadow:
                  i === active ? '0 0 0 2px #ff980055' : 'none',
                margin: 0,
                padding: 0,
              }}
              aria-label={`Ver comentario ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

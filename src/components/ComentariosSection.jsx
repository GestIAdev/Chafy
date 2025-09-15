import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';

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

export default function ComentariosSection() {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % comentarios.length);
    }, 2000);
    return () => clearTimeout(timeoutRef.current);
  }, [active]);

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: 320, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 18, 
      background: 'rgba(35,35,35,0.8)', 
      padding: '2rem 1.5rem', 
      boxShadow: '0 2px 12px #0003', 
      width: '100%', 
      zIndex: 10 
    }}>
      <h2 style={{ 
        marginBottom: 18,
        color: '#ff9800',
        fontWeight: 800,
        fontSize: '1.8rem',
        textAlign: 'center'
      }}>
        Ganadoras de la semana
      </h2>
      <div style={{ 
        width: '100%', 
        minHeight: 120, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative' 
      }}>
        {comentarios.map((c, i) => (
          <div
            key={i}
            style={{
              opacity: i === active ? 1 : 0,
              pointerEvents: i === active ? 'auto' : 'none',
              position: i === active ? 'relative' : 'absolute',
              transition: 'opacity 0.5s',
              width: '100%',
              display: i === active ? 'block' : 'none',
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: 8 
            }}>
              {[...Array(5)].map((_, idx) => (
                <FaStar key={idx} color="#FFD700" size={18} />
              ))}
            </div>
            <p style={{ 
              textAlign: 'center', 
              fontSize: '1.1rem', 
              marginBottom: 8,
              color: '#fff'
            }}>
              {c.texto}
            </p>
            <span style={{ 
              display: 'block', 
              textAlign: 'center', 
              color: '#ff9800', 
              fontWeight: 700 
            }}>
              - {c.nombre}
            </span>
          </div>
        ))}
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 8, 
        marginTop: 16 
      }}>
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
              boxShadow: i === active ? '0 0 0 2px #ff980055' : 'none',
              margin: 0,
              padding: 0,
            }}
            aria-label={`Ver comentario ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

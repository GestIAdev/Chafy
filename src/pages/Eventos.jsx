import React from 'react';
import { useEffect } from 'react';

const Eventos = () => {
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevBgSize = document.body.style.backgroundSize;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    document.body.style.background = "linear-gradient(135deg, #18120a 0%, #2c1f14 100%)";
    document.body.style.backgroundSize = 'cover';
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.background = prevBg;
      document.body.style.backgroundSize = prevBgSize;
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
    };
  }, []);
  const eventos = [
    {
      id: 1,
      title: "Noche de Karaoke",
      date: "2025-08-15",
      description: "¡Ven a demostrar tu talento! Noche de karaoke con premios para los mejores cantantes.",
      image: "/images/banner2.jpg"
    },
    {
      id: 2,
      title: "Cena Temática Italiana",
      date: "2025-08-22",
      description: "Una noche especial con los mejores sabores de Italia. Menú especial y música en vivo.",
      image: "/images/banner2.jpg"
    },
    {
      id: 3,
      title: "After Office Viernes",
      date: "2025-08-25",
      description: "Relájate después del trabajo con nuestro happy hour especial. 2x1 en bebidas seleccionadas.",
      image: "/images/banner2.jpg"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18120a 0%, #2c1f14 100%)',
      color: '#fff',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: '#ff9800', 
          textAlign: 'center',
          marginBottom: '3rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Próximos Eventos
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {eventos.map((evento) => (
            <div key={evento.id} style={{
              background: 'rgba(255, 152, 0, 0.1)',
              border: '2px solid #ff9800',
              borderRadius: '12px',
              padding: '2rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                backgroundImage: `url(${evento.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid #ff9800'
              }} />
              
              <h3 style={{ 
                color: '#ff9800', 
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                {evento.title}
              </h3>
              
              <p style={{ 
                color: '#fff', 
                fontSize: '1rem',
                marginBottom: '1rem',
                opacity: 0.9
              }}>
                📅 {new Date(evento.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              
              <p style={{ 
                color: '#ccc', 
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {evento.description}
              </p>
              
              <button style={{
                background: '#ff9800',
                color: '#18120a',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                width: '100%'
              }}>
                Reservar Mesa
              </button>
            </div>
          ))}
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 152, 0, 0.05)',
          borderRadius: '12px',
          border: '1px solid #ff9800'
        }}>
          <h2 style={{ color: '#ff9800', marginBottom: '1rem' }}>
            🎉 ¿Quieres organizar tu evento?
          </h2>
          <p style={{ 
            color: '#fff', 
            fontSize: '1.1rem',
            marginBottom: '1.5rem'
          }}>
            Contamos con el espacio perfecto para cumpleaños, despedidas, reuniones de trabajo y celebraciones especiales.
          </p>
          <button style={{
            background: 'transparent',
            color: '#ff9800',
            border: '2px solid #ff9800',
            padding: '1rem 2rem',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Contactar para Eventos Privados
          </button>
        </div>
      </div>
      </div>
  );
    }
export default Eventos;

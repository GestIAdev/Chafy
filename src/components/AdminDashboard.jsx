import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const [msg, setMsg] = useState('');
  const showMsg = (txt) => {
    setMsg(txt);
    setTimeout(() => setMsg(''), 1800);
  };
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
  return (
    <div style={{ 
        minHeight: '100vh', 
        width: '100vw', 
        fontFamily: "'Montserrat', 'Roboto', sans-serif",
        paddingTop: '120px' // Espacio para la navbar fija
      }}>
      <main style={{ 
        maxWidth: 900, 
        margin: '48px auto', 
        background: 'rgba(35,35,35,0.95)', 
        borderRadius: 18, 
        boxShadow: '0 4px 24px #0006', 
        padding: '2.5rem 2rem' 
      }}>
        <h2 style={{ 
          color: '#ff9800', 
          fontWeight: 800, 
          fontSize: '2.2rem', 
          marginBottom: 24 
        }}>
          Panel de Administración
        </h2>
        <p style={{ 
          color: '#fff', 
          fontSize: '1.1rem', 
          marginBottom: 32 
        }}>
          Bienvenido, admin. Desde aquí puedes gestionar los <b>eventos</b> de la web, añadir o quitar fotos del slider, y actualizar el calendario.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: 24, 
          flexWrap: 'wrap' 
        }}>
          <Link 
            to="/admin/eventos" 
            style={{
              background: '#18120a',
              color: '#ff9800',
              border: '2px solid #ff9800',
              borderRadius: 10,
              padding: '10px 22px',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '1.08rem',
              boxShadow: '0 2px 12px #0008',
              transition: 'all .2s',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Gestionar eventos
          </Link>
          <button 
            type="button" 
            onClick={() => showMsg('Herramienta en desarrollo')} 
            style={{
              background: '#18120a',
              color: '#ff9800',
              border: '2px solid #ff9800',
              borderRadius: 10,
              padding: '10px 22px',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '1.08rem',
              boxShadow: '0 2px 12px #0008',
              transition: 'all .2s'
            }}
          >
            Gestión de menú
          </button>
          <button 
            type="button" 
            onClick={() => showMsg('Herramienta en desarrollo')} 
            style={{
              background: '#18120a',
              color: '#ff9800',
              border: '2px solid #ff9800',
              borderRadius: 10,
              padding: '10px 22px',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '1.08rem',
              boxShadow: '0 2px 12px #0008',
              transition: 'all .2s'
            }}
          >
            Gestión de reseñas
          </button>
          {msg && (
            <div style={{
              position: 'fixed',
              top: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#232323',
              color: '#ff9800',
              padding: '10px 28px',
              borderRadius: 10,
              fontWeight: 800,
              fontSize: '1.08rem',
              boxShadow: '0 2px 12px #0008',
              zIndex: 9999,
              pointerEvents: 'none',
              opacity: 0.97
            }}>
              {msg}
            </div>
          )}
        </div>
      </main>
      </div>
  );
};

export default AdminDashboard;

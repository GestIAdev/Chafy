import React, { useState } from 'react';
import { useEffect } from 'react';

const Contacto = () => {
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
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí conectaremos con el backend más tarde
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    setForm({ name: '', email: '', message: '' });
  };

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
          Contacto
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Información de contacto */}
          <div style={{
            background: 'rgba(255, 152, 0, 0.1)',
            border: '2px solid #ff9800',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#ff9800', marginBottom: '2rem' }}>
              📍 Información de Contacto
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#ff9800', marginBottom: '0.5rem' }}>📧 Email</h3>
              <p style={{ color: '#fff', fontSize: '1.1rem' }}>barchafi@gmail.com</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#ff9800', marginBottom: '0.5rem' }}>📞 Teléfono</h3>
              <p style={{ color: '#fff', fontSize: '1.1rem' }}>+54 9 261 5432-5412</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#ff9800', marginBottom: '0.5rem' }}>📍 Dirección</h3>
              <p style={{ color: '#fff', fontSize: '1.1rem' }}>
                Aristides Villanueva al 500<br />
                Ciudad de Mendoza, Argentina
              </p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#ff9800', marginBottom: '0.5rem' }}>🕒 Horarios</h3>
              <p style={{ color: '#fff', fontSize: '1.1rem' }}>
                Lunes a Jueves: 18:00 - 02:00<br />
                Viernes y Sábados: 18:00 - 03:00<br />
                Domingos: 18:00 - 01:00
              </p>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div style={{
            background: 'rgba(255, 152, 0, 0.1)',
            border: '2px solid #ff9800',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#ff9800', marginBottom: '2rem' }}>
              💬 Envíanos un Mensaje
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ color: '#ff9800', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ color: '#ff9800', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ color: '#ff9800', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  background: '#ff9800',
                  color: '#18120a',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '6px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
        
        {/* Sección de reservas */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 152, 0, 0.05)',
          borderRadius: '12px',
          border: '1px solid #ff9800'
        }}>
          <h2 style={{ color: '#ff9800', marginBottom: '1rem' }}>
            🍽️ Reservas de Mesa
          </h2>
          <p style={{ 
            color: '#fff', 
            fontSize: '1.1rem',
            marginBottom: '1.5rem'
          }}>
            ¿Quieres asegurar tu mesa? ¡Llámanos o envíanos un WhatsApp!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: '#25d366',
              color: '#fff',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              WhatsApp: +54 9 261 5432-5412
            </button>
            <button style={{
              background: 'transparent',
              color: '#ff9800',
              border: '2px solid #ff9800',
              padding: '1rem 2rem',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Llamar: +54 9 261 5432-5412
            </button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Contacto;

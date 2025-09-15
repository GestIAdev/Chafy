import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Contacto = () => {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError('Completa todos los campos.');
      return;
    }
    setEnviado(true);
    setForm({ nombre: '', email: '', mensaje: '' });
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/images/imagencontacto.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width: '100%',
        margin: 0,
        padding: '120px 2rem 2.5rem 2rem',
        minHeight: '100vh',
        color: '#fff',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: -1,
      }}
    >
      <h2 style={{
        color: '#ff9800', 
        fontSize: '2.2rem', 
        fontWeight: 800, 
        marginBottom: 8, 
        textAlign: 'center', 
        letterSpacing: 1,
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
      }}>
        Contacto
      </h2>
      <p style={{
        color: '#fff', 
        textAlign: 'center', 
        marginBottom: 32, 
        fontSize: '1.1rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
      }}>
        ¡Estamos para ayudarte! Puedes contactarnos por WhatsApp, Instagram, visitarnos en el local o enviarnos un mensaje directo.
      </p>
      
      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: 32, 
        marginBottom: 48
      }}>
        <div style={{
          background: 'rgba(35,35,35,0.8)', 
          borderRadius: 14, 
          padding: '1.5em 2em', 
          minWidth: 220, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 18, 
          boxShadow: '0 2px 8px #0002'
        }}>
          <FaWhatsapp size={32} color="#25D366" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, color: '#fff' }}>WhatsApp</div>
            <a 
              href="https://wa.me/5491123456789" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}
            >
              +54 9 11 2345-6789
            </a>
          </div>
        </div>
        
        <div style={{
          background: 'rgba(35,35,35,0.8)', 
          borderRadius: 14, 
          padding: '1.5em 2em', 
          minWidth: 220, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 18, 
          boxShadow: '0 2px 8px #0002'
        }}>
          <FaInstagram size={32} color="#E1306C" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, color: '#fff' }}>Instagram</div>
            <a 
              href="https://instagram.com/barchafy" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#E1306C', fontWeight: 600, textDecoration: 'none' }}
            >
              @barchafy
            </a>
          </div>
        </div>
        
        <div style={{
          background: 'rgba(35,35,35,0.8)', 
          borderRadius: 14, 
          padding: '1.5em 2em', 
          minWidth: 220, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 18, 
          boxShadow: '0 2px 8px #0002'
        }}>
          <FaEnvelope size={32} color="#ff9800" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, color: '#fff' }}>Email</div>
            <a 
              href="mailto:contacto@barchafy.com" 
              style={{ color: '#ff9800', fontWeight: 600, textDecoration: 'none' }}
            >
              contacto@barchafy.com
            </a>
          </div>
        </div>
        
        <div style={{
          background: 'rgba(35,35,35,0.8)', 
          borderRadius: 14, 
          padding: '1.5em 2em', 
          minWidth: 220, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 18, 
          boxShadow: '0 2px 8px #0002'
        }}>
          <FaMapMarkerAlt size={32} color="#ff9800" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, color: '#fff' }}>Dirección</div>
            <span style={{ color: '#ff9800', fontWeight: 600 }}>
              Manuel Belgrano 1234, CABA
            </span>
          </div>
        </div>
      </div>
      
      <div style={{
        maxWidth: 420, 
        margin: '0 auto', 
        background: 'rgba(35,35,35,0.8)', 
        borderRadius: 14, 
        padding: '2em 2em 1.5em 2em', 
        boxShadow: '0 2px 12px #0003'
      }}>
        <h2 style={{
          color: '#ff9800',
          fontWeight: 800,
          fontSize: '1.35rem',
          textAlign: 'center',
          marginBottom: '1.2em',
          letterSpacing: 1
        }}>
          Haz tu reserva ahora para los próximos eventos
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FaEnvelope color="#ff9800" />
              <span style={{ color: '#ff9800', fontWeight: 700, fontSize: '1.1rem' }}>
                Envíanos un mensaje
              </span>
            </div>
            
            <input 
              name="nombre" 
              type="text" 
              placeholder="Tu nombre" 
              value={form.nombre} 
              onChange={handleChange} 
              style={{
                padding: 10, 
                borderRadius: 8, 
                border: '1px solid #ff9800', 
                background: '#181818', 
                color: '#fff', 
                fontSize: '1rem'
              }} 
            />
            
            <input 
              name="email" 
              type="email" 
              placeholder="Tu email" 
              value={form.email} 
              onChange={handleChange} 
              style={{
                padding: 10, 
                borderRadius: 8, 
                border: '1px solid #ff9800', 
                background: '#181818', 
                color: '#fff', 
                fontSize: '1rem'
              }} 
            />
            
            <textarea 
              name="mensaje" 
              placeholder="Escribe tu mensaje..." 
              value={form.mensaje} 
              onChange={handleChange} 
              rows={4} 
              style={{
                padding: 10, 
                borderRadius: 8, 
                border: '1px solid #ff9800', 
                background: '#181818', 
                color: '#fff', 
                fontSize: '1rem', 
                resize: 'vertical'
              }} 
            />
            
            {error && (
              <div style={{ color: '#ff5252', fontWeight: 700, marginTop: 4 }}>
                {error}
              </div>
            )}
            
            {enviado && (
              <div style={{ color: '#25D366', fontWeight: 700, marginTop: 4 }}>
                ¡Mensaje enviado! Te responderemos pronto.
              </div>
            )}
            
            <button 
              type="submit" 
              style={{
                marginTop: 8, 
                background: '#ff9800', 
                color: '#232323', 
                fontWeight: 700, 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 0', 
                fontSize: '1.1rem', 
                cursor: 'pointer', 
                boxShadow: '0 1px 4px #ff9800aa'
              }}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;

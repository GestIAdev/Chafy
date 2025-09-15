import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPortal } from 'react-dom';
import axios from 'axios';

const LoginForm = ({ onClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { login, isLogged } = useAuth();

  useEffect(() => {
    setShowModal(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setValidationErrors({});
    if (isLogged) {
      setError('Ya tienes sesión iniciada');
      return;
    }
    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        setSuccess('¡Bienvenido! Login exitoso.');
        setForm({ email: '', password: '' });
        setTimeout(() => {
          if (onClose) onClose();
        }, 1200);
      } else {
        setError(result.error || 'Error en el login. Verifica tus datos.');
      }
    } catch (err) {
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError('Error en el login. Verifica tus datos.');
      }
    }
  };

  if (!showModal) return null;
  
  // Crear el modal root si no existe
  if (!document.getElementById('modal-root')) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#232323',
          borderRadius: 18,
          padding: '2.2rem 2.2rem 1.5rem 2.2rem',
          minWidth: 340,
          maxWidth: 400,
          width: '90vw',
          boxShadow: '0 4px 24px #0008',
          color: '#fff',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'none',
            border: 'none',
            color: '#ff9800',
            fontSize: 28,
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          ×
        </button>
        
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: 24,
          color: '#ff9800',
          textAlign: 'center',
          letterSpacing: '2px'
        }}>
          Iniciar Sesión
        </h2>

        <div style={{ textAlign: 'center', padding: '8px 16px 12px', fontSize: '0.9rem', color: '#ccc', background: '#2a2a2a', borderRadius: '8px', border: '1px solid #444', margin: '0 auto 20px auto' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#ff9800' }}>Modo Demo</p>
          <p style={{ margin: 0 }}>Use <b style={{ color: '#fff' }}>admin@demo.com</b> para acceder al panel de administrador.</p>
        </div>
        
        {error && <div style={{ color: '#e91e63', marginBottom: 8, textAlign: 'center', fontWeight: 700 }}>{error}</div>}
        {success && <div style={{ color: '#4caf50', marginBottom: 8, textAlign: 'center', fontWeight: 700 }}>{success}</div>}
        
        {Object.keys(validationErrors).length > 0 && (
          <div style={{ color: '#e91e63', marginBottom: 8 }}>
            {Object.values(validationErrors).flat().map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#ff9800', fontWeight: 700 }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%',
                border: '2px solid #ff9800',
                background: '#232323',
                color: '#fff',
                borderRadius: 8,
                padding: 12,
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#ff9800', fontWeight: 700 }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%',
                border: '2px solid #ff9800',
                background: '#232323',
                color: '#fff',
                borderRadius: 8,
                padding: 12,
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLogged}
            style={{
              marginTop: 16,
              background: '#ff9800',
              color: '#232323',
              border: 'none',
              borderRadius: 8,
              padding: 12,
              fontWeight: 800,
              fontSize: '1.1rem',
              cursor: isLogged ? 'not-allowed' : 'pointer',
              opacity: isLogged ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default LoginForm;

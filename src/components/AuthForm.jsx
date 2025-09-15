import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';

const inputStyle = {
  width:'100%',
  padding:'10px 12px',
  borderRadius:8,
  border:'1.5px solid #444',
  background:'#18120a',
  color:'#fff',
  fontSize:'1rem',
  fontWeight:600,
  marginTop:4,
  marginBottom:2,
  boxSizing:'border-box',
  display:'block'
};

const AuthForm = ({ onClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { login } = useAuth();

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
    
    const result = await login(form.email, form.password);
    
    if (result.success) {
      setSuccess('¡Login exitoso!');
      setTimeout(() => {
        if (onClose) onClose();
      }, 800);
    } else {
      setError(result.error || 'Credenciales incorrectas o error en el login.');
    }
  };

  if (!showModal || typeof window === 'undefined' || !document.getElementById('modal-root')) return null;
  return createPortal(
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.7)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
      <div style={{background:'#232323',borderRadius:18,padding:'2.2rem 2.2rem 1.5rem 2.2rem',minWidth:340,maxWidth:400,width:'90vw',boxShadow:'0 4px 24px #0008',color:'#fff',position:'relative'}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'none',border:'none',color:'#ff9800',fontSize:28,cursor:'pointer',fontWeight:700}}>×</button>
        <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#ff9800', textAlign: 'center', marginBottom: 24, letterSpacing: 2 }}>Iniciar sesión</h2>
        {error && <div style={{color:'#e91e63',marginBottom:8,textAlign:'center',fontWeight:700}}>{error}</div>}
        {success && <div style={{color:'#4caf50',marginBottom:8,textAlign:'center',fontWeight:700}}>{success}</div>}
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
          <label style={{fontWeight:700,color:'#ff9800',marginBottom:2}}>Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={{fontWeight:700,color:'#ff9800',marginBottom:2}}>Contraseña
            <input type="password" name="password" value={form.password} onChange={handleChange} required style={inputStyle} />
          </label>
          <button type="submit" style={{marginTop:10,background:'#ff9800',color:'#18120a',border:'none',borderRadius:8,padding:'10px 0',fontWeight:800,fontSize:'1.08rem',cursor:'pointer'}}>Entrar</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default AuthForm;

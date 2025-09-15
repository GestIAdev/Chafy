import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.65)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }} 
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(35,35,35,0.98)',
          borderRadius: 18,
          boxShadow: '0 6px 32px #000a',
          maxWidth: 400,
          width: '92vw',
          position: 'relative',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#ff9800',
            fontWeight: 900,
            fontSize: '2rem',
            cursor: 'pointer',
            zIndex: 2,
            lineHeight: 1,
          }}
          aria-label="Cerrar"
        >
          ×
        </button>
        {title && (
          <div style={{
            width: '100%',
            padding: '18px 0 0 0',
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: '#ff9800',
            letterSpacing: 1,
          }}>
            {title}
          </div>
        )}
        <div style={{ 
          width: '100%', 
          padding: '24px 24px 18px 24px', 
          boxSizing: 'border-box' 
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

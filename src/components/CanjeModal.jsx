import React, { useState } from 'react';
import { menuData } from './MenuData';

const CanjeModal = ({ open, categoria, onClose, onCanjear }) => {
  const productos = menuData.filter(p => p.category === categoria);
  const [seleccionado, setSeleccionado] = useState(null);
  
  if (!open) return null;
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(35,35,35,0.72)',
      zIndex: 99,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20
    }}>
      <div style={{
        background: '#232323',
        borderRadius: 16,
        padding: '2em',
        minWidth: 340,
        maxWidth: '90%',
        boxShadow: '0 2px 16px #0008',
        color: '#fff',
        position: 'relative'
      }}>
        <h3 style={{
          color: '#ff9800',
          marginBottom: 18,
          fontSize: '1.4rem',
          textAlign: 'center'
        }}>
          Elige tu producto gratis de <span style={{fontWeight: 900}}>{categoria}</span>
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxHeight: 300,
          overflowY: 'auto'
        }}>
          {productos.map(p => (
            <div 
              key={p.id} 
              onClick={() => setSeleccionado(p)} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: seleccionado?.id === p.id ? '#ff9800' : '#181818',
                color: seleccionado?.id === p.id ? '#232323' : '#fff',
                borderRadius: 10,
                padding: '10px 12px',
                cursor: 'pointer',
                border: seleccionado?.id === p.id ? '2px solid #fff' : '2px solid #444',
                transition: 'all 0.18s'
              }}
            >
              <img 
                src={p.image} 
                alt={p.name} 
                style={{
                  width: 60,
                  height: 44,
                  objectFit: 'cover',
                  borderRadius: 8
                }} 
              />
              <div style={{flex: 1}}>
                <div style={{
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontSize: 13,
                  color: seleccionado?.id === p.id ? '#232323' : '#aaa'
                }}>
                  Precio: ${p.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: 24,
          justifyContent: 'center'
        }}>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              color: '#ff9800',
              border: '2px solid #ff9800',
              borderRadius: 8,
              padding: '8px 16px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Cancelar
          </button>
          <button 
            onClick={() => seleccionado && onCanjear(seleccionado)}
            disabled={!seleccionado}
            style={{
              background: seleccionado ? '#ff9800' : '#444',
              color: seleccionado ? '#232323' : '#aaa',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontWeight: 700,
              cursor: seleccionado ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
          >
            Canjear Gratis
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanjeModal;

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Datos del menú
export const menuData = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    description: 'Jugosa hamburguesa de ternera con lechuga, tomate y queso cheddar.',
    price: 8500,
    image: '/images/Hamburguesamenu.jpg',
    category: 'Hamburguesas'
  },
  {
    id: 2,
    name: 'Pizza Barbacoa',
    description: 'Pizza con salsa barbacoa, pollo, bacon y cebolla.',
    price: 10000,
    image: '/images/Pizzamenu.jpg',
    category: 'Pizzas'
  },
  {
    id: 3,
    name: 'Salchicha Gigante',
    description: 'Salchicha alemana gigante con pan y mostaza.',
    price: 7000,
    image: '/images/salchichamenu.jpg',
    category: 'Salchichas'
  },
  {
    id: 4,
    name: 'Ensalada César',
    description: 'Ensalada fresca con pollo, parmesano y salsa César.',
    price: 6500,
    image: '/images/ensaladamenu.jpg',
    category: 'Ensaladas'
  },
  {
    id: 5,
    name: 'Nuggets de Pollo',
    description: 'Crujientes nuggets de pollo con salsa barbacoa.',
    price: 5000,
    image: '/images/nuggetsmenu.jpg',
    category: 'Entrantes'
  },
  {
    id: 6,
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla rebozados y fritos.',
    price: 4500,
    image: '/images/aroscebollamenu.jpg',
    category: 'Entrantes'
  },
  {
    id: 7,
    name: 'Patatas Fritas con Queso',
    description: 'Patatas fritas cubiertas de queso fundido.',
    price: 4000,
    image: '/images/papasfritasmenu.jpg',
    category: 'Entrantes'
  }
];

const MenuData = () => {
  const { addToCart } = useCart();
  const { isLogged } = useAuth();
  const [toast, setToast] = useState(null);
  const [pressedId, setPressedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Obtener categorías únicas
  const categories = ['Todas', ...Array.from(new Set(menuData.map(item => item.category)))];

  const handleAdd = (item) => {
    if (!isLogged) return;
    addToCart(item);
    // Las cartas se otorgan solo al confirmar la compra, no al añadir al carrito
    setToast(`¡${item.name} añadido al carrito!`);
    setPressedId(item.id);
    setTimeout(() => setToast(null), 1800);
    setTimeout(() => setPressedId(null), 350);
  };

  // Filtrar productos por categoría
  const filteredMenu = selectedCategory === 'Todas'
    ? menuData
    : menuData.filter(item => item.category === selectedCategory);

  useEffect(() => {
    // Guardar el fondo y estilos anteriores
    const prevBg = document.body.style.background;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    // Aplicar el fondo deseado y estilos anti-scroll
    document.body.style.background = "url('/images/fondomenu.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = 'cover';
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
    // Limpiar al desmontar
    return () => {
      document.body.style.background = prevBg;
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
    };
  }, []);

  return (
    <div
      className="menu-page"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '2rem',
        color: '#fff',
        position: 'relative',
        paddingTop: '88px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        margin: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 32,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? '#ff9800' : '#232323',
              color: selectedCategory === cat ? '#232323' : '#ff9800',
              border: selectedCategory === cat ? '2px solid #ff9800' : '2px solid #ff9800',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 22px',
              cursor: 'pointer',
              transition: 'all 0.18s',
              boxShadow: selectedCategory === cat ? '0 2px 8px #ff980055' : 'none',
              outline: 'none',
              marginBottom: 8,
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <h1
        style={{
          fontSize: '3.2rem',
          fontWeight: 'bold',
          marginBottom: '1.2rem',
          textAlign: 'center',
          width: '100%',
          letterSpacing: '1.5px',
        }}
      >
        Menú
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
      }}>
        {filteredMenu.map(item => (
          <div key={item.id} style={{
            background: 'rgba(35,35,35,0.82)',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem 0.7rem',
            transition: 'transform 0.15s',
            minHeight: '320px',
            position: 'relative',
          }}>
            <img 
              src={item.image} 
              alt={item.name} 
              style={{
                width: '180px',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '1.2rem',
                boxShadow: '0 1px 6px rgba(0,0,0,0.10)'
              }} 
            />
            <h2 style={{fontSize:'1.4rem', fontWeight:'bold', color:'#ff9800', marginBottom:'0.7rem', textAlign:'center'}}>{item.name}</h2>
            <p style={{margin:'0 0 0.7rem 0', textAlign:'center', color:'#fff', fontSize:'1rem'}}>{item.description}</p>
            <span style={{fontWeight:'bold', color:'#fff', fontSize:'1.1rem', marginBottom:'1.2rem'}}>Precio: ${item.price}</span>
            <button
              onClick={() => handleAdd(item)}
              disabled={!isLogged}
              style={{
                marginTop: 'auto',
                background: !isLogged ? '#444' : (pressedId === item.id ? '#ffa733' : '#ff9800'),
                color: !isLogged ? '#bbb' : '#232323',
                fontWeight: 700,
                border: 'none',
                borderRadius: 8,
                padding: '10px 22px',
                fontSize: '1rem',
                cursor: !isLogged ? 'not-allowed' : 'pointer',
                opacity: !isLogged ? 0.6 : 1,
                transition: 'all 0.18s',
                boxShadow: !isLogged ? 'none' : '0 1px 4px rgba(255,152,0,0.35)',
                transform: pressedId === item.id ? 'scale(0.95)' : 'scale(1)'
              }}
              onFocus={() => setPressedId(item.id)}
              onBlur={() => setPressedId(null)}
              title={isLogged ? 'Añadir al carrito' : 'Debes iniciar sesión para comprar'}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: '#232323',
          color: '#ff9800',
          padding: '18px 32px',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          zIndex: 9999,
          opacity: 0.97,
          pointerEvents: 'none',
          letterSpacing: '1px',
          transition: 'opacity 0.3s',
        }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default MenuData;

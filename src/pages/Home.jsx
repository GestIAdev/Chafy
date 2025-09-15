import React from 'react';
import { useEffect } from 'react';
import Banner from '../components/Banner';
import CartasSectionModern from '../components/CartasSectionModern';
import GanadorasComentarios from '../components/GanadorasComentarios';
import Resenas from '../components/Resenas';
import UbicacionSection from '../components/UbicacionSection';

const Home = () => {
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
      background: 'linear-gradient(135deg, #18120a 0%, #2c1f14 100%)',
      color: '#fff'
    }}>
      <Banner />
      
      {/* Sección principal con mensaje de bienvenida */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto 32px auto',
        textAlign: 'center',
        padding: '0 1rem',
      }}>
        <div style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(40,40,40,0.78) 60%, rgba(40,40,40,0.38) 85%, rgba(40,40,40,0.0) 100%)',
          borderRadius: '100px/60px',
          boxShadow: '0 8px 40px 0 #000a, 0 2px 16px #ff980033',
          padding: '2.5rem 2.7rem 2.1rem 2.7rem',
          margin: '0 auto',
          display: 'inline-block',
          maxWidth: '100%',
          border: 'none',
          position: 'relative',
          zIndex: 2,
          transition: 'box-shadow 0.3s',
          backdropFilter: 'blur(1.5px)',
          overflow: 'visible'
        }}>
          <h1 style={{
            color: '#ff9800',
            fontFamily: "'Montserrat', 'Roboto', sans-serif",
            fontWeight: 900,
            fontSize: '2.3rem',
            letterSpacing: '1.5px',
            textShadow: '0 2px 16px #000a, 0 2px 8px #ff980033',
            marginBottom: '0.5rem',
            marginTop: 0
          }}>
            ¡Bienvenido a Bar Chafy!
          </h1>
          <p style={{
            color: '#fff',
            fontFamily: "'Montserrat', 'Roboto', sans-serif",
            fontWeight: 400,
            fontSize: '1.25rem',
            textShadow: '0 2px 8px #0008',
            margin: 0,
            opacity: 0.92,
            marginBottom: '0.5rem'
          }}>
            Disfrutá la mejor experiencia, sabores únicos y la mejor compañía en Mendoza.<br/>
            <a href="/contacto" style={{color:'#ff9800', fontWeight:700, textDecoration:'underline', cursor:'pointer'}}>¡Reservá tu mesa!</a> Organizamos cumpleaños, despedidas, after office y todo tipo de eventos.<br/>
            Más de 10 años de experiencia haciendo de cada encuentro un momento inolvidable.
          </p>
        </div>
      </div>

      {/* Grid de componentes principales */}
      <div className="w-full max-w-6xl mx-auto py-8" style={{background: 'transparent'}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '8px',
          margin: '40px',
          background: 'transparent',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 16px #0008, 0 2px 12px #ff980033'
        }}>
          <div style={{
            border: 'none',
            borderRadius: '24px',
            padding: 0,
            width: '100%',
            maxHeight: '420px',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch'
          }}>
            <CartasSectionModern />
          </div>
          <div style={{
            border: 'none',
            borderRadius: '24px',
            padding: '0',
            width: '100%',
            maxHeight: '420px',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch'
          }}>
            <GanadorasComentarios />
          </div>
          <div style={{
            border: 'none',
            borderRadius: '24px',
            padding: 0,
            width: '100%',
            maxHeight: '380px',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'stretch',
            margin: 0
          }}>
            <Resenas />
          </div>
          <div style={{
            border: 'none',
            borderRadius: '24px',
            padding: 0,
            width: '100%',
            maxHeight: '380px',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'stretch',
            margin: 0
          }}>
            <UbicacionSection />
          </div>
        </div>
      </div>
      </div>
  );
};

export default Home;

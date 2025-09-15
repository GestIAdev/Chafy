import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Resenas.css';

const resenas = [
  {
    nombre: 'Lucas M.',
    texto: '¡El mejor bar de la zona! La atención y la comida son excelentes.',
    estrellas: 5,
    fecha: '2025-07-01'
  },
  {
    nombre: 'Marina S.',
    texto: 'Ambiente cálido y tragos de autor increíbles. ¡Volveré pronto!',
    estrellas: 5,
    fecha: '2025-06-28'
  },
  {
    nombre: 'Ezequiel R.',
    texto: 'Muy buena música y variedad de cervezas. Recomendado.',
    estrellas: 4,
    fecha: '2025-06-20'
  },
];

export default function Resenas() {
  const sectionStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 0,
    boxSizing: 'border-box',
    minHeight: 0,
    minWidth: 0,
    border: 'none',
    background: 'radial-gradient(circle at 50% 50%, rgba(255,152,0,0.16) 0%, rgba(24,24,27,0.80) 55%, rgba(24,24,27,0.0) 100%)',
    boxShadow: '0 4px 24px #0006, 0 2px 12px #ff980033',
    fontFamily: "'Montserrat', 'Roboto', sans-serif",
    padding: 0,
    color: '#fff'
  };
  return (
    <section className="resenas-section" style={sectionStyle}>
      {/* Título eliminado para mejor cuadre visual */}
      <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '420px', margin: '0 auto'}}>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          style={{ width: '100%', maxWidth: 420, height: '100%' }}
        >
          {resenas.map((resena, idx) => (
            <SwiperSlide key={idx}>
              <div style={{
                background: 'rgba(40,40,40,0.78)',
                borderRadius: '16px',
                boxShadow: '0 2px 12px #ff980033',
                padding: '1.2rem',
                margin: 0,
                textAlign: 'center',
                color: '#fff',
                minHeight: '160px',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                <div style={{ marginBottom: '0.7rem' }}>
                  {[...Array(resena.estrellas)].map((_, i) => (
                    <FaStar key={i} color="#ff9800" size={18} style={{ marginRight: 2 }} />
                  ))}
                </div>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.7rem', fontWeight: 500, margin: 0 }}>
                  "{resena.texto}"
                </p>
                <div style={{ fontSize: '0.95rem', color: '#ff9800', fontWeight: 700, margin: 0 }}>
                  {resena.nombre}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.3rem', margin: 0 }}>
                  {new Date(resena.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

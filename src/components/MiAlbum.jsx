import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CanjeModal from './CanjeModal';
import { useCart } from '../context/CartContext';
import { useAlbum } from '../context/AlbumContext';

const categoriaImg = {
  'Hamburguesas': '/images/CartaAlbumburguer.png',
  'Pizzas': '/images/pizzaalbum.png',
  'Salchichas': '/images/Vienesaalbum.png',
  'Ensaladas': '/images/ensaladaalbum.png',
  'Entrantes': '/images/entrantesalbum.png',
  'Bebidas': '/images/vinoalbum.png',
};

const MiAlbum = () => {
  const { album, hasReward, resetCategoria } = useAlbum();
  const { addToCart } = useCart();
  const [canjeCat, setCanjeCat] = useState(null);
  const [efectoConfeti, setEfectoConfeti] = useState(null);

  const categorias = Object.keys(categoriaImg);

  const handleCanjeProducto = (producto) => {
    // Agregar producto gratuito al carrito
    addToCart({ ...producto, precio: 0, premio: true });
    // Resetear cartas de esa categoría
    resetCategoria(canjeCat);
    setCanjeCat(null);
    // Efecto de confeti
    setEfectoConfeti(canjeCat);
    setTimeout(() => setEfectoConfeti(null), 2000);
  };

  useEffect(() => {
    // Aplicar fondo específico
    const prevBg = document.body.style.background;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    
    document.body.style.background = "url('/images/fondoalbum.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = 'cover';
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.background = prevBg;
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '120px 2rem 2rem 2rem',
      color: '#fff',
      fontFamily: "'Montserrat', 'Roboto', sans-serif"
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 800,
        color: '#ff9800',
        textAlign: 'center',
        marginBottom: '2rem',
        letterSpacing: '1px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
      }}>
        Mi Álbum de Cartas
      </h1>
      
      <p style={{
        textAlign: 'center',
        fontSize: '1.2rem',
        marginBottom: '3rem',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
      }}>
        ¡Colecciona cartas comprando productos y canjea premios increíbles!
      </p>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 0'
        }}
      >
        {categorias.map(cat => (
          <SwiperSlide key={cat}>
            <div style={{
              background: 'rgba(35,35,35,0.9)',
              borderRadius: 20,
              padding: '3rem',
              textAlign: 'center',
              minHeight: '700px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              border: '2px solid #ff9800',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}>
              {efectoConfeti === cat && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  overflow: 'hidden',
                  borderRadius: 20
                }}>
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        background: ['#ff9800', '#ffc107', '#ff5722', '#4caf50', '#2196f3'][i % 5],
                        animation: `confeti-fall 2s ease-out ${i * 0.1}s`,
                        left: `${Math.random() * 100}%`,
                        top: '-10px'
                      }}
                    />
                  ))}
                </div>
              )}
              
              <h2 style={{
                fontSize: '2.8rem',
                fontWeight: 700,
                color: '#ff9800',
                marginBottom: '1.5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {cat}
              </h2>
              
              <img 
                src={categoriaImg[cat]} 
                alt={cat}
                style={{
                  width: '280px',
                  height: '380px',
                  objectFit: 'cover',
                  borderRadius: 20,
                  marginBottom: '2rem',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                  border: '3px solid #ff9800',
                  filter: hasReward(cat) ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.7) grayscale(0.3)'
                }}
              />
              
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: hasReward(cat) ? '#4caf50' : '#fff'
              }}>
                {album[cat] || 0} / 5 cartas
              </div>
              
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '2.5rem',
                justifyContent: 'center'
              }}>
                {[1,2,3,4,5].map(i => (
                  <div
                    key={i}
                    style={{
                      width: '35px',
                      height: '45px',
                      background: (album[cat] || 0) >= i 
                        ? 'linear-gradient(45deg, #ff9800, #ffc107)' 
                        : 'linear-gradient(45deg, #333, #444)',
                      borderRadius: '8px',
                      border: '2px solid #666',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      boxShadow: (album[cat] || 0) >= i 
                        ? '0 4px 15px rgba(255,152,0,0.4)' 
                        : '0 2px 8px rgba(0,0,0,0.3)',
                      transform: (album[cat] || 0) >= i ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {(album[cat] || 0) >= i && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}>
                        ★
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {hasReward(cat) ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    color: '#4caf50',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    animation: 'boton-pop 0.6s ease-out'
                  }}>
                    ¡Álbum completado! 🎉
                  </div>
                  <button
                    onClick={() => setCanjeCat(cat)}
                    style={{
                      background: 'linear-gradient(45deg, #ff9800, #ffc107)',
                      color: '#232323',
                      border: 'none',
                      borderRadius: 12,
                      padding: '12px 24px',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(255,152,0,0.4)',
                      transition: 'all 0.3s',
                      animation: 'boton-pop 1s ease-out infinite alternate'
                    }}
                  >
                    ¡Canjear Premio Gratis!
                  </button>
                  <div style={{
                    marginTop: '1.5rem',
                    fontSize: '0.9rem',
                    color: '#aaa',
                    textAlign: 'center'
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      ¡Comparte tu logro en redes sociales!
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <a 
                        href={`https://www.instagram.com/bar_chafy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'linear-gradient(45deg, #E4405F, #C13584)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        <FaInstagram />
                        Instagram
                      </a>
                      
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent('¡Completé un álbum en Bar Chafy! 🎉')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: '#1877F2',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        <FaFacebook />
                        Facebook
                      </a>
                      
                      <a 
                        href={`https://wa.me/?text=${encodeURIComponent('¡Completé un álbum en Bar Chafy! 🎉 ¡Ven a probar sus increíbles productos!')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: '#25D366',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        <FaWhatsapp />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  color: '#aaa',
                  fontSize: '1.1rem',
                  textAlign: 'center'
                }}>
                  Necesitas {5 - (album[cat] || 0)} cartas más para completar este álbum.
                  <br />
                  <span style={{ fontSize: '0.9rem' }}>
                    Compra productos de esta categoría para obtener cartas.
                  </span>
                </div>
              )}
              
              {/* Modal de canje integrado en la página actual del slider */}
              {canjeCat === cat && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 99,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(35,35,35,0.72)',
                  borderRadius: 20
                }}>
                  <CanjeModal 
                    open={true} 
                    categoria={cat} 
                    onClose={() => setCanjeCat(null)} 
                    onCanjear={handleCanjeProducto} 
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style>{`
        @keyframes boton-pop {
          0% { transform: scale(1); }
          30% { transform: scale(1.12); }
          60% { transform: scale(0.96); }
          100% { transform: scale(1); }
        }
        @keyframes confeti-fall {
          0% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(500px) rotate(360deg); 
            opacity: 0; 
          }
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #ff9800 !important;
        }
        .swiper-pagination-bullet {
          background: #ff9800 !important;
        }
        .swiper-pagination-bullet-active {
          background: #ff9800 !important;
        }
      `}</style>
    </div>
  );
};

export default MiAlbum;

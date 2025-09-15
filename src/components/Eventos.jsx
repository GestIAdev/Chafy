import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaMusic, FaPizzaSlice, FaGlassCheers, FaUsers } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Datos de eventos desde localStorage o datos de ejemplo como fallback
function getEventosFromStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem('admin_events'));
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
  } catch (e) {
    console.warn('Error al cargar eventos del localStorage:', e);
  }
  
  // Si no hay eventos guardados, retornar array vacío
  // Los eventos de muestra se pueden migrar con el botón
  return [];
}

// Eventos de muestra para migrar al localStorage
function getEventosMuestra() {
  return [
    {
      id: Date.now() + 1,
      titulo: 'Noche de Karaoke',
      descripcion: 'Ven a cantar tus canciones favoritas',
      fecha: '2025-08-15',
      imagenes: ['/images/chicaskaroke.webp', '/images/Flyerkaraoke.webp', '/images/banner2.jpg'],
      miniatura: 0,
    },
    {
      id: Date.now() + 2,
      titulo: 'Pizza Party',
      descripcion: 'Noche especial de pizzas artesanales',
      fecha: '2025-08-20',
      imagenes: ['/images/pizza.jpg', '/images/Pizzamenu.jpg', '/images/pizzaalbum.png'],
      miniatura: 0,
    },
    {
      id: Date.now() + 3,
      titulo: 'Happy Hour',
      descripcion: '2x1 en todas las bebidas',
      fecha: '2025-08-10',
      imagenes: ['/images/cerveza.jpg', '/images/Cervezamenu.jpg', '/images/vinomenu.jpg'],
      miniatura: 0,
    },
    {
      id: Date.now() + 4,
      titulo: 'Noche de Máscaras',
      descripcion: 'Evento temático con sorpresas',
      fecha: '2025-08-25',
      imagenes: ['/images/chicasmascaras.jpg', '/images/flyermascaras.jpg', '/images/ganadoras.jpg'],
      miniatura: 0,
    },
    {
      id: Date.now() + 5,
      titulo: 'Festival de Parrilla',
      descripcion: 'Las mejores carnes a la parrilla',
      fecha: '2025-08-30',
      imagenes: ['/images/parrilla.webp', '/images/Hamburguesamenu.jpg', '/images/hamburguesa.jpg'],
      miniatura: 0,
    }
  ];
}

// Función para migrar eventos de muestra al localStorage
function migrarEventosMuestra() {
  try {
    const eventosActuales = JSON.parse(localStorage.getItem('admin_events')) || [];
    const eventosMuestra = getEventosMuestra();
    
    // Solo agregar si no hay eventos actuales
    if (eventosActuales.length === 0) {
      localStorage.setItem('admin_events', JSON.stringify(eventosMuestra));
      return eventosMuestra;
    }
    
    return eventosActuales;
  } catch (e) {
    console.warn('Error al migrar eventos de muestra:', e);
    return [];
  }
}

const eventos = getEventosFromStorage();

function getDiasMes(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Función para asignar iconos a eventos según su título
function getIconForEvent(titulo) {
  if (!titulo || typeof titulo !== 'string') {
    return <FaUsers />; // Icono por defecto si no hay título
  }
  
  const tituloLower = titulo.toLowerCase();
  if (tituloLower.includes('karaoke') || tituloLower.includes('música') || tituloLower.includes('concierto')) {
    return <FaMusic />;
  } else if (tituloLower.includes('pizza') || tituloLower.includes('comida') || tituloLower.includes('parrilla')) {
    return <FaPizzaSlice />;
  } else if (tituloLower.includes('happy') || tituloLower.includes('cerveza') || tituloLower.includes('bebida')) {
    return <FaGlassCheers />;
  } else {
    return <FaUsers />;
  }
}

const Eventos = () => {
  const { user } = useAuth(); // Obtener información del usuario
  const [eventos, setEventos] = useState(getEventosFromStorage());
  const [mes, setMes] = useState(new Date().getMonth());
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [diaSel, setDiaSel] = useState(null);
  const [modalEvento, setModalEvento] = useState(null);
  const [tab, setTab] = useState('proximos');

  // Verificar si el usuario es admin
  const isAdmin = user && (user.role === 'admin' || user.email === 'admin@barchafy.com');

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const nuevosEventos = getEventosFromStorage();
      // Agregar iconos a eventos que vienen del localStorage
      const eventosConIconos = nuevosEventos.map(evento => {
        // Validar que el evento tenga las propiedades mínimas
        if (!evento || typeof evento !== 'object') {
          return null;
        }
        
        return {
          ...evento,
          id: evento.id || Date.now() + Math.random(), // ID por defecto si no existe
          titulo: evento.titulo || 'Sin título',
          descripcion: evento.descripcion || 'Sin descripción',
          fecha: evento.fecha || new Date().toISOString().split('T')[0],
          imagenes: Array.isArray(evento.imagenes) ? evento.imagenes : [],
          miniatura: typeof evento.miniatura === 'number' ? evento.miniatura : 0,
          icon: evento.icon || getIconForEvent(evento.titulo)
        };
      }).filter(evento => evento !== null); // Filtrar eventos nulos
      
      setEventos(eventosConIconos);
    };

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // También verificar cambios cuando el componente recibe foco
    window.addEventListener('focus', handleStorageChange);
    
    // Verificar al montar el componente
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const hoy = new Date();
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const eventosProximos = eventos.filter(e => new Date(e.fecha) >= hoySinHora);
  const eventosAnteriores = eventos.filter(e => new Date(e.fecha) < hoySinHora);

  const eventosDia = eventos.filter(e => {
    const fechaEvento = new Date(e.fecha);
    return fechaEvento.getDate() === diaSel && 
           fechaEvento.getMonth() === mes && 
           fechaEvento.getFullYear() === anio;
  });

  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    
    document.body.style.background = "url('/images/imageneventos.jpg') no-repeat center center fixed";
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
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#181818',
        backgroundImage: `linear-gradient(rgba(24,24,24,0.45), rgba(24,24,24,0.55)), url(/images/imageneventos.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />
      
      <div style={{
        padding: '2.5em 0',
        minHeight: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        paddingTop: '120px'
      }}>
        <h2 style={{
          color: '#ff9800', 
          fontSize: '2.2rem', 
          fontWeight: 800, 
          marginBottom: 8, 
          textAlign: 'center', 
          letterSpacing: 1
        }}>
          Eventos
        </h2>
        <p style={{
          color: '#fff', 
          textAlign: 'center', 
          marginBottom: 16, 
          fontSize: '1.1rem'
        }}>
          ¡No te pierdas nuestros próximos eventos! Música, comida, fiestas y mucho más en Bar Chafy.
        </p>
        
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Botón de actualizar - solo visible para admins */}
            {isAdmin && (
              <button
                onClick={() => {
                  const nuevosEventos = getEventosFromStorage();
                  const eventosConIconos = nuevosEventos.map(evento => {
                    // Validar que el evento tenga las propiedades mínimas
                    if (!evento || typeof evento !== 'object') {
                      return null;
                    }
                    
                    return {
                      ...evento,
                      id: evento.id || Date.now() + Math.random(),
                      titulo: evento.titulo || 'Sin título',
                      descripcion: evento.descripcion || 'Sin descripción',
                      fecha: evento.fecha || new Date().toISOString().split('T')[0],
                      imagenes: Array.isArray(evento.imagenes) ? evento.imagenes : [],
                      miniatura: typeof evento.miniatura === 'number' ? evento.miniatura : 0,
                      icon: evento.icon || getIconForEvent(evento.titulo)
                    };
                  }).filter(evento => evento !== null);
                  
                  setEventos(eventosConIconos);
                }}
                style={{
                  background: '#ff9800',
                  color: '#232323',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(255,152,0,0.3)'
                }}
              >
                🔄 Actualizar eventos
              </button>
            )}
            
            {/* Botón de cargar muestra - solo visible para admins cuando no hay eventos */}
            {isAdmin && eventos.length === 0 && (
              <button
                onClick={() => {
                  const eventosMigrados = migrarEventosMuestra();
                  const eventosConIconos = eventosMigrados.map(evento => ({
                    ...evento,
                    icon: getIconForEvent(evento.titulo)
                  }));
                  setEventos(eventosConIconos);
                }}
                style={{
                  background: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(76,175,80,0.3)'
                }}
              >
                📥 Cargar eventos de muestra
              </button>
            )}
            
            {/* Botón de limpiar - solo visible para admins cuando hay eventos */}
            {isAdmin && eventos.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de eliminar TODOS los eventos? Esta acción no se puede deshacer.')) {
                    localStorage.removeItem('admin_events');
                    setEventos([]);
                  }
                }}
                style={{
                  background: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(244,67,54,0.3)'
                }}
              >
                🗑️ Limpiar todos los eventos
              </button>
            )}
          </div>
        </div>

        {/* Modal de galería */}
        {modalEvento && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }} onClick={() => setModalEvento(null)}>
            <div style={{
              background: '#232323',
              borderRadius: 16,
              padding: 24,
              maxWidth: 600,
              width: '90vw',
              maxHeight: '90vh',
              boxShadow: '0 2px 16px #0008',
              position: 'relative',
              overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setModalEvento(null)} 
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(255,152,0,0.9)',
                  border: 'none',
                  color: '#232323',
                  fontSize: 28,
                  cursor: 'pointer',
                  fontWeight: 700,
                  zIndex: 2,
                  padding: '2px 10px',
                  borderRadius: 8,
                  lineHeight: 1
                }}
              >
                ×
              </button>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  color: '#ff9800',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  marginBottom: 16,
                  textAlign: 'center'
                }}>
                  {modalEvento.titulo}
                </div>
                
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  style={{ 
                    marginBottom: 16,
                    '--swiper-navigation-color': '#ff9800',
                    '--swiper-pagination-color': '#ff9800'
                  }}
                >
                  {modalEvento && Array.isArray(modalEvento.imagenes) && modalEvento.imagenes.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img 
                        src={img} 
                        alt={`${modalEvento.titulo} - imagen ${i + 1}`} 
                        style={{
                          width: '100%',
                          borderRadius: 10,
                          maxHeight: 350,
                          objectFit: 'cover',
                          display: 'block',
                          margin: '0 auto'
                        }} 
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                <div style={{
                  color: '#fff',
                  fontSize: '1rem',
                  marginBottom: 8,
                  textAlign: 'center'
                }}>
                  {modalEvento.galeriaTexto && modalEvento.galeriaTexto.trim() ? modalEvento.galeriaTexto : modalEvento.descripcion}
                </div>
                
                <div style={{
                  color: '#ff9800',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  📅 {new Date(modalEvento.fecha).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'center', padding: '0 2rem' }}>
          {/* Calendario */}
          <div style={{
            background: 'rgba(35,35,35,0.8)',
            borderRadius: 16,
            padding: '2em',
            minWidth: 320,
            boxShadow: '0 2px 12px #0003'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18
            }}>
              <button 
                onClick={() => setMes(m => m === 0 ? 11 : m - 1)} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff9800',
                  fontSize: 22,
                  cursor: 'pointer'
                }}
              >
                &lt;
              </button>
              <span style={{
                color: '#ff9800',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                {meses[mes]} {anio}
              </span>
              <button 
                onClick={() => setMes(m => m === 11 ? 0 : m + 1)} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff9800',
                  fontSize: 22,
                  cursor: 'pointer'
                }}
              >
                &gt;
              </button>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                    <th key={d} style={{ padding: 6, color: '#ff9800', textAlign: 'center' }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, semana) => {
                  const primerDia = new Date(anio, mes, 1).getDay();
                  const diasMes = getDiasMes(anio, mes);
                  return (
                    <tr key={semana}>
                      {Array.from({ length: 7 }, (_, d) => {
                        const dia = semana * 7 + d - primerDia + 2;
                        const esEvento = eventos.some(e => {
                          const fechaEvento = new Date(e.fecha);
                          return fechaEvento.getDate() === dia && 
                                 fechaEvento.getMonth() === mes && 
                                 fechaEvento.getFullYear() === anio;
                        });
                        return (
                          <td 
                            key={d} 
                            style={{
                              padding: 6,
                              textAlign: 'center',
                              cursor: dia > 0 && dia <= diasMes ? 'pointer' : 'default',
                              background: esEvento ? '#ff9800' : 'none',
                              color: esEvento ? '#232323' : '#fff',
                              borderRadius: esEvento ? 8 : 0
                            }} 
                            onClick={() => dia > 0 && dia <= diasMes ? setDiaSel(dia) : null}
                          >
                            {dia > 0 && dia <= diasMes ? dia : ''}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {diaSel && eventosDia.length > 0 && (
              <div style={{
                marginTop: 18,
                background: 'rgba(24,24,24,0.8)',
                borderRadius: 8,
                padding: 16
              }}>
                <b style={{ color: '#ff9800' }}>Eventos del {diaSel} de {meses[mes]}</b>
                <ul style={{ margin: '8px 0 0 0', padding: 0 }}>
                  {eventosDia.map(ev => (
                    <li key={ev.id} style={{
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      {ev.icon}
                      <span style={{ fontWeight: 700 }}>{ev.titulo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tabs de eventos */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
              <button
                onClick={() => setTab('proximos')}
                style={{
                  background: tab === 'proximos' ? '#ff9800' : 'none',
                  color: tab === 'proximos' ? '#232323' : '#ff9800',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '8px 18px',
                  cursor: 'pointer',
                  transition: 'all .2s'
                }}
              >
                Próximos eventos
              </button>
              <button
                onClick={() => setTab('anteriores')}
                style={{
                  background: tab === 'anteriores' ? '#ff9800' : 'none',
                  color: tab === 'anteriores' ? '#232323' : '#ff9800',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '8px 18px',
                  cursor: 'pointer',
                  transition: 'all .2s'
                }}
              >
                Eventos anteriores
              </button>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {tab === 'proximos' && eventosProximos.length === 0 && (
                <div style={{ 
                  color: '#fff', 
                  textAlign: 'center', 
                  width: '100%',
                  background: 'rgba(35,35,35,0.8)',
                  borderRadius: 14,
                  padding: '2rem',
                  marginTop: '1rem'
                }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>📅 No hay próximos eventos</div>
                  <div style={{ color: '#ccc', marginBottom: '1rem' }}>
                    Puedes crear nuevos eventos desde el panel de administración
                  </div>
                  {eventos.length === 0 && (
                    <div style={{ color: '#ff9800' }}>
                      💡 O cargar los eventos de muestra usando el botón de arriba
                    </div>
                  )}
                </div>
              )}
              {tab === 'anteriores' && eventosAnteriores.length === 0 && (
                <div style={{ 
                  color: '#fff', 
                  textAlign: 'center', 
                  width: '100%',
                  background: 'rgba(35,35,35,0.8)',
                  borderRadius: 14,
                  padding: '2rem',
                  marginTop: '1rem'
                }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>📜 No hay eventos anteriores</div>
                  <div style={{ color: '#ccc' }}>
                    Los eventos pasados aparecerán aquí automáticamente
                  </div>
                </div>
              )}
              
              {tab === 'proximos' && eventosProximos.map(ev => (
                <div 
                  key={ev.id} 
                  onClick={() => setModalEvento(ev)} 
                  style={{
                    background: 'rgba(35,35,35,0.8)',
                    borderRadius: 14,
                    padding: 0,
                    boxShadow: '0 2px 8px #0002',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0,
                    cursor: 'pointer',
                    width: 180,
                    overflow: 'hidden',
                    transition: 'transform .15s',
                    border: '2px solid transparent'
                  }}
                  onMouseOver={e => e.currentTarget.style.border = '2px solid #ff9800'}
                  onMouseOut={e => e.currentTarget.style.border = '2px solid transparent'}
                >
                  <img 
                    src={ev.imagenes[ev.miniatura]} 
                    alt={ev.titulo} 
                    style={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover'
                    }} 
                  />
                  <div style={{
                    padding: 12,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      color: '#ff9800',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: 4
                    }}>
                      {ev.titulo}
                    </div>
                    <div style={{
                      color: '#fff',
                      fontSize: '0.9rem',
                      marginBottom: 8
                    }}>
                      {ev.descripcion}
                    </div>
                    <div style={{
                      color: '#aaa',
                      fontSize: '0.8rem'
                    }}>
                      {new Date(ev.fecha).getDate()} de {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][new Date(ev.fecha).getMonth()]}
                    </div>
                  </div>
                </div>
              ))}
              
              {tab === 'anteriores' && eventosAnteriores.map(ev => (
                <div 
                  key={ev.id} 
                  onClick={() => setModalEvento(ev)} 
                  style={{
                    background: 'rgba(35,35,35,0.8)',
                    borderRadius: 14,
                    padding: 0,
                    boxShadow: '0 2px 8px #0002',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0,
                    cursor: 'pointer',
                    width: 180,
                    overflow: 'hidden',
                    opacity: 0.7,
                    transition: 'transform .15s',
                    border: '2px solid transparent'
                  }}
                  onMouseOver={e => e.currentTarget.style.border = '2px solid #ff9800'}
                  onMouseOut={e => e.currentTarget.style.border = '2px solid transparent'}
                >
                  <img 
                    src={ev.imagenes[ev.miniatura]} 
                    alt={ev.titulo} 
                    style={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover'
                    }} 
                  />
                  <div style={{
                    padding: 12,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      color: '#ff9800',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: 4
                    }}>
                      {ev.titulo}
                    </div>
                    <div style={{
                      color: '#fff',
                      fontSize: '0.9rem',
                      marginBottom: 8
                    }}>
                      {ev.descripcion}
                    </div>
                    <div style={{
                      color: '#aaa',
                      fontSize: '0.8rem'
                    }}>
                      {new Date(ev.fecha).getDate()} de {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][new Date(ev.fecha).getMonth()]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventos;

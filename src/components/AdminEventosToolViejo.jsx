import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaSave, FaTimes } from 'react-icons/fa';

const AdminEventosTool = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    capacidad: '',
    precio: '',
    imagen: ''
  });

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Error fetching eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await axios.put(`/api/admin/eventos/${editingEvent.id}`, form);
      } else {
        await axios.post('/api/admin/eventos', form);
      }
      fetchEventos();
      closeModal();
    } catch (error) {
      console.error('Error saving evento:', error);
    }
  };

  const handleEdit = (evento) => {
    setEditingEvent(evento);
    setForm({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      ubicacion: evento.ubicacion,
      capacidad: evento.capacidad,
      precio: evento.precio,
      imagen: evento.imagen
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await axios.delete(`/api/admin/eventos/${id}`);
        fetchEventos();
      } catch (error) {
        console.error('Error deleting evento:', error);
      }
    }
  };

  const openModal = () => {
    setEditingEvent(null);
    setForm({
      nombre: '',
      descripcion: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      capacidad: '',
      precio: '',
      imagen: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const EventCard = ({ evento }) => (
    <div style={{
      background: '#232323',
      borderRadius: 12,
      padding: '1.5rem',
      border: '2px solid #ff9800',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      position: 'relative'
    }}>
      {evento.imagen && (
        <div style={{
          width: '100%',
          height: '200px',
          background: `url(${evento.imagen}) center/cover`,
          borderRadius: 8,
          marginBottom: '1rem'
        }} />
      )}
      
      <h3 style={{
        color: '#ff9800',
        fontSize: '1.3rem',
        fontWeight: 800,
        marginBottom: '0.5rem'
      }}>
        {evento.nombre}
      </h3>
      
      <p style={{
        color: '#ccc',
        marginBottom: '1rem',
        lineHeight: 1.5
      }}>
        {evento.descripcion}
      </p>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#fff'
        }}>
          <FaCalendar style={{ color: '#ff9800' }} />
          <span>{new Date(evento.fecha).toLocaleDateString()}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#fff'
        }}>
          <FaClock style={{ color: '#ff9800' }} />
          <span>{evento.hora}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#fff'
        }}>
          <FaMapMarkerAlt style={{ color: '#ff9800' }} />
          <span>{evento.ubicacion}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#fff'
        }}>
          <FaUsers style={{ color: '#ff9800' }} />
          <span>Capacidad: {evento.capacidad}</span>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          color: '#ff9800',
          fontSize: '1.2rem',
          fontWeight: 800
        }}>
          ${evento.precio}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => handleEdit(evento)}
            style={{
              background: '#2196f3',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FaEdit />
          </button>
          
          <button
            onClick={() => handleDelete(evento.id)}
            style={{
              background: '#e91e63',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#18120a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          color: '#ff9800',
          fontSize: '1.5rem',
          fontWeight: 700
        }}>
          Cargando eventos...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#18120a',
      padding: '2rem',
      color: '#fff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#ff9800',
            fontSize: '2.5rem',
            fontWeight: 800,
            margin: 0,
            letterSpacing: '2px'
          }}>
            Gestión de Eventos
          </h1>
          
          <button
            onClick={openModal}
            style={{
              background: '#ff9800',
              color: '#232323',
              border: 'none',
              borderRadius: 8,
              padding: '1rem 1.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem'
            }}
          >
            <FaPlus /> Nuevo Evento
          </button>
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {eventos.map(evento => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>

        {eventos.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#ccc'
          }}>
            <p style={{ fontSize: '1.2rem' }}>No hay eventos creados</p>
            <p>Crea tu primer evento usando el botón "Nuevo Evento"</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: '#232323',
              borderRadius: 12,
              padding: '2rem',
              maxWidth: '600px',
              width: '90vw',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '2px solid #ff9800'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  color: '#ff9800',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  margin: 0
                }}>
                  {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
                </h2>
                
                <button
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff9800',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#ff9800',
                    fontWeight: 700
                  }}>
                    Nombre del Evento
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: 6,
                      border: '2px solid #ff9800',
                      background: '#18120a',
                      color: '#fff',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#ff9800',
                    fontWeight: 700
                  }}>
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleInputChange}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: 6,
                      border: '2px solid #ff9800',
                      background: '#18120a',
                      color: '#fff',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Fecha
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      value={form.fecha}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: 6,
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Hora
                    </label>
                    <input
                      type="time"
                      name="hora"
                      value={form.hora}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: 6,
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#ff9800',
                    fontWeight: 700
                  }}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={form.ubicacion}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: 6,
                      border: '2px solid #ff9800',
                      background: '#18120a',
                      color: '#fff',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Capacidad
                    </label>
                    <input
                      type="number"
                      name="capacidad"
                      value={form.capacidad}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: 6,
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={form.precio}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: 6,
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#ff9800',
                    fontWeight: 700
                  }}>
                    URL de Imagen
                  </label>
                  <input
                    type="url"
                    name="imagen"
                    value={form.imagen}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: 6,
                      border: '2px solid #ff9800',
                      background: '#18120a',
                      color: '#fff',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: '#ff9800',
                      color: '#232323',
                      border: 'none',
                      borderRadius: 6,
                      padding: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FaSave /> {editingEvent ? 'Actualizar' : 'Crear'} Evento
                  </button>
                  
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      background: '#666',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '1rem 1.5rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventosTool;

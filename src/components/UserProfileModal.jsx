import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaSave, FaTimes, FaCamera, FaHistory, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UserProfileModal = ({ onClose }) => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [orderHistory, setOrderHistory] = useState([]);
  const [albumStats, setAlbumStats] = useState({
    totalCards: 0,
    uniqueCards: 0,
    completedSets: 0
  });

  useEffect(() => {
    setShowModal(true);
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || ''
      });
      fetchUserData();
    }
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, user]);

  const fetchUserData = async () => {
    try {
      const [ordersRes, albumRes] = await Promise.all([
        axios.get('/api/user/orders'),
        axios.get('/api/user/album-stats')
      ]);
      setOrderHistory(ordersRes.data);
      setAlbumStats(albumRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put('/api/user/profile', profileForm);
      updateUser(response.data.user);
      setSuccess('Perfil actualizado correctamente');
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await axios.put('/api/user/password', {
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword
      });
      setSuccess('Contraseña actualizada correctamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, children, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        background: active ? '#ff9800' : 'transparent',
        color: active ? '#232323' : '#ff9800',
        border: '2px solid #ff9800',
        borderRadius: 8,
        padding: '0.8rem 1rem',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      {children}
    </button>
  );

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
        background: 'rgba(0,0,0,0.8)',
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
          padding: '2rem',
          minWidth: 600,
          maxWidth: 800,
          width: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 4px 24px #0008',
          color: '#fff',
          position: 'relative',
          border: '2px solid #ff9800'
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
          <FaTimes />
        </button>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          marginBottom: '1.5rem',
          color: '#ff9800',
          textAlign: 'center',
          letterSpacing: '1px'
        }}>
          Mi Perfil
        </h2>

        {/* User Avatar and Basic Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1rem',
          background: '#18120a',
          borderRadius: 12,
          border: '1px solid #ff9800'
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: profileForm.avatar ? `url(${profileForm.avatar}) center/cover` : '#ff9800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {!profileForm.avatar && (
              <FaUser style={{ fontSize: '2rem', color: '#232323' }} />
            )}
          </div>
          <div>
            <h3 style={{
              color: '#ff9800',
              fontSize: '1.3rem',
              fontWeight: 800,
              margin: 0
            }}>
              {user?.name}
            </h3>
            <p style={{
              color: '#ccc',
              margin: '0.2rem 0 0 0'
            }}>
              {user?.email}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <TabButton 
            id="profile" 
            active={activeTab === 'profile'} 
            onClick={setActiveTab}
          >
            <FaUser /> Perfil
          </TabButton>
          <TabButton 
            id="password" 
            active={activeTab === 'password'} 
            onClick={setActiveTab}
          >
            <FaLock /> Contraseña
          </TabButton>
          <TabButton 
            id="orders" 
            active={activeTab === 'orders'} 
            onClick={setActiveTab}
          >
            <FaHistory /> Pedidos
          </TabButton>
          <TabButton 
            id="album" 
            active={activeTab === 'album'} 
            onClick={setActiveTab}
          >
            <FaTrophy /> Mi Álbum
          </TabButton>
        </div>

        {error && (
          <div style={{
            color: '#e91e63',
            background: 'rgba(233, 30, 99, 0.1)',
            padding: '1rem',
            borderRadius: 8,
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 700
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            color: '#4caf50',
            background: 'rgba(76, 175, 80, 0.1)',
            padding: '1rem',
            borderRadius: 8,
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 700
          }}>
            {success}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#ff9800',
                  fontWeight: 700
                }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
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
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#ff9800',
                  fontWeight: 700
                }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
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
                  URL Avatar
                </label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({...profileForm, avatar: e.target.value})}
                  placeholder="https://ejemplo.com/avatar.jpg"
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ff9800',
                fontWeight: 700
              }}>
                Dirección
              </label>
              <textarea
                value={profileForm.address}
                onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                rows="3"
                style={{
                  width: '100%',
                  border: '2px solid #ff9800',
                  background: '#18120a',
                  color: '#fff',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#666' : '#ff9800',
                color: loading ? '#ccc' : '#232323',
                border: 'none',
                borderRadius: 8,
                padding: '1rem 2rem',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaSave /> {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <div style={{
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
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
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
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
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
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    border: '2px solid #ff9800',
                    background: '#18120a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#666' : '#ff9800',
                  color: loading ? '#ccc' : '#232323',
                  border: 'none',
                  borderRadius: 8,
                  padding: '1rem 2rem',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}
              >
                <FaLock /> {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h3 style={{
              color: '#ff9800',
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '1rem'
            }}>
              Historial de Pedidos
            </h3>
            {orderHistory.length > 0 ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {orderHistory.map(order => (
                  <div key={order.id} style={{
                    background: '#18120a',
                    padding: '1rem',
                    borderRadius: 8,
                    border: '1px solid #ff9800'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#ff9800', fontWeight: 700 }}>
                        Pedido #{order.id}
                      </span>
                      <span style={{ color: '#fff' }}>
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#ccc' }}>
                        Total: ${order.total}
                      </span>
                      <span style={{
                        background: order.status === 'completed' ? '#4caf50' : '#ff9800',
                        color: '#fff',
                        padding: '0.2rem 0.8rem',
                        borderRadius: 12,
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#ccc', textAlign: 'center', padding: '2rem' }}>
                No tienes pedidos aún
              </p>
            )}
          </div>
        )}

        {/* Album Tab */}
        {activeTab === 'album' && (
          <div>
            <h3 style={{
              color: '#ff9800',
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '1rem'
            }}>
              Estadísticas del Álbum
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                background: '#18120a',
                padding: '1.5rem',
                borderRadius: 8,
                border: '1px solid #ff9800',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ff9800',
                  fontSize: '2rem',
                  fontWeight: 800
                }}>
                  {albumStats.totalCards}
                </div>
                <div style={{ color: '#ccc' }}>
                  Cartas Totales
                </div>
              </div>

              <div style={{
                background: '#18120a',
                padding: '1.5rem',
                borderRadius: 8,
                border: '1px solid #ff9800',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ff9800',
                  fontSize: '2rem',
                  fontWeight: 800
                }}>
                  {albumStats.uniqueCards}
                </div>
                <div style={{ color: '#ccc' }}>
                  Cartas Únicas
                </div>
              </div>

              <div style={{
                background: '#18120a',
                padding: '1.5rem',
                borderRadius: 8,
                border: '1px solid #ff9800',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ff9800',
                  fontSize: '2rem',
                  fontWeight: 800
                }}>
                  {albumStats.completedSets}
                </div>
                <div style={{ color: '#ccc' }}>
                  Sets Completos
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default UserProfileModal;

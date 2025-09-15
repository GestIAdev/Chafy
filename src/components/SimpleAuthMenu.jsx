import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaCog, FaShoppingCart, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserProfileModal from './UserProfileModal';

const SimpleAuthMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const MenuItem = ({ icon, children, onClick, color = '#fff' }) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        width: '100%',
        padding: '0.8rem 1rem',
        background: 'none',
        border: 'none',
        color: color,
        cursor: 'pointer',
        borderRadius: 6,
        transition: 'all 0.2s',
        fontSize: '0.95rem',
        fontWeight: 600
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#ff9800';
        e.target.style.color = '#232323';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'none';
        e.target.style.color = color;
      }}
    >
      {icon}
      {children}
    </button>
  );

  if (!user) {
    // Usuario no autenticado
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem'
      }}>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            background: 'transparent',
            color: '#ff9800',
            border: '2px solid #ff9800',
            borderRadius: 6,
            padding: '0.6rem 1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ff9800';
            e.target.style.color = '#232323';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#ff9800';
          }}
        >
          <FaSignInAlt /> Iniciar Sesión
        </button>

        <button
          onClick={() => setShowRegister(true)}
          style={{
            background: '#ff9800',
            color: '#232323',
            border: '2px solid #ff9800',
            borderRadius: 6,
            padding: '0.6rem 1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#ff9800';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#ff9800';
            e.target.style.color = '#232323';
          }}
        >
          <FaUserPlus /> Registrarse
        </button>

        {/* Modales */}
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
        {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      </div>
    );
  }

  // Usuario autenticado
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          background: '#232323',
          color: '#ff9800',
          border: '2px solid #ff9800',
          borderRadius: 25,
          padding: '0.6rem 1.2rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#ff9800';
          e.target.style.color = '#232323';
        }}
        onMouseLeave={(e) => {
          if (!showDropdown) {
            e.target.style.background = '#232323';
            e.target.style.color = '#ff9800';
          }
        }}
      >
        <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: user.avatar ? `url(${user.avatar}) center/cover` : '#ff9800',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {!user.avatar && <FaUser style={{ fontSize: '0.9rem', color: '#232323' }} />}
        </div>
        <span>{user.name}</span>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Overlay para cerrar el dropdown */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999
            }}
            onClick={() => setShowDropdown(false)}
          />
          
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            background: '#232323',
            border: '2px solid #ff9800',
            borderRadius: 12,
            padding: '0.8rem',
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}>
            {/* User Info Header */}
            <div style={{
              padding: '0.8rem',
              borderBottom: '1px solid #444',
              marginBottom: '0.5rem'
            }}>
              <div style={{ color: '#ff9800', fontWeight: 800, fontSize: '1rem' }}>
                {user.name}
              </div>
              <div style={{ color: '#ccc', fontSize: '0.85rem' }}>
                {user.email}
              </div>
            </div>

            {/* Menu Items */}
            <MenuItem
              icon={<FaUser />}
              onClick={() => {
                setShowProfile(true);
                setShowDropdown(false);
              }}
            >
              Mi Perfil
            </MenuItem>

            <MenuItem
              icon={<FaShoppingCart />}
              onClick={() => {
                setShowDropdown(false);
                // Navegar a mis pedidos
              }}
            >
              Mis Pedidos
            </MenuItem>

            <MenuItem
              icon={<FaTrophy />}
              onClick={() => {
                setShowDropdown(false);
                // Navegar a mi álbum
              }}
            >
              Mi Álbum
            </MenuItem>

            {(user.role === 'admin' || user.is_admin || user.email === 'admin@barchafy.com') && (
              <>
                <div style={{
                  height: '1px',
                  background: '#444',
                  margin: '0.5rem 0'
                }} />
                
                <MenuItem
                  icon={<FaCog />}
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/admin');
                  }}
                >
                  Administración
                </MenuItem>
              </>
            )}

            <div style={{
              height: '1px',
              background: '#444',
              margin: '0.5rem 0'
            }} />

            <MenuItem
              icon={<FaSignOutAlt />}
              onClick={handleLogout}
              color="#e91e63"
            >
              Cerrar Sesión
            </MenuItem>
          </div>
        </>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <UserProfileModal onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default SimpleAuthMenu;

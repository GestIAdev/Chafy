import React from 'react';
import './Navbar.css';
import SimpleAuthMenu from './SimpleAuthMenu';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import CartPagoModal from './CartPagoModal';

const Navbar = ({ onOpenRegisterModal, onOpenLoginModal }) => {
  const { user, isLogged } = useAuth();
  const isAdmin = user && (user.role === 'admin' || user.is_admin);
  const { cart } = useCart();
  const [showCart, setShowCart] = React.useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/images/logo-bar-chafy.svg" alt="Bar Chafy" style={{ height: '48px', width: 'auto', display: 'block' }} />
          </Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/menu">Menú</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
          <li><Link to="/bebidas">Bebidas</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {isLogged && <li><Link to="/album">Mi álbum</Link></li>}
          {isLogged && <li><Link to="/pedidos">Mis pedidos</Link></li>}
          {isAdmin && <li><Link to="/admin">Dashboard</Link></li>}
        </ul>
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button className="navbar-cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowCart(true)}>
            <FaShoppingCart className="navbar-icon" />
            {cart && cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: -6,
                right: -10,
                background: '#ff9800',
                color: '#181818',
                borderRadius: '50%',
                padding: '2px 7px',
                fontSize: '0.85rem',
                fontWeight: 700,
                minWidth: 20,
                textAlign: 'center',
                zIndex: 2
              }}>{cart.length}</span>
            )}
          </button>
          <SimpleAuthMenu onOpenRegisterModal={onOpenRegisterModal} onOpenLoginModal={onOpenLoginModal} />
        </div>
      </nav>
      <CartPagoModal open={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Navbar;

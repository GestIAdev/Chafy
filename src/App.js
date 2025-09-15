import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AlbumProvider } from './context/AlbumContext';
import { OrdersProvider } from './context/OrdersContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MenuData from './components/MenuData';
import MisPedidos from './components/MisPedidos';
import MiAlbum from './components/MiAlbum';
import Eventos from './components/Eventos';
import NuestrasBebidas from './pages/NuestrasBebidas';
import Contacto from './components/Contacto';
import AuthForm from './components/AuthForm';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './components/AdminDashboard';
import AdminEventosTool from './components/AdminEventosTool';
import AdminRoute from './components/AdminRoute';
import GusanosOverlayOriginal from './components/GusanosOverlayOriginal';

// Crear el modal root si no existe
if (typeof document !== 'undefined' && !document.getElementById('modal-root')) {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
}

function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthProvider>
      <CartProvider>
        <AlbumProvider>
          <OrdersProvider>
            <Router>
              <div className="App">
                {/* Overlay de gusanos original */}
                <GusanosOverlayOriginal />
                <Navbar 
                  onOpenRegisterModal={openRegisterModal}
                  onOpenLoginModal={openLoginModal}
                />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<MenuData />} />
                  <Route path="/eventos" element={<Eventos />} />
                  <Route path="/bebidas" element={<NuestrasBebidas />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/album" element={<MiAlbum />} />
                  <Route path="/pedidos" element={<MisPedidos />} />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/eventos" element={
                    <AdminRoute>
                      <AdminEventosTool />
                    </AdminRoute>
                  } />
                </Routes>
                {/* Modales reales */}
                {isRegisterModalOpen && (
                  <RegisterForm onClose={closeRegisterModal} />
                )}
                {isLoginModalOpen && (
                  <AuthForm onClose={closeLoginModal} />
                )}
              </div>
              <Footer />
            </Router>
          </OrdersProvider>
        </AlbumProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

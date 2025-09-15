import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isLogged } = useAuth();
  const isAdmin = user && (user.role === 'admin' || user.is_admin || user.email === 'admin@barchafy.com');

  // Si no está loggeado, redirigir al home
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  // Si está loggeado pero no es admin, redirigir al home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si es admin, mostrar el componente
  return children;
};

export default AdminRoute;

import React, { createContext, useContext, useState } from 'react';
// Importa la instancia centralizada de axios
import apiClient from '../config/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: null, user: null, isLogged: false });

  // Configurar el token en la instancia de apiClient
  if (auth.token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }

  const login = async (email, password) => {
    // --- SIMULACIÓN PARA LA DEMO ---
    if (email === 'admin@demo.com') {
      console.log("Modo demo: Iniciando sesión como administrador.");
      const fakeToken = 'fake-admin-token-for-demo';
      const fakeUser = {
        name: 'Administrador Demo',
        email: 'admin@demo.com',
        role: 'admin' // Asegúrate de que el rol sea 'admin'
      };
      
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${fakeToken}`;
      setAuth({ token: fakeToken, user: fakeUser, isLogged: true });
      return { success: true, data: { token: fakeToken, user: fakeUser } };
    }
    // --- FIN DE LA SIMULACIÓN ---

    try {
      // Usa la instancia de apiClient y rutas relativas
      const response = await apiClient.post('/login', {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ token, user, isLogged: true });
      return { success: true, data: { token, user } };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al iniciar sesión'
      };
    }
  };

  const register = async (userData) => {
    try {
      // Usa la instancia de apiClient y rutas relativas
      const response = await apiClient.post('/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ token, user, isLogged: true });
      return { success: true, data: { token, user } };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrarse'
      };
    }
  };

  const logout = async () => {
    try {
      if (auth.token) {
        // Usa la instancia de apiClient y rutas relativas
        await apiClient.post('/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      localStorage.removeItem('album');
      localStorage.removeItem('orders');
      delete apiClient.defaults.headers.common['Authorization'];
      setAuth({ token: null, user: null, isLogged: false });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...auth,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

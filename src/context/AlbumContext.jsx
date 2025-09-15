import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AlbumContext = createContext();
export const useAlbum = () => useContext(AlbumContext);

const getInitialAlbum = (userId) => {
  if (!userId) return {};
  const stored = localStorage.getItem(`album_${userId}`);
  return stored ? JSON.parse(stored) : {};
};

export const AlbumProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [album, setAlbum] = useState(() => getInitialAlbum(userId));

  // Cuando cambia el usuario, cargar su álbum
  useEffect(() => {
    setAlbum(getInitialAlbum(userId));
  }, [userId]);

  // Guardar el álbum del usuario activo
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`album_${userId}`, JSON.stringify(album));
    }
  }, [album, userId]);

  const addCard = (category) => {
    setAlbum(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));
  };

  const resetAlbum = () => setAlbum({});
  const resetCategoria = (cat) => {
    setAlbum(prev => ({ ...prev, [cat]: 0 }));
  };
  const hasReward = (category) => (album[category] || 0) >= 4;

  return (
    <AlbumContext.Provider value={{ album, addCard, resetAlbum, resetCategoria, hasReward }}>
      {children}
    </AlbumContext.Provider>
  );
};

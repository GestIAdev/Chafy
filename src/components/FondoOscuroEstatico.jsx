import { useEffect } from 'react';

function FondoOscuroEstatico({ imagen }) {
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevBgSize = document.body.style.backgroundSize;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    
    // Fondo oscuro con imagen y overlay
    document.body.style.background = `linear-gradient(rgba(24,24,24,0.75), rgba(24,24,24,0.85)), url('${imagen}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.background = prevBg;
      document.body.style.backgroundSize = prevBgSize;
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
    };
  }, [imagen]);
  
  return null;
}

export default FondoOscuroEstatico;

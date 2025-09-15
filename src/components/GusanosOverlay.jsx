import { useEffect } from 'react';

const GusanosOverlay = () => {
  useEffect(() => {
    // Crear el SVG del patrón de gusanos
    const svgPattern = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gusanos" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <!-- Gusano 1 -->
            <path d="M20,50 Q60,20 100,50 T180,50" 
                  stroke="#ff9800" 
                  stroke-width="3" 
                  fill="none" 
                  opacity="0.15"/>
            <path d="M30,90 Q70,60 110,90 T190,90" 
                  stroke="#ff9800" 
                  stroke-width="2" 
                  fill="none" 
                  opacity="0.1"/>
            
            <!-- Gusano 2 -->
            <path d="M10,150 Q50,120 90,150 T170,150" 
                  stroke="#232323" 
                  stroke-width="4" 
                  fill="none" 
                  opacity="0.2"/>
            <path d="M40,180 Q80,150 120,180 T200,180" 
                  stroke="#232323" 
                  stroke-width="2" 
                  fill="none" 
                  opacity="0.15"/>
            
            <!-- Gusano 3 - Vertical -->
            <path d="M150,10 Q120,50 150,90 T150,170" 
                  stroke="#ff9800" 
                  stroke-width="3" 
                  fill="none" 
                  opacity="0.12"/>
            
            <!-- Gusano 4 - Diagonal -->
            <path d="M10,10 Q40,40 70,30 Q100,20 130,50 Q160,80 190,70" 
                  stroke="#232323" 
                  stroke-width="2" 
                  fill="none" 
                  opacity="0.18"/>
            
            <!-- Gusano 5 - Curva compleja -->
            <path d="M5,100 Q25,80 45,100 Q65,120 85,100 Q105,80 125,100 Q145,120 165,100 Q185,80 195,100" 
                  stroke="#ff9800" 
                  stroke-width="1.5" 
                  fill="none" 
                  opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#gusanos)"/>
      </svg>
    `;

    // Convertir SVG a data URL
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgPattern)}`;
    
    // Aplicar al body
    const prevBg = document.body.style.background;
    const prevBgSize = document.body.style.backgroundSize;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    
    document.body.style.background = `
      linear-gradient(rgba(24,24,24,0.75), rgba(24,24,24,0.85)), 
      url("${svgDataUrl}"), 
      linear-gradient(135deg, #232323 0%, #1a1a1a 100%)
    `;
    document.body.style.backgroundSize = '200px 200px, 200px 200px, cover';
    document.body.style.backgroundRepeat = 'repeat, repeat, no-repeat';
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.background = prevBg;
      document.body.style.backgroundSize = prevBgSize;
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
    };
  }, []);
  
  return null;
};

export default GusanosOverlay;

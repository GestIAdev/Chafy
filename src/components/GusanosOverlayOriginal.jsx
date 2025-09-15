
import React from 'react';

const GusanosOverlayOriginal = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: 'transparent'
    }}
  >
    <svg
      viewBox="0 0 340 120"
      width="100vw"
      height="auto"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.35,
        pointerEvents: 'none',
        width: '100vw',
        height: 'auto',
        minWidth: 340,
        maxWidth: '100vw',
        minHeight: 120
      }}
      preserveAspectRatio="xMinYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gusano 1 */}
      <path d="M30 100 Q80 80 120 100 T210 100" stroke="#ff9800" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Gusano 2 */}
      <path d="M60 30 Q120 60 180 30 T300 50" stroke="#ffd700" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Gusano 3 */}
      <path d="M220 110 Q260 90 320 110" stroke="#ffb347" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Repeticiones decorativas */}
      <path d="M60 80 Q110 60 160 80 T260 80" stroke="#ff9800" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M100 50 Q150 30 200 50 T300 70" stroke="#ffd700" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M180 110 Q220 90 300 110" stroke="#ffb347" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.3" />
    </svg>
  </div>
);

export default GusanosOverlayOriginal;

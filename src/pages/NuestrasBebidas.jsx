import React, { useState } from 'react';
import CocktailsList from '../components/CocktailsList';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const cervezas = [
  {
    nombre: 'Quilmes',
    descripcion: 'Clásica lager argentina, refrescante y suave.',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Quilmes_Logo_Nuevo.png',
  },
  {
    nombre: 'Stella Artois',
    descripcion: 'Cerveza belga premium, equilibrada y elegante.',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Stella_Artois_logo.svg',
  },
  {
    nombre: 'Andes Roja',
    descripcion: 'Cerveza argentina con carácter, suave y distintiva.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwQ6nxJJyQzNKoGhV7KGhEG7Fj5nG5LLBAA&s',
  },
  {
    nombre: 'Corona',
    descripcion: 'Cerveza mexicana ligera, perfecta con lima.',
    imagen: 'https://logos-world.net/wp-content/uploads/2020/05/Corona-Logo.png',
  },
  {
    nombre: 'Heineken',
    descripcion: 'Lager holandesa con sabor distintivo y refrescante.',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Heineken-logo.svg',
  },
  {
    nombre: 'Andes IPA',
    descripcion: 'India Pale Ale argentina con intenso aroma a lúpulo.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwQ6nxJJyQzNKoGhV7KGhEG7Fj5nG5LLBAA&s',
  },
];

const vinos = [
  {
    nombre: 'Malbec',
    descripcion: 'Vino tinto emblemático de Mendoza, intenso y frutado.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQcNQNvWc1VTzKwFyJMtH1XfGQ4ZldtI-M9BnYIwGVIAgv74I0Dz9tSm_hUp93bk0SNes&usqp=CAU',
  },
  {
    nombre: 'Cabernet Sauvignon',
    descripcion: 'Tinto robusto, con notas a pimiento y especias.',
    imagen: 'https://www.maset.com/cdnassets/blog/escuela-de-vino/2020/la-uva-cabernet-sauvignon/la-uva-cabernet-sauvignon-1137x600-main.jpg',
  },
  {
    nombre: 'Chardonnay',
    descripcion: 'Blanco fresco, con notas a frutas tropicales.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPwAU34rdzF3g0VFbwatEbszPbXft26CCDA&s'
  },
  {
    nombre: 'Syrah',
    descripcion: 'Tinto especiado, con notas a frutos negros.',
    imagen: 'https://vinedosbalmoral.com/wp-content/uploads/2021/10/uva-syrah-balmoral.jpg',
  },
  {
    nombre: 'Rosado',
    descripcion: 'Vino fresco, frutal y ligero.',
    imagen: 'https://enovinos.com/blog/wp-content/uploads/2023/08/pink-wine-2022-11-15-21-09-47-utc.jpg',
  },
  {
    nombre: 'Sauvignon Blanc',
    descripcion: 'Blanco seco, con notas cítricas y herbales.',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Sauvignon_blanc_grapes.jpg',
  },
];

const coctelesCasa = [
  {
    nombre: 'Negroni',
    descripcion: 'Gin, Campari y vermut rojo. Amargo y aromático.',
    imagen: 'https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg',
  },
  {
    nombre: 'Mojito',
    descripcion: 'Ron, lima, menta, azúcar y soda. Refrescante.',
    imagen: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
  },
  {
    nombre: 'Fernet con Coca',
    descripcion: 'El clásico argentino: Fernet y Coca-Cola.',
    imagen: 'https://www.mendovoz.com/u/fotografias/m/2020/4/3/f850x638-127798_205287_5050.jpg',
  },
  {
    nombre: 'Caipirinha',
    descripcion: 'Cachaça, lima, azúcar y hielo. Refrescante y tropical.',
    imagen: 'https://www.thecocktaildb.com/images/media/drink/jgvn7p1582484435.jpg',
  },
  {
    nombre: 'Daiquiri',
    descripcion: 'Ron blanco, lima y azúcar. Sencillo y delicioso.',
    imagen: 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg',
  },
  {
    nombre: 'Gin Tonic',
    descripcion: 'Gin, agua tónica y rodaja de limón.',
    imagen: 'https://www.thecocktaildb.com/images/media/drink/qcgz0t1643821443.jpg',
  },
];

function BebidaColumna({ titulo, lista }) {
  const VISIBLE = 3;
  const [start, setStart] = useState(0);
  const canUp = start > 0;
  const canDown = start + VISIBLE < lista.length;
  const mostrar = lista.slice(start, start + VISIBLE);
  const { addToCart } = useCart();
  const { isLogged } = useAuth();
  const [addedIdx, setAddedIdx] = useState(null);
  const [msg, setMsg] = useState('');

  const handleAdd = (b, idx) => {
    addToCart({
      id: `${titulo}-${b.nombre}`,
      name: b.nombre,
      image: b.imagen,
      category: 'bebidas',
      price: 0
    });
    setAddedIdx(idx);
    setMsg(`Añadido: ${b.nombre}`);
    setTimeout(() => {
      setAddedIdx(null);
      setMsg('');
    }, 900);
  };

  return (
    <div style={{flex:1, minWidth:220, maxWidth:340, margin:'0 12px', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{display:'flex', justifyContent:'center', marginBottom:18}}>
        <span style={{color:'#ff9800', fontSize:'1.3rem', fontWeight:700, textAlign:'center', borderBottom:'2px solid #ff9800', paddingBottom:8}}>
          {titulo}
        </span>
      </div>
      
      <div style={{display:'flex', alignItems:'center', marginBottom:12, height:40}}>
        <button
          onClick={() => setStart(Math.max(0, start - 1))}
          disabled={!canUp}
          style={{
            background: canUp ? '#ff9800' : '#666',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            width: 32,
            height: 32,
            fontSize: '1.2rem',
            cursor: canUp ? 'pointer' : 'not-allowed',
            marginRight: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ↑
        </button>
        
        <span style={{color:'#ff9800', fontSize:'0.9rem', minWidth:80, textAlign:'center'}}>
          {start + 1}-{Math.min(start + VISIBLE, lista.length)} de {lista.length}
        </span>
        
        <button
          onClick={() => setStart(start + 1)}
          disabled={!canDown}
          style={{
            background: canDown ? '#ff9800' : '#666',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            width: 32,
            height: 32,
            fontSize: '1.2rem',
            cursor: canDown ? 'pointer' : 'not-allowed',
            marginLeft: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ↓
        </button>
      </div>

      <div style={{width:'100%'}}>
        {mostrar.map((b, idx) => (
          <div key={b.nombre} style={{
            background: 'rgba(255,152,0,0.1)',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: 12,
            border: '1px solid rgba(255,152,0,0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{display:'flex', alignItems:'center', marginBottom:8}}>
              <img 
                src={b.imagen} 
                alt={b.nombre}
                style={{width:40, height:40, borderRadius:6, marginRight:12, objectFit:'cover'}}
                onError={(e) => {
                  e.target.src = '/images/logo192.png';
                }}
              />
              <div style={{flex:1}}>
                <div style={{color:'#ff9800', fontWeight:600, fontSize:'1rem'}}>{b.nombre}</div>
                <div style={{color:'#ccc', fontSize:'0.85rem', marginTop:2}}>{b.descripcion}</div>
              </div>
            </div>
            
            {isLogged && (
              <div style={{display:'flex', justifyContent:'flex-end', marginTop:8}}>
                <button
                  onClick={() => handleAdd(b, idx)}
                  style={{
                    background: addedIdx === idx ? '#4caf50' : '#ff9800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {addedIdx === idx ? '✓ Añadido' : '+ Añadir'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {msg && (
        <div style={{
          background: '#4caf50',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: 6,
          fontSize: '0.8rem',
          marginTop: 8,
          animation: 'fadeInOut 0.9s ease-in-out'
        }}>
          {msg}
        </div>
      )}
    </div>
  );
}

export default function NuestrasBebidas() {
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevBgSize = document.body.style.backgroundSize;
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    document.body.style.background = "linear-gradient(135deg, #18120a 0%, #2c1f14 100%)";
    document.body.style.backgroundSize = 'cover';
    document.body.style.margin = '0';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.background = prevBg;
      document.body.style.backgroundSize = prevBgSize;
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
    };
  }, []);
  return (
    <div style={{
        minHeight: '100vh',
        padding: '120px 2rem 2rem 2rem'
      }}>
        <div style={{background:'rgba(24,18,10,0.8)',borderRadius:18,padding:'2.5rem 2rem',maxWidth:1100,margin:'40px auto',color:'#fff',fontFamily: 'Montserrat, Roboto, sans-serif',position:'relative',zIndex:2}}>
          <h2 style={{ color: '#ff9800', fontWeight: 800, fontSize: '2rem', marginBottom:32, textAlign:'center' }}>Nuestras Bebidas</h2>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:0,marginBottom:36}}>
            <BebidaColumna titulo="Cervezas" lista={cervezas} />
            <BebidaColumna titulo="Vinos" lista={vinos} />
            <BebidaColumna titulo="Cócteles de la casa" lista={coctelesCasa} />
          </div>
          <div style={{textAlign:'center',margin:'110px 0 40px 0',position:'relative'}}>
            <div style={{fontWeight:700,fontSize:'1.15rem',color:'#ff9800',marginBottom:14}}>
              ¿No ves tu cóctel favorito? ¡Te lo preparamos!
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:8}}>
              <span style={{fontSize:32, color:'#ff9800',transform:'rotate(20deg)',marginRight:8}}>↓</span>
              <span style={{fontSize:24, color:'#ff9800',animation:'bounce 1.2s infinite alternate'}}>↓</span>
            </div>
          </div>
          <CocktailsList />
        </div>
      </div>
  );
}

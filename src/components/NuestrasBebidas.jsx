import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CocktailsList from './CocktailsList';

import React from 'react';
import CocktailsList from './CocktailsList';

const cervezas = [
  {
    nombre: 'Quilmes',
    descripcion: 'Clásica lager argentina, refrescante y suave.',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Quilmes_Logo_Nuevo.png',
  },
  {
    nombre: 'Stella Artois',
    descripcion: 'Cerveza belga premium, sabor equilibrado.',
    imagen: 'https://www.instacart.com/assets/domains/product-image/file/large_fb936e70-5e51-474a-a7c4-d5f64ee19d5c.jpg',
  },
  {
    nombre: 'Andes Roja',
    descripcion: 'Roja mendocina, maltosa y con notas caramelizadas.',
    imagen: 'https://lh3.googleusercontent.com/proxy/rUPK6RcH2h2TImH7dTuGmw5joaF2tx9B4AlEMgKSI3h4CHZL1_zKJvLVgnC7Fcie2Ws8fwxBYir1FGJ1RZXW3aEpeE08BV_GYCQACzdUl2EYaigAB9lo9A',
  },
  {
    nombre: 'Corona',
    descripcion: 'Cerveza mexicana suave, ideal con lima.',
    imagen: 'https://acdn-us.mitiendanube.com/stores/001/211/660/products/corona-7101-9a2faa7ea9b4adc38d16196380770669-480-0.png',
  },
  {
    nombre: 'Heineken',
    descripcion: 'Lager holandesa, refrescante y balanceada.',
    imagen: 'https://acdn-us.mitiendanube.com/stores/001/144/141/products/mesa-de-trabajo-921-bed7fb48b71316bbf916996279289024-1024-1024.png',
  },
  {
    nombre: 'Andes IPA',
    descripcion: 'IPA mendocina, lupulada y aromática.',
    imagen: 'https://supermercadoacuario.com.ar/app/files/company_35/products/99594_cervezaandesmendocinarubiax1l.jpg',
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

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
      <div
        style={{
          display:'flex',
          justifyContent:'center',
          marginBottom:18,
        }}
      >
        <span
          style={{
            color:'#ff9800',
            fontWeight:800,
            fontSize:'1.25rem',
            textAlign:'center',
            padding:'8px 32px 8px 20px',
            borderRadius:'18px 60px 18px 18px',
            background:'linear-gradient(90deg, rgba(24,18,10,0.98) 70%, rgba(24,18,10,0.0) 100%)',
            border:'2px solid #ff9800',
            boxShadow:'0 2px 12px #ff980033',
            letterSpacing:'0.5px',
            position:'relative',
            zIndex:1,
            minWidth:120,
            maxWidth:260,
            overflow:'hidden',
            whiteSpace:'nowrap',
          }}
        >
          {titulo}
        </span>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative', minHeight:320, maxHeight:340, width:'100%'}}>
        <button onClick={()=>setStart(s=>Math.max(0,s-1))} disabled={!canUp} style={{
          background:'rgba(24,18,10,0.92)',
          border:'none',
          borderRadius:8,
          color: canUp ? '#ff9800' : '#555',
          fontSize:28,
          fontWeight:800,
          cursor: canUp ? 'pointer' : 'not-allowed',
          marginBottom:6,
          boxShadow:'0 1px 4px #0006',
          width:38,
          height:38,
          display:'flex',alignItems:'center',justifyContent:'center',
          transition:'color 0.2s',
        }} aria-label="Subir">
          ▲
        </button>
        <div style={{width:'100%'}}>
          {mostrar.map((b,i)=>(
            <div key={start+i} style={{background:'rgba(24,18,10,0.8)',borderRadius:10,padding:12,marginBottom:18,boxShadow:'0 2px 8px #0004',display:'flex',alignItems:'center',gap:14}}>
              <img src={b.imagen} alt={b.nombre} style={{width:54,height:54,objectFit:'cover',borderRadius:8,boxShadow:'0 1px 4px #0006'}} />
              <div style={{flex:1, display:'flex', flexDirection:'column', minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                  <div style={{fontWeight:700,color:'#fff',fontSize:'1.08rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{b.nombre}</div>
              <button
                onClick={() => isLogged && handleAdd(b, start+i)}
                disabled={!isLogged}
                style={{
                  background: !isLogged ? 'rgba(24,18,10,0.5)' : (addedIdx === start+i ? '#ff9800' : 'rgba(24,18,10,0.92)'),
                  border: '1.5px solid #ff9800',
                  borderRadius: 8,
                  color: !isLogged ? '#888' : (addedIdx === start+i ? '#18120a' : '#ff9800'),
                  fontWeight: 800,
                  fontSize: 18,
                  cursor: !isLogged ? 'not-allowed' : 'pointer',
                  padding: '4px 10px',
                  transition: 'background 0.2s, color 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: addedIdx === start+i ? '0 0 0 2px #ff980088' : '0 1px 4px #0006',
                  opacity: !isLogged ? 0.6 : 1,
                }}
                title={isLogged ? 'Añadir al carrito' : 'Debes iniciar sesión para comprar'}
              >
                {addedIdx === start+i ? '✓' : '+'}
              </button>
                </div>
                <div style={{fontSize:'0.97rem',color:'#ccc',marginTop:2,wordBreak:'break-word'}}>{b.descripcion}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={()=>setStart(s=>Math.min(lista.length-VISIBLE,s+1))} disabled={!canDown} style={{
          background:'rgba(24,18,10,0.92)',
          border:'none',
          borderRadius:8,
          color: canDown ? '#ff9800' : '#555',
          fontSize:28,
          fontWeight:800,
          cursor: canDown ? 'pointer' : 'not-allowed',
          marginTop:0,
          boxShadow:'0 1px 4px #0006',
          width:38,
          height:38,
          display:'flex',alignItems:'center',justifyContent:'center',
          transition:'color 0.2s',
        }} aria-label="Bajar">
          ▼
        </button>
        {msg && (
          <div style={{
            position:'absolute',
            left:0,right:0,top:-32,
            background:'#232323',
            color:'#ff9800',
            borderRadius:8,
            fontWeight:700,
            fontSize:'1rem',
            padding:'4px 0',
            textAlign:'center',
            boxShadow:'0 2px 8px #0004',
            zIndex:10
          }}>{msg}</div>
        )}
      </div>
    </div>
  );
}

export default function NuestrasBebidas() {
  return (
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
  );
}

import React, { useState, useEffect } from 'react';

const LS_KEY = 'admin_events';

// Demo: eventos base (editables y borrables)
function getInitialEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem(LS_KEY));
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
    // Si no hay nada guardado, inicializar con demo y guardar demo
    const demo = [
      {
        id: 5,
        title: 'Fiesta Retro 80s',
        date: '2025-06-15',
        description: 'Una noche temática con música, vestimenta y decoración de los años 80. Premios al mejor look retro y barra especial de cócteles vintage.',
        image: '/images/banner2.jpg',
        galeriaTexto: '¡Viaja en el tiempo con nosotros! Una noche llena de nostalgia, música icónica y mucha diversión retro.',
        imagenes: ['/images/banner2.jpg', '/images/retro1.jpg', '/images/retro2.jpg'],
        miniatura: 0
      },
      {
        id: 1,
        title: 'Noche de Música en Vivo',
        date: '2025-07-25',
        description: 'Bandas locales en vivo, promos en tragos y mucha diversión.',
        image: '/images/cantanteproxevento.jpg',
        galeriaTexto: 'La mejor música en vivo de la ciudad. Ven a disfrutar de bandas locales increíbles y promos especiales.',
        imagenes: ['/images/cantanteproxevento.jpg'],
        miniatura: 0
      },
      {
        id: 2,
        title: 'Día de la Pizza',
        date: '2025-07-28',
        description: '¡Todas las pizzas al 2x1 durante todo el día!',
        image: '/images/pizza.jpg',
        galeriaTexto: 'Un día delicioso esperándote. Todas nuestras pizzas artesanales con la mejor promoción del mes.',
        imagenes: ['/images/pizza.jpg'],
        miniatura: 0
      },
      {
        id: 3,
        title: 'Fiesta de la Cerveza',
        date: '2025-08-02',
        description: 'Cerveza artesanal, música y sorteos especiales.',
        image: '/images/cerveza.jpg',
        galeriaTexto: 'Celebra con nosotros el día de la cerveza artesanal. Catas, música en vivo y sorteos increíbles.',
        imagenes: ['/images/cerveza.jpg'],
        miniatura: 0
      },
      {
        id: 4,
        title: 'Encuentro de Socios',
        date: '2025-08-10',
        description: 'Reunión exclusiva para socios con menú especial.',
        image: '/images/imagenbar.jpg',
        galeriaTexto: 'Una noche especial para nuestros socios más fieles. Menú exclusivo y sorpresas increíbles.',
        imagenes: ['/images/imagenbar.jpg'],
        miniatura: 0
      },
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(demo));
    return demo;
  } catch {
    return [];
  }
}

const emptyEvent = { title: '', date: '', description: '', galeriaTexto: '', imagenes: [], miniatura: 0 };

export default function AdminEventosTool() {
  const [events, setEvents] = useState(getInitialEvents());
  const [tab, setTab] = useState('futuros');
  const [form, setForm] = useState(emptyEvent);
  const [imgInput, setImgInput] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [msg, setMsg] = useState(null);

  // Paginación y grid
  const EVENTS_PER_PAGE = 8;
  const [page, setPage] = useState(1);
  const today = new Date().toISOString().slice(0, 10);
  const eventosOrdenados = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  const futuros = eventosOrdenados.filter(e => e.date >= today);
  const pasados = eventosOrdenados.filter(e => e.date < today);
  const eventosFiltrados = tab === 'futuros' ? futuros : pasados;
  const totalPages = Math.ceil(eventosFiltrados.length / EVENTS_PER_PAGE);
  const pagedEventos = eventosFiltrados.slice((page-1)*EVENTS_PER_PAGE, page*EVENTS_PER_PAGE);

  useEffect(() => { setPage(1); }, [tab, events]);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(events));
  }, [events]);

  // Restaurar demo

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Añadir imagen por URL
  const handleAddImg = () => {
    if (imgInput.trim()) {
      setForm(f => ({ ...f, imagenes: [...(f.imagenes || []), imgInput.trim()] }));
      setImgInput('');
    }
  };

  // Eliminar imagen
  const handleRemoveImg = idx => {
    setForm(f => {
      const nuevas = f.imagenes.filter((_, i) => i !== idx);
      let mini = f.miniatura;
      if (mini >= nuevas.length) mini = 0;
      return { ...f, imagenes: nuevas, miniatura: mini };
    });
  };

  // Seleccionar miniatura
  const handleSetMiniatura = idx => {
    setForm(f => ({ ...f, miniatura: idx }));
  };

  // Drag & drop
  const handleDrop = e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setForm(f => ({ ...f, imagenes: [...(f.imagenes || []), ev.target.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.date) {
      setMsg({ type: 'error', text: 'Título y fecha son obligatorios.' });
      return;
    }
    if (!form.imagenes || form.imagenes.length === 0) {
      setMsg({ type: 'error', text: 'Debes añadir al menos una imagen.' });
      return;
    }
    if (form.miniatura === undefined || form.miniatura === null || form.miniatura < 0 || form.miniatura >= form.imagenes.length) {
      setMsg({ type: 'error', text: 'Selecciona la miniatura.' });
      return;
    }
    if (editIdx !== null) {
      setEvents(evts => {
        const updated = evts.map((ev, i) => i === editIdx ? { ...form, id: ev.id } : ev);
        setMsg({ type: 'success', text: 'Evento actualizado correctamente.' });
        return updated;
      });
      setEditIdx(null);
    } else {
      setEvents(evts => {
        setMsg({ type: 'success', text: 'Evento creado correctamente.' });
        // Generar id único
        const newId = Date.now() + Math.floor(Math.random()*1000);
        return [...evts, { ...form, id: newId }];
      });
    }
    setForm(emptyEvent);
    setTimeout(() => setMsg(null), 2000);
  };

  const handleEdit = idx => {
    setForm(events[idx]);
    setEditIdx(idx);
  };

  const handleDelete = idx => {
    setEvents(evts => {
      const nueva = evts.filter((_, i) => i !== idx);
      return nueva;
    });
    setForm(emptyEvent);
    setEditIdx(null);
  };

  return (
    <div style={{
      background: 'rgba(35,35,35,0.95)',
      borderRadius: 18,
      boxShadow: '0 4px 24px #0006',
      padding: '2.5rem 2rem',
      maxWidth: 900,
      margin: '40px auto',
      color: '#fff',
      fontFamily: "'Montserrat', 'Roboto', sans-serif",
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,gap:16}}>
        <h2 style={{ color: '#ff9800', fontWeight: 800, fontSize: '2rem', margin:0 }}>Gestión de Eventos</h2>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
         {/* <button type='button' onClick={handleRestoreDemo} style={{background:'#232323',color:'#ff9800',border:'1px solid #ff9800',borderRadius:8,padding:'6px 18px',fontWeight:700,cursor:'pointer'}}>Restaurar demo</button> */}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button onClick={() => setTab('futuros')} style={{
          background: tab === 'futuros' ? '#ff9800' : '#232323',
          color: tab === 'futuros' ? '#18120a' : '#fff',
          border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
        }}>Futuros</button>
        <button onClick={() => setTab('pasados')} style={{
          background: tab === 'pasados' ? '#ff9800' : '#232323',
          color: tab === 'pasados' ? '#18120a' : '#fff',
          border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
        }}>Pasados</button>
      </div>

      {msg && (
        <div style={{
          background: msg.type === 'success' ? '#4caf50' : '#e91e63',
          color: '#fff',
          borderRadius: 8,
          padding: '10px 18px',
          marginBottom: 18,
          fontWeight: 700,
          textAlign: 'center',
          fontSize: '1.08rem',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px #0004'
        }}>{msg.text}</div>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Título" style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#232323', color: '#fff' }} />
          <input name="date" type="date" value={form.date} onChange={handleChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#232323', color: '#fff' }} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#232323', color: '#fff', minHeight: 60 }} />
          <textarea name="galeriaTexto" value={form.galeriaTexto} onChange={handleChange} placeholder="Descripción extendida para la galería (opcional, más alegre)" style={{ padding: 8, borderRadius: 6, border: '1px solid #ff9800', background: '#232323', color: '#fff', minHeight: 60 }} />
          
          {/* Imágenes: input múltiple y drag&drop */}
          <div style={{ background:'#18120a', border:'1px dashed #ff9800', borderRadius:8, padding:12, marginTop:8 }}
            onDragOver={e=>e.preventDefault()} onDrop={handleDrop}>
            <div style={{fontWeight:700, color:'#ff9800', marginBottom:6}}>Imágenes del evento</div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:8}}>
              {(form.imagenes||[]).map((img,idx)=>(
                <div key={idx} style={{position:'relative'}}>
                  <img src={img} alt='' style={{width:60,height:40,objectFit:'cover',borderRadius:4,border:form.miniatura===idx?'2px solid #ff9800':'2px solid #232323',boxShadow:form.miniatura===idx?'0 0 0 2px #ff980088':'none'}} />
                  <button type='button' onClick={()=>handleRemoveImg(idx)} style={{position:'absolute',top:-8,right:-8,background:'#e91e63',color:'#fff',border:'none',borderRadius:'50%',width:20,height:20,fontWeight:700,cursor:'pointer',fontSize:13,lineHeight:'20px'}}>×</button>
                  <button type='button' onClick={()=>handleSetMiniatura(idx)} style={{position:'absolute',bottom:-8,left:'50%',transform:'translateX(-50%)',background:form.miniatura===idx?'#ff9800':'#232323',color:form.miniatura===idx?'#18120a':'#fff',border:'none',borderRadius:6,padding:'0 8px',fontWeight:700,fontSize:11,cursor:'pointer',boxShadow:'0 1px 4px #0006'}}>{form.miniatura===idx?'Miniatura':'Set mini'}</button>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <input type='text' value={imgInput} onChange={e=>setImgInput(e.target.value)} placeholder='Pega URL de imagen y pulsa + o arrastra archivos aquí' style={{flex:1,padding:6,borderRadius:4,border:'1px solid #444',background:'#232323',color:'#fff'}} />
              <button type='button' onClick={handleAddImg} style={{background:'#ff9800',color:'#18120a',border:'none',borderRadius:6,padding:'0 12px',fontWeight:800,fontSize:18,cursor:'pointer'}}>+</button>
            </div>
            <div style={{fontSize:12,color:'#aaa',marginTop:4}}>Puedes arrastrar imágenes desde tu PC o pegar varias URLs una a una.</div>
          </div>
        </div>
        
        <button type="submit" style={{ marginTop: 16, background: '#ff9800', color: '#18120a', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>{editIdx !== null ? 'Actualizar' : 'Añadir'} evento</button>
        {editIdx !== null && <button type="button" onClick={() => { setForm(emptyEvent); setEditIdx(null); }} style={{ marginLeft: 16, background: '#232323', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Cancelar</button>}
      </form>

      <div>
        {eventosFiltrados.length === 0 && <div style={{ color: '#ff9800', opacity: 0.7, textAlign: 'center' }}>No hay eventos {tab}.</div>}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
          marginBottom: 24
        }}>
          {pagedEventos.map((ev, idx) => (
            <div key={idx} style={{ background: '#232323', borderRadius: 10, padding: 16, boxShadow: '0 2px 8px #0004', position: 'relative', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ff9800', marginBottom: 4 }}>{ev.title}</div>
                <div style={{ fontSize: '0.98rem', color: '#fff', marginBottom: 4 }}>{ev.date}</div>
                <div style={{ fontSize: '0.97rem', color: '#fff', marginBottom: 6 }}>{ev.description}</div>
              </div>
              {ev.imagenes && ev.imagenes.length > 0 && <img src={ev.imagenes[ev.miniatura||0]} alt="" style={{ width: '100%', maxHeight: 80, borderRadius: 6, marginTop: 6, objectFit: 'cover', boxShadow: '0 2px 8px #0006' }} />}
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(events.indexOf(ev))} style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 700, cursor: 'pointer' }}>Editar</button>
                <button onClick={() => handleDelete(events.indexOf(ev))} style={{ background: '#e91e63', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 700, cursor: 'pointer' }}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{background:'#232323',color:'#ff9800',border:'1px solid #ff9800',borderRadius:6,padding:'4px 14px',fontWeight:700,cursor:page===1?'not-allowed':'pointer',opacity:page===1?0.5:1}}>Anterior</button>
            {Array.from({length: totalPages}).map((_,i)=>(
              <button key={i} onClick={()=>setPage(i+1)} style={{background:page===i+1?'#ff9800':'#232323',color:page===i+1?'#18120a':'#ff9800',border:'1px solid #ff9800',borderRadius:6,padding:'4px 10px',fontWeight:700,cursor:'pointer'}}>{i+1}</button>
            ))}
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{background:'#232323',color:'#ff9800',border:'1px solid #ff9800',borderRadius:6,padding:'4px 14px',fontWeight:700,cursor:page===totalPages?'not-allowed':'pointer',opacity:page===totalPages?0.5:1}}>Siguiente</button>
          </div>
        )}
      </div>
    </div>
  );
}
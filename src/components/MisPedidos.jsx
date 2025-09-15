import React, { useState } from 'react';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';

const MisPedidos = () => {
  const { orders } = useOrders();
  const { isLogged } = useAuth();
  const [selected, setSelected] = useState(null);

  if (!isLogged) {
    return (
      <div
        style={{
          backgroundImage: 'url(/images/imagenpedidos.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          padding: '2rem',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '1rem 2rem',
          borderRadius: '10px'
        }}>
          Debes iniciar sesión para ver tus pedidos.
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div
        style={{
          backgroundImage: 'url(/images/imagenpedidos.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          padding: '2rem',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '1rem 2rem',
          borderRadius: '10px'
        }}>
          Aún no has realizado ningún pedido.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: 'url(/images/imagenpedidos.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width: '100%',
        margin: 0,
        padding: '2rem 0',
        paddingTop: '120px', // Más espacio para evitar que la navbar pise el grid
        color: '#fff',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 800,
        color: '#ff9800',
        textAlign: 'center',
        marginBottom: '2rem',
        letterSpacing: '1px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
      }}>
        Mis Pedidos
      </h1>
      
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '20px',
        padding: '2rem',
        margin: '0 2rem'
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            justifyContent: 'center',
            maxWidth: 1100,
            margin: '0 auto'
          }}
        >
        {orders.map(order => (
          <div
            key={order.id}
            style={{
              background: 'rgba(35,35,35,0.8)', // Igual que bloques de eventos
              borderRadius: 16,
              boxShadow: '0 2px 12px #0003',
              padding: '1.5rem 1.2rem',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              transition: 'transform 0.15s',
              border: selected === order.id ? '2px solid #ff9800' : '2px solid transparent',
              overflow: 'hidden',
            }}
          >
            <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div style={{ color: '#fff' }}>
                <b>Fecha:</b> {new Date(order.date).toLocaleString()}<br/>
                <b>Total:</b> ${order.total.toFixed(2)}
                {order.formaPago && (
                  <><br/><b>Pago:</b> {order.formaPago}</>
                )}
                {order.tipoEntrega && (
                  <><br/><b>Entrega:</b> {order.tipoEntrega}</>
                )}
              </div>
              <button onClick={()=>setSelected(selected===order.id?null:order.id)} style={{background:'#ff9800',color:'#232323',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,cursor:'pointer',boxShadow:'0 1px 4px #ff980055'}}>Ver recibo</button>
            </div>
            <div style={{
              maxHeight: selected===order.id ? 500 : 0,
              opacity: selected===order.id ? 1 : 0,
              transition: 'max-height 0.35s cubic-bezier(.4,2,.6,1), opacity 0.2s',
              overflow: 'hidden',
              width:'100%'
            }}>
              {selected===order.id && (
                <div style={{marginTop:12,background:'#181818',borderRadius:8,padding:16,width:'100%'}}>
                  <b>Productos:</b>
                  <ul style={{margin:'8px 0 0 0',padding:0}}>
                    {order.items.map((item,i)=>(
                      <li key={i} style={{listStyle:'none',color:'#fff',marginBottom:4,padding:'4px 0',borderBottom:'1px solid #333'}}>
                        {item.name} x{item.qty} - ${(item.price * item.qty).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <div style={{marginTop:12,color:'#ff9800',fontWeight:700,fontSize:'1.1rem'}}>
                    Total: ${order.total.toFixed(2)}
                  </div>
                  {order.formaPago && (
                    <div style={{marginTop:8,color:'#aaa'}}>
                      Método de pago: {order.formaPago}
                    </div>
                  )}
                  {order.tipoEntrega && (
                    <div style={{color:'#aaa'}}>
                      Tipo de entrega: {order.tipoEntrega}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MisPedidos;

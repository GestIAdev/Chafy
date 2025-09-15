import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAlbum } from '../context/AlbumContext';
import { useOrders } from '../context/OrdersContext';
import { FaTrash, FaMoneyBillWave, FaCreditCard, FaQrcode } from 'react-icons/fa';

const CartPagoModal = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const { addCard } = useAlbum();
  const { addOrder } = useOrders();
  const [step, setStep] = useState('carrito'); // 'carrito' | 'pago' | 'exito'
  const [metodo, setMetodo] = useState(null); // 'efectivo' | 'tarjeta' | 'mercadopago'
  const [tipoEntrega, setTipoEntrega] = useState('domicilio'); // 'domicilio' | 'recoger'
  const [form, setForm] = useState({ card: '', name: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + item.qty * (item.price || 0), 0);

  const handlePedido = () => {
    if (pedidoEnviado) return;
    setPedidoEnviado(true);
    addOrder({
      date: new Date().toISOString(),
      items: cart.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
      total,
      formaPago: metodo,
      tipoEntrega
    });
    // Otorgar una carta por cada unidad de producto no-premio, según su categoría
    cart.forEach(item => {
      if (!item.premio) {
        for (let i = 0; i < item.qty; i++) {
          addCard(item.category);
        }
      }
    });
    clearCart();
    setStep('exito');
    setTimeout(() => {
      setStep('carrito');
      setMetodo(null);
      setPedidoEnviado(false); // Reactivar botones al cerrar
      onClose();
    }, 1800);
  };

  const handleCardPay = (e) => {
    e.preventDefault();
    if (!/^\d{16}$/.test(form.card)) return setError('Número de tarjeta inválido');
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) return setError('Fecha inválida (MM/AA)');
    if (!/^\d{3}$/.test(form.cvv)) return setError('CVV inválido');
    if (!form.name.trim()) return setError('Nombre requerido');
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handlePedido();
    }, 1500);
  };

  return (
    <div className="register-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => !pedidoEnviado && onClose()}>
      <div className="register-modal-content" style={{ maxWidth: 480, width: '90vw', background: '#232323', borderRadius: 16, padding: 32, position: 'relative', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ color: '#ff9800', fontSize: '2rem', fontWeight: 800, marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>
          {step === 'carrito' ? 'Tu Carrito' : step === 'pago' ? 'Finalizar Pedido' : '¡Pedido Realizado!'}
        </h2>
        
        {step === 'carrito' && (
          <>
            {cart.length === 0 ? (
              <div style={{ color: '#fff', textAlign: 'center', margin: '32px 0', fontSize: '1.2rem', fontWeight: 700, letterSpacing: 1 }}>El carrito está vacío.</div>
            ) : (
              <div style={{
                background: 'rgba(24,24,27,0.92)',
                borderRadius: 18,
                boxShadow: '0 2px 16px #0008',
                padding: '28px 24px 18px 24px',
                marginBottom: 18,
                marginTop: 8,
                maxHeight: 340,
                overflowY: 'auto',
                border: '2px solid #ff9800',
                position: 'relative',
                minHeight: 120
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cart.map(item => (
                    <li key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 16,
                      background: 'rgba(255,152,0,0.08)',
                      borderRadius: 12,
                      padding: '12px 16px',
                      border: '1px solid rgba(255,152,0,0.15)',
                      boxShadow: '0 1px 4px #0002'
                    }}>
                      <span style={{ flex: 1, color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>{item.name}</span>
                      <input 
                        type="number" 
                        min={1} 
                        value={item.qty} 
                        onChange={e => updateQty(item.id, Number(e.target.value))} 
                        style={{ 
                          width: 48, 
                          margin: '0 12px', 
                          borderRadius: 6, 
                          border: '1px solid #ff9800', 
                          background: '#181818', 
                          color: '#fff', 
                          textAlign: 'center',
                          padding: '4px 2px',
                          fontSize: '0.95rem',
                          fontWeight: 600
                        }} 
                      />
                      <span style={{ color: '#ff9800', fontWeight: 800, marginRight: 12, fontSize: '1.1rem', letterSpacing: 0.5 }}>
                        {item.premio ? 'Gratis' : `$${((item.price || 0) * item.qty).toFixed(2)}`}
                      </span>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ff9800', cursor: 'pointer', fontSize: 22, marginLeft: 2, transition: 'color 0.2s' }} title="Eliminar"><FaTrash /></button>
                    </li>
                  ))}
                </ul>
                <div style={{
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  textAlign: 'right',
                  margin: '18px 0 0 0',
                  letterSpacing: 1.2,
                  textShadow: '0 2px 8px #0008',
                  borderTop: '1.5px solid #ff9800',
                  paddingTop: 12
                }}>
                  Total: <span style={{ color: '#ff9800', fontWeight: 900, fontSize: '1.35rem', letterSpacing: 1.5 }}>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 18 }}>
                  <button onClick={clearCart} style={{ background: 'none', color: '#ff9800', fontWeight: 800, border: '2px solid #ff9800', borderRadius: 8, padding: '10px 22px', fontSize: '1.08rem', cursor: 'pointer', transition: 'background 0.2s, color 0.2s', boxShadow: '0 1px 4px #0002' }}>Vaciar</button>
                  <button onClick={() => setStep('pago')} style={{ background: '#ff9800', color: '#232323', fontWeight: 900, border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: '1.13rem', cursor: 'pointer', boxShadow: '0 1px 8px #ff980055', letterSpacing: 1 }}>Pagar</button>
                </div>
              </div>
            )}
          </>
        )}

        {step === 'pago' && (
          <>
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#ff9800', fontWeight: 700, marginBottom: 12, display: 'block', fontSize: '1.1rem' }}>Tipo de entrega:</label>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => setTipoEntrega('domicilio')} style={{ background: tipoEntrega === 'domicilio' ? '#ff9800' : 'none', color: tipoEntrega === 'domicilio' ? '#232323' : '#ff9800', border: '2px solid #ff9800', borderRadius: 8, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>Domicilio</button>
                <button onClick={() => setTipoEntrega('recoger')} style={{ background: tipoEntrega === 'recoger' ? '#ff9800' : 'none', color: tipoEntrega === 'recoger' ? '#232323' : '#ff9800', border: '2px solid #ff9800', borderRadius: 8, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>Recoger en local</button>
              </div>
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#ff9800', fontWeight: 700, marginBottom: 12, display: 'block', fontSize: '1.1rem' }}>Método de pago:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button onClick={() => setMetodo('efectivo')} style={{ background: metodo === 'efectivo' ? '#ff9800' : 'rgba(35,35,35,0.8)', color: metodo === 'efectivo' ? '#232323' : '#fff', border: '2px solid #ff9800', borderRadius: 8, padding: '12px 16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FaMoneyBillWave /> Efectivo
                </button>
                <button onClick={() => setMetodo('tarjeta')} style={{ background: metodo === 'tarjeta' ? '#ff9800' : 'rgba(35,35,35,0.8)', color: metodo === 'tarjeta' ? '#232323' : '#fff', border: '2px solid #ff9800', borderRadius: 8, padding: '12px 16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FaCreditCard /> Tarjeta de crédito
                </button>
                <button onClick={() => setMetodo('mercadopago')} style={{ background: metodo === 'mercadopago' ? '#ff9800' : 'rgba(35,35,35,0.8)', color: metodo === 'mercadopago' ? '#232323' : '#fff', border: '2px solid #ff9800', borderRadius: 8, padding: '12px 16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FaQrcode /> MercadoPago
                </button>
              </div>
            </div>

            {metodo === 'tarjeta' && (
              <form onSubmit={handleCardPay} style={{ marginBottom: 24 }}>
                <input type="text" placeholder="Número de tarjeta (16 dígitos)" value={form.card} onChange={e => setForm({ ...form, card: e.target.value })} style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
                <input type="text" placeholder="Nombre del titular" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', gap: 12 }}>
                  <input type="text" placeholder="MM/AA" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: '1rem' }} />
                  <input type="text" placeholder="CVV" value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: '1rem' }} />
                </div>
                {error && <div style={{ color: '#e91e63', marginTop: 8, fontSize: '0.9rem' }}>{error}</div>}
                <button type="submit" disabled={loading || pedidoEnviado} style={{ marginTop: 8, background: '#ff9800', color: '#232323', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: '1rem', cursor: loading || pedidoEnviado ? 'not-allowed' : 'pointer', opacity: loading || pedidoEnviado ? 0.6 : 1 }}>
                  {loading ? 'Procesando...' : 'Confirmar pago'}
                </button>
              </form>
            )}

            {metodo && metodo !== 'tarjeta' && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: '#fff', marginBottom: 16, padding: 16, background: 'rgba(24,24,27,0.8)', borderRadius: 8, border: '1px solid #ff9800' }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Resumen del pedido:</div>
                  <div>Total a pagar: <span style={{ color: '#ff9800', fontWeight: 700 }}>${total.toFixed(2)}</span></div>
                  <div>Entrega: {tipoEntrega === 'domicilio' ? 'A domicilio' : 'Recoger en local'}</div>
                  <div>Método: {metodo === 'efectivo' ? 'Efectivo' : 'MercadoPago'}</div>
                </div>
                <button onClick={handlePedido} disabled={pedidoEnviado} style={{ marginTop: 8, background: '#ff9800', color: '#232323', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: '1rem', cursor: pedidoEnviado ? 'not-allowed' : 'pointer', opacity: pedidoEnviado ? 0.6 : 1 }}>Confirmar pago</button>
              </div>
            )}
            <button onClick={() => setStep('carrito')} style={{ marginTop: 24, background: 'none', color: '#ff9800', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Volver al carrito</button>
          </>
        )}
        {step === 'exito' && (
          <div style={{ color: '#ff9800', textAlign: 'center', margin: '64px 0', fontWeight: 800, fontSize: '1.5rem' }}>¡Pedido realizado con éxito!</div>
        )}
        
        {!pedidoEnviado && step !== 'exito' && (
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', color: '#ff9800', fontWeight: 700, fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        )}
      </div>
    </div>
  );
};

export default CartPagoModal;

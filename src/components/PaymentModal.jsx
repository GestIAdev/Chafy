import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaLock, FaTimes, FaCheckCircle } from 'react-icons/fa';

const PaymentModal = ({ onClose, orderData, total }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [paypalForm, setPaypalForm] = useState({
    email: '',
    password: ''
  });
  const [cashForm, setCashForm] = useState({
    receivedAmount: '',
    customerNotes: ''
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCardInputChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substr(0, 19);
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) value = value.substr(0, 5);
    }
    
    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substr(0, 3);
    }

    setCardForm({ ...cardForm, [name]: value });
  };

  const handlePaypalInputChange = (e) => {
    setPaypalForm({ ...paypalForm, [e.target.name]: e.target.value });
  };

  const handleCashInputChange = (e) => {
    setCashForm({ ...cashForm, [e.target.name]: e.target.value });
  };

  const processPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      let paymentData = {
        method: paymentMethod,
        amount: total,
        orderData: orderData
      };

      switch (paymentMethod) {
        case 'card':
          paymentData.cardData = cardForm;
          break;
        case 'paypal':
          paymentData.paypalData = paypalForm;
          break;
        case 'cash':
          paymentData.cashData = cashForm;
          break;
      }

      const response = await axios.post('/api/process-payment', paymentData);
      
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose && onClose(true); // Pass success to parent
        }, 2000);
      } else {
        setError(response.data.message || 'Error en el procesamiento del pago');
      }
    } catch (err) {
      setError('Error al procesar el pago. Intenta nuevamente.');
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  const PaymentMethodButton = ({ method, icon, label, active, onClick }) => (
    <button
      type="button"
      onClick={() => onClick(method)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        padding: '1rem',
        border: `2px solid ${active ? '#ff9800' : '#444'}`,
        background: active ? '#ff9800' : 'transparent',
        color: active ? '#232323' : '#fff',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontWeight: 700,
        fontSize: '1rem'
      }}
    >
      {icon}
      {label}
    </button>
  );

  if (!showModal) return null;

  // Crear el modal root si no existe
  if (!document.getElementById('modal-root')) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.8)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#232323',
          borderRadius: 18,
          padding: '2rem',
          minWidth: 400,
          maxWidth: 500,
          width: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 4px 24px #0008',
          color: '#fff',
          position: 'relative',
          border: '2px solid #ff9800'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'none',
            border: 'none',
            color: '#ff9800',
            fontSize: 28,
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          <FaTimes />
        </button>

        {success ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem'
          }}>
            <FaCheckCircle style={{
              fontSize: '4rem',
              color: '#4caf50',
              marginBottom: '1rem'
            }} />
            <h2 style={{
              color: '#4caf50',
              fontSize: '1.8rem',
              fontWeight: 800,
              marginBottom: '1rem'
            }}>
              ¡Pago Exitoso!
            </h2>
            <p style={{ color: '#ccc' }}>
              Tu pedido ha sido procesado correctamente.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '1rem',
              color: '#ff9800',
              textAlign: 'center',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <FaLock /> Pago Seguro
            </h2>

            <div style={{
              background: '#18120a',
              padding: '1rem',
              borderRadius: 8,
              marginBottom: '1.5rem',
              border: '1px solid #ff9800'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#ccc' }}>Total a pagar:</span>
                <span style={{
                  color: '#ff9800',
                  fontSize: '1.5rem',
                  fontWeight: 800
                }}>
                  ${total}
                </span>
              </div>
            </div>

            {error && (
              <div style={{
                color: '#e91e63',
                background: 'rgba(233, 30, 99, 0.1)',
                padding: '1rem',
                borderRadius: 8,
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: 700
              }}>
                {error}
              </div>
            )}

            {/* Payment Method Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '1rem',
                color: '#ff9800',
                fontWeight: 700,
                fontSize: '1.1rem'
              }}>
                Método de Pago
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '0.8rem'
              }}>
                <PaymentMethodButton
                  method="card"
                  icon={<FaCreditCard />}
                  label="Tarjeta"
                  active={paymentMethod === 'card'}
                  onClick={setPaymentMethod}
                />
                <PaymentMethodButton
                  method="paypal"
                  icon={<FaPaypal />}
                  label="PayPal"
                  active={paymentMethod === 'paypal'}
                  onClick={setPaymentMethod}
                />
                <PaymentMethodButton
                  method="cash"
                  icon={<FaMoneyBillWave />}
                  label="Efectivo"
                  active={paymentMethod === 'cash'}
                  onClick={setPaymentMethod}
                />
              </div>
            </div>

            <form onSubmit={processPayment}>
              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardForm.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      style={{
                        width: '100%',
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#ff9800',
                        fontWeight: 700
                      }}>
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardForm.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/AA"
                        required
                        style={{
                          width: '100%',
                          border: '2px solid #ff9800',
                          background: '#18120a',
                          color: '#fff',
                          borderRadius: 8,
                          padding: 12,
                          fontSize: '1rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#ff9800',
                        fontWeight: 700
                      }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardForm.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        required
                        style={{
                          width: '100%',
                          border: '2px solid #ff9800',
                          background: '#18120a',
                          color: '#fff',
                          borderRadius: 8,
                          padding: 12,
                          fontSize: '1rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Nombre del Titular
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardForm.cardholderName}
                      onChange={handleCardInputChange}
                      placeholder="Juan Pérez"
                      required
                      style={{
                        width: '100%',
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* PayPal Payment Form */}
              {paymentMethod === 'paypal' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Email de PayPal
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={paypalForm.email}
                      onChange={handlePaypalInputChange}
                      placeholder="tu@email.com"
                      required
                      style={{
                        width: '100%',
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={paypalForm.password}
                      onChange={handlePaypalInputChange}
                      placeholder="••••••••"
                      required
                      style={{
                        width: '100%',
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Cash Payment Form */}
              {paymentMethod === 'cash' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Monto Recibido
                    </label>
                    <input
                      type="number"
                      name="receivedAmount"
                      value={cashForm.receivedAmount}
                      onChange={handleCashInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min={total}
                      required
                      style={{
                        width: '100%',
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {cashForm.receivedAmount && parseFloat(cashForm.receivedAmount) > total && (
                    <div style={{
                      background: '#4caf50',
                      color: '#fff',
                      padding: '0.8rem',
                      borderRadius: 8,
                      textAlign: 'center',
                      fontWeight: 700
                    }}>
                      Cambio: ${(parseFloat(cashForm.receivedAmount) - total).toFixed(2)}
                    </div>
                  )}

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#ff9800',
                      fontWeight: 700
                    }}>
                      Notas del Cliente (Opcional)
                    </label>
                    <textarea
                      name="customerNotes"
                      value={cashForm.customerNotes}
                      onChange={handleCashInputChange}
                      placeholder="Comentarios adicionales..."
                      rows="3"
                      style={{
                        width: '100%',
                        border: '2px solid #ff9800',
                        background: '#18120a',
                        color: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: '1rem',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                style={{
                  marginTop: '1.5rem',
                  background: processing ? '#666' : '#ff9800',
                  color: processing ? '#ccc' : '#232323',
                  border: 'none',
                  borderRadius: 8,
                  padding: 16,
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {processing ? (
                  <>Procesando...</>
                ) : (
                  <>
                    <FaLock /> Procesar Pago - ${total}
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default PaymentModal;

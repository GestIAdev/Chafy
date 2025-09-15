
import React, { useEffect } from 'react';

const menuItems = [
  {
    category: "Bebidas",
    items: [
      { name: "Mojito Clásico", price: "$8.500", description: "Ron blanco, menta fresca, lima y soda" },
      { name: "Piña Colada", price: "$9.000", description: "Ron, crema de coco, jugo de piña" },
      { name: "Cerveza Artesanal", price: "$5.500", description: "Selección de cervezas locales" }
    ]
  },
  {
    category: "Comidas",
    items: [
      { name: "Pizza Margarita", price: "$12.000", description: "Tomate, mozzarella, albahaca fresca" },
      { name: "Hamburguesa BBQ", price: "$15.000", description: "Carne premium, queso cheddar, salsa BBQ" },
      { name: "Nachos Supremos", price: "$11.000", description: "Tortillas, queso, jalapeños, guacamole" }
    ]
  }
];

const Menu = () => {
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
      background: 'linear-gradient(135deg, #18120a 0%, #2c1f14 100%)',
      color: '#fff',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#ff9800',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Nuestro Menú
        </h1>
        {menuItems.map((category, index) => (
          <div key={index} style={{ marginBottom: '3rem' }}>
            <h2 style={{
              color: '#ff9800',
              fontSize: '2rem',
              borderBottom: '2px solid #ff9800',
              paddingBottom: '0.5rem',
              marginBottom: '2rem'
            }}>
              {category.category}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{
                  background: 'rgba(255, 152, 0, 0.1)',
                  border: '1px solid #ff9800',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{ color: '#ff9800', margin: 0 }}>{item.name}</h3>
                    <span style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}>
                      {item.price}
                    </span>
                  </div>
                  <p style={{
                    color: '#ccc',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ...existing code...
// ...existing code...

export default Menu;

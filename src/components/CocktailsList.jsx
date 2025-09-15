import React, { useState, useEffect } from 'react';

// Diccionarios para traducir
const categoryDict = {
  'Ordinary Drink': 'Bebida Común',
  'Cocktail': 'Cóctel',
  'Milk / Float / Shake': 'Batido / Licuado',
  'Other/Unknown': 'Otro/Desconocido',
  'Cocoa': 'Cacao',
  'Shot': 'Chupito',
  'Coffee / Tea': 'Café / Té',
  'Homemade Liqueur': 'Licor Casero',
  'Punch / Party Drink': 'Ponche / Bebida de Fiesta',
  'Beer': 'Cerveza',
  'Soft Drink / Soda': 'Refresco'
};

const alcoholicDict = {
  'Alcoholic': 'Con alcohol',
  'Non alcoholic': 'Sin alcohol',
  'Optional alcohol': 'Alcohol opcional'
};

function traducirCategoria(cat) {
  return categoryDict[cat] || cat;
}

function traducirAlcoholic(tipo) {
  return alcoholicDict[tipo] || tipo;
}

function traducirInstrucciones(instructions) {
  if (!instructions) return '';
  // Traducciones básicas
  return instructions
    .replace(/Shake/gi, 'Agitar')
    .replace(/Stir/gi, 'Remover')
    .replace(/Pour/gi, 'Verter')
    .replace(/Add/gi, 'Añadir')
    .replace(/Serve/gi, 'Servir')
    .replace(/Mix/gi, 'Mezclar')
    .replace(/Garnish/gi, 'Decorar')
    .replace(/ice/gi, 'hielo')
    .replace(/glass/gi, 'vaso')
    .replace(/cocktail/gi, 'cóctel');
}

export default function CocktailsList() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then(res => res.json())
      .then(data => {
        // Siempre aseguramos que sea array
        setCocktails(Array.isArray(data.drinks) ? data.drinks : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los cócteles');
        setLoading(false);
      });
  }, [search]);

  return (
    <div style={{
      background: 'rgba(24,18,10,0.8)',
      color: '#fff',
      borderRadius: 18,
      padding: '2rem',
      maxWidth: 900,
      margin: '40px auto',
      fontFamily: 'Montserrat, Roboto, sans-serif'
    }}>
      <h2 style={{
        color: '#ff9800',
        fontWeight: 800,
        fontSize: '2rem',
        marginBottom: 24
      }}>
        Lista de Cócteles
      </h2>
      
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar cóctel por nombre..."
        style={{
          padding: 8,
          borderRadius: 6,
          border: '1px solid #444',
          background: '#232323',
          color: '#fff',
          marginBottom: 24,
          width: '100%'
        }}
      />
      
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: '#e91e63' }}>{error}</div>}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 18
      }}>
        {cocktails.map(cocktail => (
          <div 
            key={cocktail.idDrink} 
            style={{
              background: 'rgba(24,18,10,0.8)',
              borderRadius: 10,
              padding: 16,
              boxShadow: '0 2px 8px #0004',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img 
              src={cocktail.strDrinkThumb} 
              alt={cocktail.strDrinkES || cocktail.strDrink} 
              style={{
                width: '100%',
                maxWidth: 180,
                borderRadius: 8,
                marginBottom: 12,
                objectFit: 'cover',
                boxShadow: '0 2px 8px #0006'
              }} 
            />
            <div style={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#ff9800',
              marginBottom: 4
            }}>
              {cocktail.strDrinkES || cocktail.strDrink}
            </div>
            <div style={{
              fontSize: '0.97rem',
              color: '#fff',
              marginBottom: 6
            }}>
              {traducirCategoria(cocktail.strCategory)}
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: '#aaa',
              marginBottom: 8
            }}>
              {traducirAlcoholic(cocktail.strAlcoholic)}
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: '#fff',
              marginBottom: 8
            }}>
              {cocktail.strInstructionsES || traducirInstrucciones(cocktail.strInstructions)}
            </div>
          </div>
        ))}
      </div>
      
      {(!loading && cocktails.length === 0) && (
        <div style={{
          color: '#ff9800',
          opacity: 0.7,
          textAlign: 'center',
          marginTop: 24
        }}>
          No se encontraron cócteles.
        </div>
      )}
    </div>
  );
}

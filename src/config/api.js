import axios from 'axios';

// Define la URL base de la API.
// Usa la variable de entorno REACT_APP_API_URL si está disponible,
// si no, usa la URL local como fallback.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Crea una instancia de axios con la configuración centralizada.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Exporta la instancia para ser usada en toda la aplicación.
export default apiClient;

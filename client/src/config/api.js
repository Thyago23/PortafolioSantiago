// API Base URL - detecta automáticamente producción o desarrollo
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://' + window.location.hostname + '/api'
  : 'http://localhost:5000/api';

export default API_URL;

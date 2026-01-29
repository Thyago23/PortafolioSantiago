// API Base URL - detecta automáticamente producción o desarrollo
const API_URL = typeof window !== 'undefined'
  ? window.location.hostname.includes('localhost')
    ? 'http://localhost:5000/api'
    : window.location.origin + '/api'
  : '/api';

export default API_URL;

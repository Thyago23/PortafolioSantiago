import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Petición al backend con tus credenciales
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Guardamos la llave (Token) en el navegador
      localStorage.setItem('token', res.data.token);
      
      // Redirección al Dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      alert("❌ ACCESO_DENEGADO: Credenciales incorrectas para el sistema de Santiago Cedeño");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-mono">
      <form onSubmit={handleLogin} className="border border-fly-away p-8 bg-black/60 backdrop-blur-xl w-full max-w-md shadow-[0_0_30px_rgba(132,182,244,0.2)]">
        <h2 className="text-2xl text-polar-blizzard mb-6 tracking-[5px] uppercase">LOGIN_ADMIN_SYSTEM</h2>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="USUARIO_ID (sgcedenob@puce.edu.ec)" 
            className="w-full bg-transparent border-b border-blue-vault p-2 text-white outline-none focus:border-fly-away"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="ACCESS_CODE" 
            className="w-full bg-transparent border-b border-blue-vault p-2 text-white outline-none focus:border-fly-away"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full mt-8 py-3 bg-blue-vault/20 border border-blue-vault text-blue-vault hover:bg-blue-vault hover:text-white transition-all">
          DECRYPT_ACCESS.exe
        </button>
      </form>
    </div>
  );
}
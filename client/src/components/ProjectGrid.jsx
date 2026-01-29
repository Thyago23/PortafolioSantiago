import React, { useState } from "react";

const projects = [
  { 
    id: 1, 
    title: 'SISTEMA_BANCARIO', 
    lang: 'Python/SQL', 
    status: 'deployed',
    description: 'Aplicación web que emula las operaciones de un cajero automático con gestión de saldos y persistencia de datos segura.'
  },
  { 
    id: 2, 
    title: 'PLATAFORMA_EDU', 
    lang: 'React/Node', 
    status: 'v2.0',
    description: 'Aplicación dinámica para aprendizaje matemático con diseño adaptativo que incrementa la dificultad según el desempeño.'
  },
  { 
    id: 3, 
    title: 'MONOPOLIO_SIM', 
    lang: 'JS/Logic', 
    status: 'v1.1',
    description: 'Juego de simulación adaptado al entorno laboral para reforzar metas de venta y mejorar el clima laboral.'
  },
  { 
    id: 4, 
    title: 'Proof of repair (RoP)', 
    lang: 'React/Node/blockchain', 
    status: 'beta',
    description: 'Sistema de verificación de reparaciones utilizando tecnología blockchain para garantizar transparencia.'
  },
];

export default function ProjectGrid() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((p) => (
          <div 
            key={p.id} 
            onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
            className={`group border p-4 transition-all cursor-pointer relative overflow-hidden h-32 flex flex-col justify-center
              ${selectedId === p.id ? 'border-fly-away bg-fly-away/5' : 'border-blue-vault/20 hover:border-fly-away'}`}
          >
            <div className="absolute top-0 right-0 p-1 text-[10px] bg-blue-vault/10 text-fly-away uppercase">
              {p.status}
            </div>
            <h3 className="text-polar-blizzard font-bold mb-2 tracking-widest">{p.title}</h3>
            <p className="text-xs text-blue-vault italic">{`// source_code: ${p.lang}`}</p>
            <div className={`mt-4 h-1 bg-fly-away transition-all duration-500 ${selectedId === p.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
          </div>
        ))}
      </div>

      {/* Sección de Explicación Desplegable */}
      {selectedId && (
        <div className="mt-8 p-6 border border-fly-away/30 bg-black/60 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-fly-away font-bold tracking-[5px] uppercase text-xl">
              {`> INFO_${projects.find(p => p.id === selectedId).title}`}
            </h2>
            <button 
              onClick={() => setSelectedId(null)}
              className="text-blue-vault hover:text-white transition-colors"
            >
              [X_CLOSE]
            </button>
          </div>
          <p className="text-fly-kite font-mono leading-relaxed opacity-90">
            {projects.find(p => p.id === selectedId).description}
          </p>
          <div className="mt-4 flex gap-4 text-[10px] text-blue-vault uppercase">
            <span>Status: {projects.find(p => p.id === selectedId).status}</span>
            <span>Ref: SYSTEM_STORAGE_LOCAL</span>
          </div>
        </div>
      )}
    </div>
  );
}
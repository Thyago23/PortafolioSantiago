import React, { useState, useEffect } from "react";
import { 
  Code2, 
  Cpu, 
  FileCode, 
  Layers, 
  Terminal, 
  Database 
} from "lucide-react";

// 1. Mantenemos tus habilidades fijas originales
const staticSkills = [
  { name: 'JavaScript', level: '90%', icon: <FileCode size={20} />, category: 'Core' },
  { name: 'React', level: '85%', icon: <Cpu size={20} />, category: 'Frontend' },
  { name: 'Python', level: '80%', icon: <Terminal size={20} />, category: 'Backend' },
  { name: 'Node.js', level: '75%', icon: <Code2 size={20} />, category: 'Backend' },
  { name: 'Tailwind CSS', level: '95%', icon: <Layers size={20} />, category: 'Frontend' },
  { name: 'MongoDB', level: '70%', icon: <Database size={20} />, category: 'Database' },
];

export default function Skills() {
  const [dynamicSkills, setDynamicSkills] = useState([]);

  // 2. Cargamos las habilidades nuevas de la base de datos
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/skills');
        const data = await response.json();
        // Mapeamos para que tengan un icono por defecto si vienen de la DB
        const mappedData = data.map(s => ({
          ...s,
          icon: <Code2 size={20} /> // Icono por defecto para lo nuevo
        }));
        setDynamicSkills(mappedData);
      } catch (error) {
        console.error("Error cargando nuevas habilidades:", error);
      }
    };
    fetchSkills();
  }, []);

  // 3. Unimos ambas listas
  const allSkills = [...staticSkills, ...dynamicSkills];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-black/40 rounded-xl border border-fly-away/20 backdrop-blur-md shadow-[0_0_15px_rgba(132,182,244,0.1)]">
      <h3 className="text-fly-away font-bold mb-10 uppercase tracking-[5px] text-center flex items-center justify-center gap-3">
        <Terminal size={24} /> Technical_Skills
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {allSkills.map((skill, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3 text-polar-blizzard group-hover:text-fly-away transition-colors">
                <span className="text-fly-away/70">{skill.icon}</span>
                <span className="font-mono text-sm tracking-tighter uppercase font-bold">
                    {skill.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-fly-kite font-mono text-xs opacity-60 block">
                    {skill.level.includes('%') ? skill.level : `${skill.level}%`}
                </span>
              </div>
            </div>
            
            {/* Barra de progreso con efecto Glow */}
            <div className="h-[2px] w-full bg-blue-vault/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-fly-away shadow-[0_0_8px_#84b6f4] transition-all duration-1000 ease-out" 
                style={{ width: skill.level.includes('%') ? skill.level : `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
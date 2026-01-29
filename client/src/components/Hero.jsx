// @ts-nocheck
import Typewriter from 'typewriter-effect';
import React from "react";

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center p-6 relative z-10 mt-20">
      {/* Contenedor Principal con efecto Neón */}
      <div className="border border-fly-away/30 bg-black/80 p-8 rounded-lg backdrop-blur-md max-w-3xl w-full shadow-[0_0_30px_rgba(132,182,244,0.15)] ring-1 ring-white/5">
        
        {/* Título con Typewriter */}
        <div className="text-4xl md:text-6xl font-bold text-white font-mono mb-6">
          <Typewriter
            options={{
              strings: ['> SANTIAGO_CEDEÑO', '> SYSTEM_ONLINE'],
              autoStart: true,
              loop: true,
              cursor: '_',
            }}
          />
        </div>

        {/* Sección de Datos Personales Estilizada */}
        <div className="space-y-3 border-t border-fly-away/20 pt-6 font-mono text-sm md:text-base">
          
          {/* Fila: Estudio */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <span className="text-fly-away font-bold">ESTUDIO:</span>
            <span className="text-fly-kite opacity-90">Pontificia Universidad Católica del Ecuador</span>
          </div>

          {/* Fila: Contacto */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <span className="text-fly-away font-bold">CONTACT_INFO:</span>
            <span className="text-fly-kite opacity-90">0992779736 | CI: 1752903995</span>
          </div>

          {/* Fila: Mail Personal */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <span className="text-fly-away font-bold">PERSONAL_MAIL:</span>
            <a href="mailto:noa00santy@gmail.com" className="text-fly-kite hover:text-white transition-colors underline decoration-fly-away/30">
              noa00santy@gmail.com
            </a>
          </div>

          {/* Fila: Mail Institucional */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <span className="text-fly-away font-bold">INST_MAIL:</span>
            <a href="mailto:sgcedenob@puce.edu.ec" className="text-fly-kite hover:text-white transition-colors underline decoration-fly-away/30">
              sgcedenob@puce.edu.ec
            </a>
          </div>

          {/* Fila: Edad */}
          <div className="flex gap-4">
            <span className="text-fly-away font-bold">AGE:</span>
            <span className="text-fly-kite opacity-90">19</span>
          </div>

          {/* Fila: Idiomas */}
          <div className="flex gap-4">
            <span className="text-fly-away font-bold">Idiomas:</span>
            <span className="text-fly-kite opacity-90">Español Nativo, Inglés B1, Frances A2</span>
          </div>

        </div>

        {/* Footer del cuadro tipo terminal */}
        <div className="mt-6 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-blue-vault uppercase tracking-widest">
            Status: Rendering_Successful
          </span>
        </div>

      </div>
    </section>
  );
}

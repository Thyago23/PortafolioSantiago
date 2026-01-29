import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Skills from './components/Skills'; 
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';

function Home() {
  return (
    <div className="relative">
      <Hero />
      <div id="projects" className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-center text-white text-2xl mb-12 tracking-[10px] uppercase font-bold">
          various_projects
        </h2>
        <ProjectGrid />
        <div className="mt-32">
          <Skills />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-fly-kite font-mono">
        <nav className="fixed top-0 w-full p-4 flex justify-between items-center bg-black/60 backdrop-blur-md z-50 border-b border-white/10">
          <span className="text-fly-away font-bold tracking-tighter">My_Portfolio</span>
          <div className="space-x-6 text-[10px] uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>

            {/* BLOG (nuevo, sin cambiar estilos) */}
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>

            <a href="/admin/dashboard" className="text-blue-vault hover:text-white transition-colors border border-blue-vault/20 px-2">
              Admin
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

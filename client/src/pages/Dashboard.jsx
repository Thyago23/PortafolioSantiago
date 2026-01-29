import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import API_URL from '../config/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  // 1. Estados para los 3 formularios
  const [project, setProject] = useState({
    title: '', description: '', technologies: '', githubLink: '', status: 'deployed'
  });

  const [skill, setSkill] = useState({
    name: '', category: 'Lenguajes', level: '80%'
  });

  const [post, setPost] = useState({
    title: '', content: '', category: 'Backend'
  });

  // Estado para listar posts
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Verificación de seguridad: si no hay token, al login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  // Cargar posts cuando se abre la pestaña de blog
  useEffect(() => {
    if (activeTab === 'blog') {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error('Error al cargar posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  // 2. Manejadores de envío (Submit)
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const projectData = {
      ...project,
      technologies: project.technologies.split(',').map(t => t.trim().toUpperCase())
    };
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(projectData),
      });
      if (res.ok) {
        alert("✅ PROYECTO_AÑADIDO_EXITOSAMENTE");
        setProject({ title: '', description: '', technologies: '', githubLink: '', status: 'deployed' });
      } else {
        alert("❌ ERROR: El servidor rechazó el proyecto");
      }
    } catch (err) { alert("❌ ERROR_DE_CONEXIÓN_CON_BACKEND"); }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(skill),
      });
      if (res.ok) {
        alert(`✅ HABILIDAD_REGISTRADA: ${skill.name}`);
        setSkill({ name: '', category: 'Lenguajes', level: '80%' });
      }
    } catch (err) { alert("❌ ERROR_AL_REGISTRAR_SKILL"); }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        alert("✅ BLOG_POST_PUBLICADO_CON_ÉXITO");
        setPost({ title: '', content: '', category: 'Backend' });
        fetchPosts(); // Recargar la lista de posts
      } else {
        alert("❌ ERROR: No se pudo publicar el post");
      }
    } catch (err) { alert("❌ ERROR_CRÍTICO_EN_EL_ENVÍO"); }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este blog?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
      if (res.ok) {
        alert("✅ BLOG_ELIMINADO_EXITOSAMENTE");
        fetchPosts(); // Recargar la lista de posts
      } else {
        alert("❌ ERROR: No se pudo eliminar el blog");
      }
    } catch (err) {
      alert("❌ ERROR_AL_ELIMINAR");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#020617] p-8 font-mono text-white">
      <div className="max-w-3xl mx-auto border border-fly-away/20 bg-black/60 p-8 backdrop-blur-md shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h2 className="text-fly-away font-bold text-xl tracking-tighter uppercase">
            {`> ADMIN_CONTROL_PANEL_V2`}
          </h2>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/admin/login'); }} className="text-[10px] text-red-500 border border-red-500/20 px-2 py-1 hover:bg-red-500 hover:text-white transition-all">LOGOUT</button>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['projects', 'skills', 'blog'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all border ${activeTab === tab ? 'bg-fly-away/10 border-fly-away text-fly-away' : 'border-white/10 text-gray-500 hover:text-white'}`}
            >
              [{tab}]
            </button>
          ))}
        </div>

        {/* FORMULARIO DE PROYECTOS */}
        {activeTab === 'projects' && (
          <form onSubmit={handleProjectSubmit} className="space-y-4 animate-in fade-in duration-500">
            <input type="text" placeholder="PROJECT_TITLE" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={project.title} onChange={(e) => setProject({...project, title: e.target.value})} required />
            <textarea placeholder="DESCRIPTION" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away h-24" value={project.description} onChange={(e) => setProject({...project, description: e.target.value})} required />
            <input type="text" placeholder="TECH_STACK (Ej: React, Node...)" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={project.technologies} onChange={(e) => setProject({...project, technologies: e.target.value})} required />
            <button className="w-full py-4 bg-fly-away/10 border border-fly-away text-fly-away hover:bg-fly-away hover:text-white transition-all font-bold">UPLOAD_PROJECT.exe</button>
          </form>
        )}

        {/* FORMULARIO DE SKILLS */}
        {activeTab === 'skills' && (
          <form onSubmit={handleSkillSubmit} className="space-y-4 animate-in fade-in duration-500">
            <input type="text" placeholder="SKILL_NAME (Ej: Python)" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={skill.name} onChange={(e) => setSkill({...skill, name: e.target.value})} required />
            <input type="text" placeholder="LEVEL (Ej: 90%)" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={skill.level} onChange={(e) => setSkill({...skill, level: e.target.value})} required />
            <select className="w-full bg-[#020617] border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={skill.category} onChange={(e) => setSkill({...skill, category: e.target.value})}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Lenguajes">Lenguaje</option>
            </select>
            <button className="w-full py-4 bg-blue-vault/10 border border-blue-vault text-blue-vault hover:bg-blue-vault hover:text-white transition-all font-bold">REGISTER_SKILL.sh</button>
          </form>
        )}

        {/* FORMULARIO DE BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Formulario para crear blog */}
            <div className="border border-green-500/20 p-4 bg-green-500/5">
              <h3 className="text-green-500 font-bold mb-4 uppercase text-sm">Crear Nuevo Blog</h3>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <input type="text" placeholder="POST_TITLE" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} required />
                <select className="w-full bg-[#020617] border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={post.category} onChange={(e) => setPost({...post, category: e.target.value})}>
                  <option value="Backend">Backend</option>
                  <option value="Seguridad">Seguridad</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Frontend">Frontend</option>
                  <option value="DevOps">DevOps</option>
                </select>
                <textarea placeholder="TU_CONTENIDO..." className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away h-32 text-sm" value={post.content} onChange={(e) => setPost({...post, content: e.target.value})} required />
                <button type="submit" className="w-full py-4 bg-green-500/10 border border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white transition-all font-bold uppercase">Publish_Post.log</button>
              </form>
            </div>

            {/* Lista de blogs */}
            <div className="border border-white/10 p-4">
              <h3 className="text-fly-away font-bold mb-4 uppercase text-sm">Blogs Publicados ({posts.length})</h3>
              {loadingPosts ? (
                <p className="text-gray-400 text-sm">Cargando blogs...</p>
              ) : posts.length === 0 ? (
                <p className="text-gray-400 text-sm">No hay blogs publicados aún.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {posts.map((p) => (
                    <div key={p._id} className="bg-blue-vault/5 border border-blue-vault/20 p-3 rounded flex justify-between items-start group hover:bg-blue-vault/10 transition-all">
                      <div className="flex-1 pr-4">
                        <h4 className="text-white font-bold text-sm truncate">{p.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">
                          <span className="inline-block mr-3">[{p.category}]</span>
                          <span className="text-gray-500">{new Date(p.date).toLocaleDateString('es-ES')}</span>
                        </p>
                        <p className="text-gray-300 text-xs mt-2 line-clamp-2">{p.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeletePost(p._id)}
                        className="ml-2 p-2 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Eliminar blog"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

  // 2. Manejadores de envío (Submit)
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const projectData = {
      ...project,
      technologies: project.technologies.split(',').map(t => t.trim().toUpperCase())
    };
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-auth-token': token // Asegúrate que tu backend use este nombre de cabecera
        },
        body: JSON.stringify(projectData),
      });
      if (res.ok) { 
        alert("✅ PROYECTO_AÑADIDO_EXITOSAMENTE"); 
        setProject({ title: '', description: '', technologies: '', githubLink: '', status: 'deployed' }); 
      } else {
        alert("❌ ERROR: El servidor rechazó el proyecto");
      }
    } catch (err) { alert("❌ ERROR_DE_CONEXIÓN_CON_BACKEND"); }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-auth-token': token 
        },
        body: JSON.stringify(skill),
      });
      if (res.ok) { 
        alert(`✅ HABILIDAD_REGISTRADA: ${skill.name}`); 
        setSkill({ name: '', category: 'Lenguajes', level: '80%' }); 
      }
    } catch (err) { alert("❌ ERROR_AL_REGISTRAR_SKILL"); }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // AQUÍ ES DONDE SE ENVÍA TU TEXTO DE MONGODB VS SQL
    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-auth-token': token 
        },
        body: JSON.stringify(post),
      });
      if (res.ok) { 
        alert("✅ BLOG_POST_PUBLICADO_CON_ÉXITO"); 
        setPost({ title: '', content: '', category: 'Backend' }); 
      } else {
        alert("❌ ERROR: No se pudo publicar el post");
      }
    } catch (err) { alert("❌ ERROR_CRÍTICO_EN_EL_ENVÍO"); }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#020617] p-8 font-mono text-white">
      <div className="max-w-3xl mx-auto border border-fly-away/20 bg-black/60 p-8 backdrop-blur-md shadow-2xl">
        
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h2 className="text-fly-away font-bold text-xl tracking-tighter uppercase">
            {`> ADMIN_CONTROL_PANEL_V2`}
          </h2>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/admin/login'); }} className="text-[10px] text-red-500 border border-red-500/20 px-2 py-1 hover:bg-red-500 hover:text-white transition-all">LOGOUT</button>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['projects', 'skills', 'blog'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all border ${activeTab === tab ? 'bg-fly-away/10 border-fly-away text-fly-away' : 'border-white/10 text-gray-500 hover:text-white'}`}
            >
              [{tab}]
            </button>
          ))}
        </div>

        {/* FORMULARIO DE PROYECTOS */}
        {activeTab === 'projects' && (
          <form onSubmit={handleProjectSubmit} className="space-y-4 animate-in fade-in duration-500">
            <input type="text" placeholder="PROJECT_TITLE" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={project.title} onChange={(e) => setProject({...project, title: e.target.value})} required />
            <textarea placeholder="DESCRIPTION" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away h-24" value={project.description} onChange={(e) => setProject({...project, description: e.target.value})} required />
            <input type="text" placeholder="TECH_STACK (Ej: React, Node...)" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={project.technologies} onChange={(e) => setProject({...project, technologies: e.target.value})} required />
            <button className="w-full py-4 bg-fly-away/10 border border-fly-away text-fly-away hover:bg-fly-away hover:text-white transition-all font-bold">UPLOAD_PROJECT.exe</button>
          </form>
        )}

        {/* FORMULARIO DE SKILLS */}
        {activeTab === 'skills' && (
          <form onSubmit={handleSkillSubmit} className="space-y-4 animate-in fade-in duration-500">
            <input type="text" placeholder="SKILL_NAME (Ej: Python)" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={skill.name} onChange={(e) => setSkill({...skill, name: e.target.value})} required />
            <input type="text" placeholder="LEVEL (Ej: 90%)" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={skill.level} onChange={(e) => setSkill({...skill, level: e.target.value})} required />
            <select className="w-full bg-[#020617] border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={skill.category} onChange={(e) => setSkill({...skill, category: e.target.value})}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Lenguajes">Lenguaje</option>
            </select>
            <button className="w-full py-4 bg-blue-vault/10 border border-blue-vault text-blue-vault hover:bg-blue-vault hover:text-white transition-all font-bold">REGISTER_SKILL.sh</button>
          </form>
        )}

        {/* FORMULARIO DE BLOG */}
        {activeTab === 'blog' && (
          <form onSubmit={handlePostSubmit} className="space-y-4 animate-in fade-in duration-500">
            {/* AQUÍ ES DONDE PEGARÁS LA CONSULTA QUE HICISTE */}
            <input type="text" placeholder="POST_TITLE" className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} required />
            <select className="w-full bg-[#020617] border border-blue-vault/20 p-3 outline-none focus:border-fly-away" value={post.category} onChange={(e) => setPost({...post, category: e.target.value})}>
              <option value="Backend">Backend</option>
              <option value="Seguridad">Seguridad</option>
              <option value="Arquitectura">Arquitectura</option>
            </select>
            <textarea placeholder="TU_CONSULTA..." className="w-full bg-blue-vault/5 border border-blue-vault/20 p-3 outline-none focus:border-fly-away h-64 text-sm" value={post.content} onChange={(e) => setPost({...post, content: e.target.value})} required />
            <button type="submit" className="w-full py-4 bg-green-500/10 border border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white transition-all font-bold uppercase">Publish_Post.log</button>
          </form>
        )}

      </div>
    </div>
  );
}
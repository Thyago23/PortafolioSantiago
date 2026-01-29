import React, { useState, useEffect } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-32 min-h-screen bg-[#020617] text-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-fly-away mb-12 tracking-widest uppercase border-l-4 border-fly-away pl-4">
          {`> Technical_Blog`}
        </h2>

        {loading ? (
          <p className="animate-pulse text-blue-vault">LOADING_ARTICLES...</p>
        ) : (
          <div className="space-y-16">
            {posts.map((post) => (
              <article key={post._id} className="border-b border-white/5 pb-10">

                <span className="text-[10px] text-blue-vault uppercase mb-2 block tracking-widest">
                  [{post.category}] — {new Date(post.date).toLocaleDateString()}
                </span>
                
                <h3 className="text-2xl font-bold text-polar-blizzard mb-4 hover:text-fly-away transition-colors cursor-pointer">
                  {post.title} 
                </h3>
                
                <div className="text-fly-kite/80 leading-relaxed text-sm whitespace-pre-wrap font-sans">
                  {post.content} 
                </div>

              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
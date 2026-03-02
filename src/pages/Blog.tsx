import { useState, useEffect } from 'react';
import { BlogCard } from '../components/BlogCard';
import { Loader2 } from 'lucide-react';

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch blog posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featuredPost = posts.find(p => p.trending) || posts[0];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">AI Insights</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Stay updated with the latest trends, news, and deep dives into the world of artificial intelligence.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-20">
                <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden group cursor-pointer">
                  <img 
                    src={featuredPost.thumbnail} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 lg:p-16">
                    <div className="max-w-3xl">
                      <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-6 inline-block">
                        FEATURED ARTICLE
                      </span>
                      <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-300 text-lg mb-8 line-clamp-2">
                        {featuredPost.description}
                      </p>
                      <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-95">
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

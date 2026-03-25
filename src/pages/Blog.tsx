import { useState, useEffect, lazy, Suspense } from 'react';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

// Lazy load BlogCard
const BlogCard = lazy(() => import('../components/BlogCard').then(m => ({ default: m.BlogCard })));

export function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>(() => {
    const cached = localStorage.getItem('neural_blogs_cache');
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(posts.length === 0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogsCollection = collection(db, 'blogs');
        const blogsSnapshot = await getDocs(query(blogsCollection, where('published', '==', true))).catch(e => {
          console.warn('Blogs collection inaccessible', e);
          return { docs: [] };
        });
        const blogsList = (blogsSnapshot as any).docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(blogsList);
        localStorage.setItem('neural_blogs_cache', JSON.stringify(blogsList));
      } catch (err) {
        console.error('Failed to fetch blog posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const publishedPosts = posts.filter(p => p.published !== false);
  const featuredPost = publishedPosts.find(p => p.trending) || publishedPosts[0];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO pageId="blog" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">AI Insights</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Stay updated with the latest trends, news, and deep dives into the world of artificial intelligence.
          </p>
        </div>

        <div className="min-h-[400px]">
          {loading && posts.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-20"
                >
                  <div 
                    onClick={() => navigate(`/blog/${featuredPost.id}`)}
                    className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden group cursor-pointer"
                  >
                    <img 
                      src={featuredPost.thumbnail || "/placeholder.jpg"} 
                      alt={featuredPost.title} 
                      width={1200}
                      height={500}
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
                </motion.div>
              )}

              {/* Grid */}
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  <Suspense fallback={publishedPosts.map((_, i) => <BlogSkeleton key={i} />)}>
                    {publishedPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: Math.min(index * 0.05, 0.5) 
                        }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </Suspense>
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PromptSkeleton } from '../components/PromptSkeleton';
import { SearchBar } from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEO } from '../components/SEO';

// Lazy load PromptCard
const PromptCard = lazy(() => import('../components/PromptCard').then(m => ({ default: m.PromptCard })));

const CATEGORIES = ['All', 'Image', 'Text', 'Video'];

export function Prompts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState<any[]>(() => {
    const cached = localStorage.getItem('neural_prompts_cache');
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(prompts.length === 0);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const promptsCollection = collection(db, 'prompts');
        const promptsSnapshot = await getDocs(query(promptsCollection, where('published', '==', true))).catch(e => {
          console.warn('Prompts collection inaccessible', e);
          return { docs: [] };
        });
        const promptsList = (promptsSnapshot as any).docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPrompts(promptsList);
        localStorage.setItem('neural_prompts_cache', JSON.stringify(promptsList));
      } catch (err) {
        console.error('Failed to fetch prompts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(prompt => prompt.published !== false)
      .filter(prompt => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = prompt.text.toLowerCase().includes(q) ||
                             prompt.category.toLowerCase().includes(q) ||
                             prompt.badge.toLowerCase().includes(q);
        const matchesCategory = activeCategory === 'All' || prompt.category === activeCategory;
        return matchesSearch && matchesCategory;
      });
  }, [searchQuery, activeCategory, prompts]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO pageId="prompts" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">Prompt Library</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Unlock the full potential of AI with our curated collection of high-performing prompts.
          </p>
          
          <SearchBar 
            className="max-w-3xl mx-auto" 
            placeholder="Search thousands of AI prompts..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Trending Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold dark:text-white">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={prompts.slice(0, 3).map((_, i) => <PromptSkeleton key={i} />)}>
              {prompts.slice(0, 3).map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </Suspense>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar justify-center">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="min-h-[400px]">
          {loading && prompts.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <PromptSkeleton key={i} />
              ))}
            </div>
          ) : filteredPrompts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                <Suspense fallback={filteredPrompts.map((_, i) => <PromptSkeleton key={i} />)}>
                  {filteredPrompts.map((prompt, index) => (
                    <motion.div
                      key={prompt.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: Math.min(index * 0.05, 0.5) 
                      }}
                    >
                      <PromptCard prompt={prompt} />
                    </motion.div>
                  ))}
                </Suspense>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
                <Sparkles className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No prompts found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

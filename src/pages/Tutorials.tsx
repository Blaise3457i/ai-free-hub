import { useState, useEffect, lazy, Suspense } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TutorialSkeleton } from '../components/TutorialSkeleton';
import { SearchBar } from '../components/SearchBar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEO } from '../components/SEO';

// Lazy load TutorialCard
const TutorialCard = lazy(() => import('../components/TutorialCard').then(m => ({ default: m.TutorialCard })));

const CATEGORIES = ['All', 'AI Art', 'AI Writing', 'AI Automation', 'Marketing'];

export function Tutorials() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tutorials, setTutorials] = useState<any[]>(() => {
    const cached = localStorage.getItem('neural_tutorials_cache');
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(tutorials.length === 0);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const tutorialsCollection = collection(db, 'tutorials');
        const tutorialsSnapshot = await getDocs(query(tutorialsCollection, where('published', '==', true))).catch(e => {
          console.warn('Tutorials collection inaccessible', e);
          return { docs: [] };
        });
        const tutorialsList = (tutorialsSnapshot as any).docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTutorials(tutorialsList);
        localStorage.setItem('neural_tutorials_cache', JSON.stringify(tutorialsList));
      } catch (err) {
        console.error('Failed to fetch tutorials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, []);

  const filteredTutorials = tutorials
    .filter(tut => tut.published !== false)
    .filter(tut => {
      const q = searchQuery.toLowerCase();
      const matchesCategory = activeCategory === 'All' || tut.category === activeCategory;
      const matchesSearch = tut.title.toLowerCase().includes(q) || 
                           tut.description.toLowerCase().includes(q) ||
                           tut.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO pageId="tutorials" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">AI Tutorials</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Step-by-step guides to help you master the latest AI tools and technologies.
          </p>
          <SearchBar 
            className="max-w-3xl mx-auto" 
            placeholder="Search for AI tutorials..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center space-x-2 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-purple-600 text-white shadow-xl shadow-purple-500/20' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="min-h-[400px]">
          {loading && tutorials.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <TutorialSkeleton key={i} />
              ))}
            </div>
          ) : filteredTutorials.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12"
            >
              <AnimatePresence mode="popLayout">
                <Suspense fallback={filteredTutorials.map((_, i) => <TutorialSkeleton key={i} />)}>
                  {filteredTutorials.map((tutorial, index) => (
                    <motion.div
                      key={tutorial.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: Math.min(index * 0.05, 0.5) 
                      }}
                    >
                      <TutorialCard tutorial={tutorial} />
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
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tutorials found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters or search for something else.</p>
            </motion.div>
          )}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
            Load More Tutorials
          </button>
        </div>
      </div>
    </div>
  );
}

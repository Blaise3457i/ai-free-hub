import { useSearchParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { Search as SearchIcon, Zap, Sparkles, BookOpen, Building2, Loader2 } from 'lucide-react';
import { ToolSkeleton } from '../components/ToolSkeleton';
import { PromptSkeleton } from '../components/PromptSkeleton';
import { TutorialSkeleton } from '../components/TutorialSkeleton';
import { PROVIDERS } from '../constants/providers';
import { motion } from 'motion/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Lazy load card components
const ToolCard = lazy(() => import('../components/ToolCard').then(m => ({ default: m.ToolCard })));
const PromptCard = lazy(() => import('../components/PromptCard').then(m => ({ default: m.PromptCard })));
const TutorialCard = lazy(() => import('../components/TutorialCard').then(m => ({ default: m.TutorialCard })));
const ProviderCard = lazy(() => import('../components/ProviderCard').then(m => ({ default: m.ProviderCard })));

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ tools: any[], prompts: any[], tutorials: any[] }>({
    tools: [],
    prompts: [],
    tutorials: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toolsSnap, promptsSnap, tutorialsSnap] = await Promise.all([
          getDocs(collection(db, 'tools')).catch(e => { console.warn('Tools collection inaccessible', e); return { docs: [] }; }),
          getDocs(collection(db, 'prompts')).catch(e => { console.warn('Prompts collection inaccessible', e); return { docs: [] }; }),
          getDocs(collection(db, 'tutorials')).catch(e => { console.warn('Tutorials collection inaccessible', e); return { docs: [] }; })
        ]);
        
        setData({
          tools: (toolsSnap as any).docs.map((doc: any) => ({ id: doc.id, ...doc.data() })),
          prompts: (promptsSnap as any).docs.map((doc: any) => ({ id: doc.id, ...doc.data() })),
          tutorials: (tutorialsSnap as any).docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
        });
      } catch (err) {
        console.error('Failed to fetch search data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const results = useMemo(() => {
    if (!query) return { tools: [], prompts: [], tutorials: [], providers: [] };

    const q = query.toLowerCase();
    const publishedTools = data.tools.filter(t => t.published !== false);
    const publishedPrompts = data.prompts.filter(p => p.published !== false);
    const publishedTutorials = data.tutorials.filter(t => t.published !== false);

    return {
      tools: publishedTools.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      ),
      prompts: publishedPrompts.filter(p => 
        p.text.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      ),
      tutorials: publishedTutorials.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      ),
      providers: PROVIDERS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        'ai providers'.includes(q) ||
        'providers'.includes(q)
      ),
    };
  }, [query, data]);

  const totalResults = results.tools.length + results.prompts.length + results.tutorials.length + results.providers.length;

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Found {totalResults} results across the platform.
          </p>
        </div>

        {totalResults === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <SearchIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">We couldn't find anything matching your search. Try different keywords.</p>
            <Link to="/" className="text-purple-600 font-bold hover:underline">Return Home</Link>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Tools Results */}
            {results.tools.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <h2 className="text-2xl font-bold dark:text-white">AI Tools ({results.tools.length})</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Suspense fallback={results.tools.map((_, i) => <ToolSkeleton key={i} />)}>
                    {results.tools.map(tool => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </Suspense>
                </div>
              </section>
            )}

            {/* Prompts Results */}
            {results.prompts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="text-2xl font-bold dark:text-white">Prompts ({results.prompts.length})</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Suspense fallback={results.prompts.map((_, i) => <PromptSkeleton key={i} />)}>
                    {results.prompts.map(prompt => (
                      <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                  </Suspense>
                </div>
              </section>
            )}

            {/* Tutorials Results */}
            {results.tutorials.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-2xl font-bold dark:text-white">Tutorials ({results.tutorials.length})</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <Suspense fallback={results.tutorials.map((_, i) => <TutorialSkeleton key={i} />)}>
                    {results.tutorials.map(tutorial => (
                      <TutorialCard key={tutorial.id} tutorial={tutorial} />
                    ))}
                  </Suspense>
                </div>
              </section>
            )}

            {/* Providers Results */}
            {results.providers.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <h2 className="text-2xl font-bold dark:text-white">AI Providers ({results.providers.length})</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Suspense fallback={results.providers.map((_, i) => <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />)}>
                    {results.providers.map(provider => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </Suspense>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { PromptCard } from '../components/PromptCard';
import { SearchBar } from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['All', 'Image', 'Text', 'Video'];

export function Prompts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('/api/prompts');
        const data = await response.json();
        setPrompts(data);
      } catch (err) {
        console.error('Failed to fetch prompts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">Prompt Library</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
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
            {prompts.slice(0, 3).map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
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
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
          </div>
        ) : filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <Sparkles className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No prompts found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

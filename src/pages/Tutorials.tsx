import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { TutorialCard } from '../components/TutorialCard';
import { SearchBar } from '../components/SearchBar';
import { TUTORIALS } from '../data/mockData';

const CATEGORIES = ['All', 'AI Art', 'AI Writing', 'AI Automation', 'Marketing'];

export function Tutorials() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTutorials = TUTORIALS.filter(tut => 
    activeCategory === 'All' || tut.category === activeCategory
  );

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">AI Tutorials</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Step-by-step guides to help you master the latest AI tools and technologies.
          </p>
          <SearchBar className="max-w-3xl mx-auto" placeholder="Search for AI tutorials..." />
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
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {filteredTutorials.map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tutorials found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search for something else.</p>
          </div>
        )}

        <div className="mt-20 text-center">
          <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
            Load More Tutorials
          </button>
        </div>
      </div>
    </div>
  );
}

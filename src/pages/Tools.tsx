import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { ProviderCard } from '../components/ProviderCard';
import { TOOLS, PROVIDERS } from '../data/mockData';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['All', 'Image', 'Video', 'Text', 'Productivity', 'Misc'];

export function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategory = searchParams.get('cat') || 'All';

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = tool.name.toLowerCase().includes(q) || 
                           tool.description.toLowerCase().includes(q) ||
                           tool.category.toLowerCase().includes(q);
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">AI Tools Directory</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Browse our curated collection of the best free and freemium AI tools available today.
          </p>
          <SearchBar 
            className="max-w-3xl mx-auto" 
            placeholder="Search for any AI tool..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar justify-center">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ cat })}
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
            <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-purple-600 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tools found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="mt-20 flex justify-center mb-24">
          <nav className="flex items-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-600 text-white font-bold">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">3</button>
            <span className="text-slate-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">12</button>
          </nav>
        </div>

        {/* AI Providers Section */}
        <section className="mt-32 py-24 bg-slate-50/50 dark:bg-slate-900/20 rounded-[3rem] border border-slate-100 dark:border-slate-800/50 px-8 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Trusted Infrastructure</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">High-Quality AI Providers</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Top-tier services known for professional image and video generation quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROVIDERS.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          <div className="mt-16 p-10 bg-white dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 text-center shadow-xl shadow-slate-200/20 dark:shadow-none">
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto italic text-lg leading-relaxed">
              "These providers are known for high detail, professional outputs — often used in marketing, creative industries, and professional content creation workflows. Many offer APIs for integration."
            </p>
          </div>
        </section>

        {/* SEO FAQ Section */}
        <section className="mt-32 mb-24">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-12 text-center">Frequently Asked Questions about Free AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Are these AI tools really free?</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Yes! We specifically curate tools that offer a generous free tier or are completely open-source. Some may have "freemium" models where advanced features require a subscription, but the core functionality we list is accessible for free.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What are the best free AI image generators?</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Currently, tools like Stable Diffusion, Craiyon (formerly DALL-E Mini), and Adobe Firefly (with free credits) are among the top choices for generating high-quality AI art without a cost.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Can I use these tools for commercial projects?</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">It depends on the specific tool's license. Open-source models like Stable Diffusion often allow commercial use, while others may restrict free-tier outputs to personal use. Always check the individual tool's terms of service.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">How often is the AI Free Hub directory updated?</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">We update our directory daily to include the latest releases in the AI world. Our team manually verifies each tool to ensure it meets our quality and "free-to-use" standards.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

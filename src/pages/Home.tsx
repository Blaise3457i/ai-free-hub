import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Play } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { PromptCard } from '../components/PromptCard';
import { TutorialCard } from '../components/TutorialCard';
import { TOOLS, PROMPTS, TUTORIALS } from '../data/mockData';

const HERO_VIDEOS = [
  'https://cdn.pixabay.com/video/2023/10/20/185834-876356710_large.mp4',
  'https://cdn.pixabay.com/video/2021/04/12/70868-537446548_large.mp4',
];

export function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const toolCategories = ['Text', 'Video', 'Image', 'Productivity'];
  
  const toolsByCategory = useMemo(() => {
    return toolCategories.map(cat => ({
      name: cat === 'Text' ? 'Text Generators' : cat === 'Video' ? 'Video Generators' : cat === 'Image' ? 'Image Generators' : cat,
      tools: TOOLS.filter(tool => tool.category === cat).slice(0, 5)
    }));
  }, []);

  const featuredPrompts = useMemo(() => {
    return PROMPTS.slice(0, 5);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-24 sm:py-32">
        {/* Video Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                src={HERO_VIDEOS[currentVideoIndex]}
                onLoadedMetadata={(e) => e.currentTarget.play()}
                onCanPlayThrough={(e) => e.currentTarget.play()}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Dark Transparent Overlay */}
          <div className="absolute inset-0 z-10 bg-black/70" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-2xl border border-white/40 px-6 py-3 rounded-full mb-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-white uppercase tracking-[0.3em]">
                The #1 Hub for Free AI Resources
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-[0.95] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
              Discover Free <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2CFF] drop-shadow-[0_0_50px_rgba(0,212,255,0.8)]">AI Tools</span> & Prompts
            </h1>

            <p className="text-base lg:text-2xl text-white mb-12 max-w-[800px] mx-auto leading-relaxed font-semibold drop-shadow-[0_5px_20px_rgba(0,0,0,1)]">
              Unlock the power of artificial intelligence without breaking the bank. Access our curated library of free tools, expert prompts, and step-by-step tutorials.
            </p>

            <div className="mb-16 px-4">
              <SearchBar className="max-w-2xl mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-white/20" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 px-6">
              <Link 
                to="/tools" 
                className="w-full sm:w-auto relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] to-[#7B2CFF] rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gradient-to-r from-[#00D4FF] to-[#7B2CFF] text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center shadow-2xl">
                  Explore Now
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link 
                to="/prompts" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-xl text-white border border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center"
              >
                View Prompts
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
          {HERO_VIDEOS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentVideoIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                currentVideoIndex === i ? 'w-16 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'AI Tools', value: '500+', icon: Zap },
              { label: 'Free Prompts', value: '2,000+', icon: Sparkles },
              { label: 'Active Users', value: '50k+', icon: Globe },
              { label: 'Verified', value: '100%', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools by Category */}
      <section className="py-32 bg-slate-50/30 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">Featured AI Tools</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Hand-picked AI tools that offer incredible value for free. Boost your creative output today.</p>
          </div>

          <div className="space-y-24">
            {toolsByCategory.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center">
                    <span className="w-2 h-8 bg-purple-600 rounded-full mr-4"></span>
                    {category.name}
                  </h3>
                  <Link to={`/tools?cat=${category.name.split(' ')[0]}`} className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center">
                    View All <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {category.tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">Trending Prompts</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl">The most popular prompts used by our community to generate stunning results.</p>
            </div>
            <Link to="/prompts" className="inline-flex items-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              Browse Library <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials */}
      <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white rounded-[3rem] mx-4 sm:mx-8 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">Latest Tutorials</h2>
              <p className="text-slate-400 max-w-xl">Learn how to master AI tools with our step-by-step guides and expert tips.</p>
            </div>
            <Link to="/tutorials" className="inline-flex items-center text-purple-400 font-bold hover:underline">
              All Tutorials <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {TUTORIALS.map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] p-12 lg:p-20 shadow-2xl shadow-purple-500/20">
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Stay Ahead of the Curve</h2>
          <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">Join 50,000+ AI enthusiasts and get the latest free tools and prompts delivered to your inbox every week.</p>
          <form className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-purple-200 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md"
            />
            <button className="w-full sm:w-auto bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all active:scale-95">
              Subscribe
            </button>
          </form>
          <p className="text-purple-200 text-xs mt-6">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { 
    name: 'Tools', 
    path: '/tools',
    dropdown: [
      { name: 'Image Generators', path: '/tools?cat=Image' },
      { name: 'Video Generators', path: '/tools?cat=Video' },
      { name: 'Audio Generators', path: '/tools?cat=Audio' },
      { name: 'Text Assistants', path: '/tools?cat=Text' },
      { name: 'Productivity', path: '/tools?cat=Productivity' },
      { name: 'Misc/Utilities', path: '/tools?cat=Misc' },
    ]
  },
  { name: 'Prompts', path: '/prompts' },
  { name: 'Tutorials', path: '/tutorials' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-lg" 
        : "bg-transparent border-b border-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              isTransparent ? "text-white" : "text-slate-900 dark:text-white"
            )}>
              Free Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-all flex items-center space-x-1",
                    isTransparent 
                      ? "text-white/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                      : (location.pathname === link.path 
                          ? "text-purple-600 dark:text-purple-400" 
                          : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400")
                  )}
                >
                  <span>{link.name}</span>
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2 min-w-[200px]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="absolute right-full mr-2 top-1/2 -translate-y-1/2 overflow-hidden"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className={cn(
                        "w-full border-none rounded-full px-4 py-1.5 text-sm focus:ring-2 focus:ring-purple-500/20",
                        isTransparent 
                          ? "bg-white/10 backdrop-blur-md text-white placeholder:text-white/60" 
                          : "bg-slate-100 dark:bg-slate-800 dark:text-white"
                      )}
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isTransparent 
                    ? "text-white hover:bg-white/10" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={toggle}
              className={cn(
                "p-2 rounded-full transition-colors",
                isTransparent 
                  ? "text-white hover:bg-white/10" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link 
              to="/tools" 
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95",
                isTransparent
                  ? "bg-white text-purple-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/30"
              )}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggle} 
              className={cn(
                "p-2 transition-colors",
                isTransparent ? "text-white" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 transition-colors",
                isTransparent ? "text-white" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <form onSubmit={handleSearch} className="px-3 mb-4 relative">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools, prompts..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500/20 dark:text-white"
                />
              </form>
              {NAV_LINKS.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm text-slate-500 dark:text-slate-400"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-3">
                <Link
                  to="/tools"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-xl font-medium"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

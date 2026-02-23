import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck, Globe } from 'lucide-react';
import { AIProvider } from '../types';

interface ProviderCardProps {
  provider: AIProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <img 
            src={provider.logo} 
            alt={provider.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          provider.type === 'Premium' 
            ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' 
            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
        }`}>
          {provider.type}
        </div>
      </div>

      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        {provider.name}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
        {provider.description}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            <Globe className="w-3 h-3 mr-1" />
            Official
          </div>
          {provider.type === 'Premium' && (
            <div className="flex items-center text-[11px] font-bold text-purple-500 uppercase tracking-tight">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Pro
            </div>
          )}
        </div>
        <a 
          href={provider.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
}

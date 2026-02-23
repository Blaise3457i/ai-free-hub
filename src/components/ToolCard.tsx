import { motion } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={tool.image} 
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-purple-600 dark:text-purple-400 shadow-sm">
            {tool.isFree ? 'FREE' : 'FREEMIUM'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {tool.category}
          </span>
          <div className="flex items-center text-amber-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold ml-1 text-slate-600 dark:text-slate-400">4.9</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
          {tool.description}
        </p>
        <div className="flex items-center justify-between">
          <a 
            href={tool.link}
            className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center hover:underline"
          >
            Learn More
          </a>
          <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Star, Image as ImageIcon } from 'lucide-react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6">
        {!imageError ? (
          <img 
            src={tool.image} 
            alt={tool.name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-2">
              <ImageIcon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Logo Missing</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-purple-600 dark:text-purple-400 shadow-sm border border-slate-100 dark:border-slate-700">
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
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center hover:underline"
          >
            Learn More
          </a>
          <a 
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { Play, Clock } from 'lucide-react';
import { Tutorial } from '../types';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={tutorial.thumbnail} 
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-purple-600 fill-current ml-1" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {tutorial.category}
          </span>
          <div className="flex items-center text-slate-400 text-[10px] font-bold">
            <Clock className="w-3 h-3 mr-1" />
            <span>12 MIN</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
          {tutorial.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
          {tutorial.description}
        </p>
        <button className="w-full py-2.5 rounded-xl border-2 border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Watch Tutorial
        </button>
      </div>
    </motion.div>
  );
}

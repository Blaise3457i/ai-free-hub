import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {post.trending && (
          <div className="absolute top-4 left-4">
            <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
              TRENDING
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
          <Calendar className="w-3 h-3 mr-1.5" />
          <span>{post.date}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
          {post.description}
        </p>
        <button className="flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

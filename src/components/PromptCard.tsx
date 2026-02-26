import { motion } from 'motion/react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { AIPrompt } from '../types';

interface PromptCardProps {
  prompt: AIPrompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {prompt.outputImage && (
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={prompt.outputImage} 
            alt={`AI generated output for prompt: ${prompt.text.substring(0, 50)}...`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-900/30 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            {prompt.category}
          </span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {prompt.badge}
          </span>
        </div>
        <div className="relative group">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic line-clamp-3">
            "{prompt.text}"
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:bg-purple-600 dark:hover:bg-purple-400 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

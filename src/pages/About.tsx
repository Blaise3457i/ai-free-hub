import { motion } from 'motion/react';
import { Target, Heart, Users, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">About AI Free Hub</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            We are on a mission to democratize artificial intelligence by making high-quality tools and knowledge accessible to everyone, for free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              To bridge the gap between advanced AI technology and everyday users by providing a curated, verified directory of free resources.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Values</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Accessibility, transparency, and community. We believe that AI should be a tool for empowerment, not a luxury.
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-black mb-8">Why We Started</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            The AI landscape is moving at breakneck speed. Every day, dozens of new tools are released, but many of the best ones are hidden behind expensive subscriptions or complex interfaces.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            AI Free Hub was born out of a simple need: a central place where anyone—from students to professional creators—could find tools that actually work, without needing a credit card.
          </p>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-12 text-white mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-4xl font-black mb-2">500+</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Tools Listed</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-2">2k+</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Prompts</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-2">50k</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Monthly Visitors</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black mb-8">Meet the Community</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            We are more than just a directory. We are a growing community of AI enthusiasts, developers, and artists who share their findings, prompts, and tutorials to help others succeed.
          </p>
        </div>
      </div>
    </div>
  );
}

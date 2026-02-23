import { BlogCard } from '../components/BlogCard';
import { BLOG_POSTS } from '../data/mockData';

export function Blog() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">AI Insights</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Stay updated with the latest trends, news, and deep dives into the world of artificial intelligence.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden group cursor-pointer">
            <img 
              src="https://picsum.photos/seed/featured/1920/1080" 
              alt="Featured Post" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 lg:p-16">
              <div className="max-w-3xl">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-6 inline-block">
                  FEATURED ARTICLE
                </span>
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  How Generative AI is Redefining Creative Industries in 2026
                </h2>
                <p className="text-slate-300 text-lg mb-8 line-clamp-2">
                  From Hollywood to local design studios, artificial intelligence is no longer just a tool—it's a collaborator. We explore the massive shifts happening right now.
                </p>
                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-95">
                  Read Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

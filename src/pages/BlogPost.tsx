import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost as BlogPostType } from '../types';
import { Loader2, Calendar, ArrowLeft, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const postDoc = await getDoc(doc(db, 'blogs', id));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() } as BlogPostType);
        }
      } catch (err) {
        console.error('Failed to fetch blog post', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Post not found</h2>
        <Link to="/blog" className="text-purple-600 font-bold hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-purple-400 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date}
            </div>
            <div className="w-1 h-1 bg-slate-700 rounded-full" />
            <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4 mr-2" />
              5 min read
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl ring-1 ring-white/10">
            <img 
              src={post.thumbnail || "/placeholder.jpg"} 
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-white prose-strong:text-white prose-li:text-white prose-code:text-purple-300 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-white/10">
            <div className="markdown-body">
              <ReactMarkdown>{post.content || post.description}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center ring-1 ring-purple-500/20">
                <span className="text-purple-400 font-bold">N</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Neural Team</p>
                <p className="text-xs text-slate-400">AI Research & Editorial</p>
              </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-bold">Share Article</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

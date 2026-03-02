import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Wrench, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Stats {
  tools: number;
  prompts: number;
  blog: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const STAT_CARDS = [
    { name: 'Total AI Tools', value: stats?.tools || 0, icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12%', up: true },
    { name: 'Active Prompts', value: stats?.prompts || 0, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', trend: '+5%', up: true },
    { name: 'Blog Articles', value: stats?.blog || 0, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '-2%', up: false },
    { name: 'Total Views', value: '12.4K', icon: Eye, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', trend: '+18%', up: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back! Here's what's happening on Neural today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className={cn(
                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                stat.up ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" : "bg-red-50 text-red-600 dark:bg-red-900/20"
              )}>
                {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-purple-600 font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">New AI Tool Added</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Admin added "Llama 3.1" to the directory.</p>
                </div>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 mb-3 group-hover:scale-110 transition-transform w-fit">
                <Wrench className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Add Tool</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">List a new AI tool</p>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-3 group-hover:scale-110 transition-transform w-fit">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">New Post</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Write a blog article</p>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 mb-3 group-hover:scale-110 transition-transform w-fit">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">New Prompt</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Add a curated prompt</p>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group">
              <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 mb-3 group-hover:scale-110 transition-transform w-fit">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">SEO Meta</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Edit site metadata</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  Loader2,
  Save,
  CheckCircle2,
  Edit2,
  X,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PageSEO {
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  updated_at: string;
}

export function AdminSEO() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [seoList, setSeoList] = useState<PageSEO[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null);

  const fetchSEO = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/seo');
      const data = await response.json();
      setSeoList(data);
    } catch (err) {
      console.error('Failed to fetch SEO settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEO();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    setSaving(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPage)
      });

      if (response.ok) {
        setSuccess(true);
        setEditingPage(null);
        fetchSEO();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save SEO settings', err);
    } finally {
      setSaving(false);
    }
  };

  const filteredSEO = seoList.filter(s => 
    s.page_path.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && seoList.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">SEO Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage meta titles, descriptions, and keywords for every page.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search pages by path or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
          />
        </div>
      </div>

      {/* SEO Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Page Path</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Meta Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredSEO.map((seo) => (
                <tr key={seo.page_path} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-purple-600 dark:text-purple-400">{seo.page_path}</span>
                      <a href={seo.page_path} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-white font-medium line-clamp-1">{seo.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(seo.updated_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setEditingPage(seo)}
                      className="p-2 text-slate-400 hover:text-purple-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-600" />
                Edit SEO: {editingPage.page_path}
              </h2>
              <button onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Meta Title</label>
                <input 
                  required
                  type="text"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  placeholder="Page title for search engines..."
                />
                <p className="text-[10px] text-slate-500">Recommended: 50-60 characters. Current: {editingPage.title.length}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Meta Description</label>
                <textarea 
                  required
                  rows={3}
                  value={editingPage.description}
                  onChange={(e) => setEditingPage({...editingPage, description: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  placeholder="Brief summary of the page content..."
                />
                <p className="text-[10px] text-slate-500">Recommended: 150-160 characters. Current: {editingPage.description.length}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Keywords</label>
                <input 
                  type="text"
                  value={editingPage.keywords}
                  onChange={(e) => setEditingPage({...editingPage, keywords: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  placeholder="e.g. AI tools, free AI, prompts"
                />
                <p className="text-[10px] text-slate-500">Comma separated keywords.</p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-6 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">SEO settings updated successfully!</span>
        </div>
      )}
    </div>
  );
}

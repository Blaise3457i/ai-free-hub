import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  Check, 
  X,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Prompt {
  id: string;
  text: string;
  category: string;
  badge: string;
  outputImage: string | null;
  published: number;
}

export function AdminPrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    text: '',
    category: 'Text',
    badge: '',
    outputImage: '',
    published: true
  });

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/prompts');
      const data = await response.json();
      setPrompts(data);
    } catch (err) {
      console.error('Failed to fetch prompts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleOpenModal = (prompt?: Prompt) => {
    if (prompt) {
      setEditingPrompt(prompt);
      setFormData({
        text: prompt.text,
        category: prompt.category,
        badge: prompt.badge,
        outputImage: prompt.outputImage || '',
        published: !!prompt.published
      });
    } else {
      setEditingPrompt(null);
      setFormData({
        text: '',
        category: 'Text',
        badge: '',
        outputImage: '',
        published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingPrompt ? `/api/admin/prompts/${editingPrompt.id}` : '/api/admin/prompts';
    const method = editingPrompt ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchPrompts();
      }
    } catch (err) {
      console.error('Failed to save prompt', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prompt?')) return;

    try {
      const response = await fetch(`/api/admin/prompts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchPrompts();
      }
    } catch (err) {
      console.error('Failed to delete prompt', err);
    }
  };

  const filteredPrompts = prompts.filter(p => 
    p.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Prompts Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your library of curated AI prompts.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Prompt</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search prompts by text, category or badge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Prompts Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prompt Text</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Badge</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
                  </td>
                </tr>
              ) : filteredPrompts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    No prompts found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPrompts.map((prompt) => (
                  <tr key={prompt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {prompt.outputImage && (
                          <img src={prompt.outputImage} alt="" className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                        )}
                        <p className="text-sm text-slate-900 dark:text-white line-clamp-2 max-w-md">{prompt.text}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        {prompt.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-medium">
                        {prompt.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {prompt.published ? (
                          <span className="flex items-center text-emerald-600 text-xs font-medium">
                            <Check className="w-3 h-3 mr-1" /> Published
                          </span>
                        ) : (
                          <span className="flex items-center text-slate-400 text-xs font-medium">
                            <X className="w-3 h-3 mr-1" /> Draft
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(prompt)} className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(prompt.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingPrompt ? 'Edit Prompt' : 'Add New Prompt'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Prompt Text</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  placeholder="Enter the AI prompt here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  >
                    <option value="Text">Text Prompt</option>
                    <option value="Image">Image Prompt</option>
                    <option value="Video">Video Prompt</option>
                    <option value="Audio">Audio Prompt</option>
                    <option value="Code">Code Prompt</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Badge/Label</label>
                  <input 
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                    placeholder="e.g. Storytelling, Digital Art"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Output Image URL (Optional)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                      type="url"
                      value={formData.outputImage}
                      onChange={(e) => setFormData({...formData, outputImage: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Published</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                >
                  {editingPrompt ? 'Update Prompt' : 'Create Prompt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

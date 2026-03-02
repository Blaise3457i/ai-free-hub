import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  Check, 
  X,
  Filter,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  isFree: number;
  image: string;
  link: string;
  published: number;
}

export function AdminTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Image',
    isFree: true,
    image: '',
    link: '',
    published: true
  });

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/tools');
      const data = await response.json();
      setTools(data);
    } catch (err) {
      console.error('Failed to fetch tools', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleOpenModal = (tool?: Tool) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        name: tool.name,
        description: tool.description,
        category: tool.category,
        isFree: !!tool.isFree,
        image: tool.image,
        link: tool.link,
        published: !!tool.published
      });
    } else {
      setEditingTool(null);
      setFormData({
        name: '',
        description: '',
        category: 'Image',
        isFree: true,
        image: '',
        link: '',
        published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingTool ? `/api/admin/tools/${editingTool.id}` : '/api/admin/tools';
    const method = editingTool ? 'PUT' : 'POST';

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
        fetchTools();
      }
    } catch (err) {
      console.error('Failed to save tool', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const response = await fetch(`/api/admin/tools/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTools();
      }
    } catch (err) {
      console.error('Failed to delete tool', err);
    }
  };

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Tools Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your directory of artificial intelligence tools.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Tool</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search tools by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tools Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tool</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pricing</th>
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
              ) : filteredTools.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    No tools found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img src={tool.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{tool.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {tool.published ? (
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
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-xs font-bold",
                        tool.isFree ? "text-emerald-600" : "text-purple-600"
                      )}>
                        {tool.isFree ? 'FREE' : 'PREMIUM'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button onClick={() => handleOpenModal(tool)} className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(tool.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
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
                {editingTool ? 'Edit AI Tool' : 'Add New AI Tool'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tool Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  >
                    <option value="Image">Image Generator</option>
                    <option value="Video">Video Generator</option>
                    <option value="Audio">Audio Generator</option>
                    <option value="Text">Text Assistant</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Misc">Misc/Utility</option>
                  </select>
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tool Link</label>
                  <input 
                    required
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Image URL</label>
                  <input 
                    required
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={(e) => setFormData({...formData, isFree: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Free?</span>
                </label>
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
                  {editingTool ? 'Update Tool' : 'Create Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

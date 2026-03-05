import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Save, 
  Globe, 
  Layout, 
  Search, 
  Loader2,
  CheckCircle2,
  Video,
  Upload
} from 'lucide-react';
import { cn } from '../lib/utils';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsCollection = collection(db, 'settings');
        const settingsSnapshot = await getDocs(settingsCollection).catch(e => {
          console.warn('Settings collection inaccessible', e);
          return { docs: [] };
        });
        const settingsMap: Record<string, string> = {};
        (settingsSnapshot as any).docs.forEach((doc: any) => {
          const data = doc.data();
          settingsMap[data.key] = data.value;
        });
        setSettings(settingsMap);
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      for (const [key, value] of Object.entries(settings)) {
        const settingDoc = doc(db, 'settings', key);
        await setDoc(settingDoc, { key, value }, { merge: true });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save settings', err);
    } finally {
      setSaving(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setSettings({...settings, [key]: data.url});
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Site Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage SEO, homepage content, and global configurations.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* SEO Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center space-x-3">
            <Globe className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-slate-900 dark:text-white">Global SEO Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Site Title</label>
              <input 
                type="text"
                value={settings.site_title || ''}
                onChange={(e) => setSettings({...settings, site_title: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                placeholder="Neural - The Ultimate AI Directory"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Meta Description</label>
              <textarea 
                rows={3}
                value={settings.meta_description || ''}
                onChange={(e) => setSettings({...settings, meta_description: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                placeholder="Discover the best free AI tools..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Keywords (comma separated)</label>
              <input 
                type="text"
                value={settings.meta_keywords || ''}
                onChange={(e) => setSettings({...settings, meta_keywords: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                placeholder="AI tools, free AI, prompts, tutorials"
              />
            </div>
          </div>
        </div>

        {/* Homepage Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center space-x-3">
            <Layout className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 dark:text-white">Homepage Hero Content</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Headline</label>
              <input 
                type="text"
                value={settings.hero_title || ''}
                onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                placeholder="The Future of AI is Free"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Subheadline</label>
              <textarea 
                rows={2}
                value={settings.hero_subtitle || ''}
                onChange={(e) => setSettings({...settings, hero_subtitle: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 outline-none dark:text-white"
                placeholder="Discover 500+ free AI tools..."
              />
            </div>
          </div>
        </div>

        {/* Hero Slider Videos Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center space-x-3">
            <Video className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900 dark:text-white">Hero Slider Videos</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Video 1 (MP4)</label>
              <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group border border-slate-200 dark:border-slate-700">
                {settings.hero_video_1 ? (
                  <video src={settings.hero_video_1} className="w-full h-full object-cover" muted loop autoPlay />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Video className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center space-x-2 hover:bg-slate-100 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Change Video</span>
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoUpload(e, 'hero_video_1')} />
                  </label>
                </div>
              </div>
              <input 
                type="text"
                value={settings.hero_video_1 || ''}
                onChange={(e) => setSettings({...settings, hero_video_1: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono dark:text-white"
                placeholder="Video 1 URL"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hero Video 2 (MP4)</label>
              <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group border border-slate-200 dark:border-slate-700">
                {settings.hero_video_2 ? (
                  <video src={settings.hero_video_2} className="w-full h-full object-cover" muted loop autoPlay />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Video className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center space-x-2 hover:bg-slate-100 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Change Video</span>
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoUpload(e, 'hero_video_2')} />
                  </label>
                </div>
              </div>
              <input 
                type="text"
                value={settings.hero_video_2 || ''}
                onChange={(e) => setSettings({...settings, hero_video_2: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono dark:text-white"
                placeholder="Video 2 URL"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            {success && (
              <div className="flex items-center text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-left-2">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Settings saved successfully!
              </div>
            )}
          </div>
          <button 
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

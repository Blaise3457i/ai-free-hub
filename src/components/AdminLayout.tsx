import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/Logo';
import { 
  LayoutDashboard, 
  Wrench, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ChevronRight,
  BarChart3,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

const ADMIN_NAV = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'AI Tools', icon: Wrench, path: '/admin/tools' },
  { name: 'Prompts', icon: MessageSquare, path: '/admin/prompts' },
  { name: 'Blog CMS', icon: FileText, path: '/admin/blog' },
  { name: 'Media Manager', icon: ImageIcon, path: '/admin/media' },
  { name: 'SEO Management', icon: Globe, path: '/admin/seo' },
  { name: 'Site Settings', icon: Settings, path: '/admin/settings' },
  { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
];

export function AdminLayout() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-30">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-slate-900 dark:text-white">Neural Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-purple-600")} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.email}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}

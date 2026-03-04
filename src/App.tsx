import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { Prompts } from './pages/Prompts';
import { Tutorials } from './pages/Tutorials';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Search } from './pages/Search';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminTools } from './pages/AdminTools';
import { AdminPrompts } from './pages/AdminPrompts';
import { AdminBlog } from './pages/AdminBlog';
import { AdminTutorials } from './pages/AdminTutorials';
import { AdminMedia } from './pages/AdminMedia';
import { AdminSettings } from './pages/AdminSettings';
import { AdminSEO } from './pages/AdminSEO';
import { SiteConfig } from './components/SiteConfig';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './context/ThemeContext';
import { usePageTracking } from './hooks/usePageTracking';
import { AdminAnalytics } from './pages/AdminAnalytics';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  usePageTracking();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <SiteConfig />
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tools" element={<AdminTools />} />
            <Route path="prompts" element={<AdminPrompts />} />
            <Route path="tutorials" element={<AdminTutorials />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="seo" element={<AdminSEO />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </div>
  );
}

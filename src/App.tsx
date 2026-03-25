import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { SiteConfig } from './components/SiteConfig';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './context/ThemeContext';
import { usePageTracking } from './hooks/usePageTracking';

// Lazy load page components
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Tools = lazy(() => import('./pages/Tools').then(m => ({ default: m.Tools })));
const ToolDetails = lazy(() => import('./pages/ToolDetails').then(m => ({ default: m.ToolDetails })));
const Prompts = lazy(() => import('./pages/Prompts').then(m => ({ default: m.Prompts })));
const Tutorials = lazy(() => import('./pages/Tutorials').then(m => ({ default: m.Tutorials })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const Search = lazy(() => import('./pages/Search').then(m => ({ default: m.Search })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminTools = lazy(() => import('./pages/AdminTools').then(m => ({ default: m.AdminTools })));
const AdminPrompts = lazy(() => import('./pages/AdminPrompts').then(m => ({ default: m.AdminPrompts })));
const AdminBlog = lazy(() => import('./pages/AdminBlog').then(m => ({ default: m.AdminBlog })));
const AdminTutorials = lazy(() => import('./pages/AdminTutorials').then(m => ({ default: m.AdminTutorials })));
const AdminMedia = lazy(() => import('./pages/AdminMedia').then(m => ({ default: m.AdminMedia })));
const AdminSettings = lazy(() => import('./pages/AdminSettings').then(m => ({ default: m.AdminSettings })));
const AdminSEO = lazy(() => import('./pages/AdminSEO').then(m => ({ default: m.AdminSEO })));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })));

// Admin Layout is also a component that can be lazy loaded
const AdminLayout = lazy(() => import('./components/AdminLayout').then(m => ({ default: m.AdminLayout })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
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
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:id" element={<ToolDetails />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin">
              <Route index element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
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
            </Route>
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </div>
  );
}

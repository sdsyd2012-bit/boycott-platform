import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeProvider.jsx'
import { ToastProvider } from './admin/Toast.jsx'
import { syncNow } from './services/syncService.js'
import { useOnlineStatus } from './hooks/useOnlineStatus.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MobileTopBar from './components/MobileTopBar.jsx'
import MobileTabBar from './components/MobileTabBar.jsx'
import Home from './pages/Home.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Login from './admin/Login.jsx'

const ScannerPage = lazy(() => import('./pages/ScannerPage.jsx'))
const ContributionsPage = lazy(() => import('./pages/ContributionsPage.jsx'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'))
const ArticleDetails = lazy(() => import('./pages/ArticleDetails.jsx'))
const VideosPage = lazy(() => import('./pages/VideosPage.jsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./admin/Dashboard.jsx'))
const ProductsAdmin = lazy(() => import('./admin/ProductsAdmin.jsx'))
const DiscoveriesAdmin = lazy(() => import('./admin/DiscoveriesAdmin.jsx'))
const CategoriesAdmin = lazy(() => import('./admin/CategoriesAdmin.jsx'))
const ArticlesAdmin = lazy(() => import('./admin/ArticlesAdmin.jsx'))
const VideosAdmin = lazy(() => import('./admin/VideosAdmin.jsx'))

function RouteFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">جارٍ التحميل…</p>
    </div>
  )
}

function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <MobileTopBar />
      <Navbar />
      <main className="flex-1 app-shell-bottom lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  )
}

function App() {
  const online = useOnlineStatus()
  const wasOfflineRef = useRef(!online)

  useEffect(() => {
    syncNow()
  }, [])

  useEffect(() => {
    if (online && wasOfflineRef.current) {
      wasOfflineRef.current = false
      console.log('Network reconnected — triggering automatic sync')
      syncNow()
    } else if (!online) {
      wasOfflineRef.current = true
    }
  }, [online])

  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:barcode" element={<ProductDetails />} />
              <Route path="/scan" element={<ScannerPage />} />
              <Route path="/contributions" element={<ContributionsPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/:slug" element={<ArticleDetails />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="discoveries" element={<DiscoveriesAdmin />} />
              <Route path="categories" element={<CategoriesAdmin />} />
              <Route path="articles" element={<ArticlesAdmin />} />
              <Route path="videos" element={<VideosAdmin />} />
            </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App

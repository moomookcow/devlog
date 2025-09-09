import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { PageLoadingFallback } from "@/components/common/LazyComponent";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const PostDetailPage = lazy(() => import("./pages/PostDetailPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GuestbookPage = lazy(() => import("./pages/GuestbookPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ImageTestPage = lazy(() => import("./pages/ImageTestPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <HomePage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout showSidebar={true}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <BlogListPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <PostDetailPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <SearchPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/category/:category"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <CategoryPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <AboutPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/guestbook"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <GuestbookPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/image-test"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <ImageTestPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout showSidebar={false}>
                <Suspense fallback={<PageLoadingFallback />}>
                  <NotFoundPage />
                </Suspense>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;

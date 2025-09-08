import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import PostDetailPage from "./pages/PostDetailPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import GuestbookPage from "./pages/GuestbookPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showSidebar={false}>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout showSidebar={true}>
              <BlogListPage />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout showSidebar={false}>
              <PostDetailPage />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout showSidebar={false}>
              <SearchPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout showSidebar={false}>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/guestbook"
          element={
            <Layout showSidebar={false}>
              <GuestbookPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout showSidebar={false}>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

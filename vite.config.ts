import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    // MDX 플러그인 제거 - content/posts의 MDX 파일들을 정적 자산으로 처리
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
    },
  },
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: ["gray-matter", "buffer"],
  },
  // MDX 파일을 정적 자산으로 처리
  assetsInclude: ["**/*.mdx"],

  // 프로덕션 빌드 최적화
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련 라이브러리
          react: ["react", "react-dom"],
          "react-router": ["react-router-dom"],
          "react-helmet": ["react-helmet-async"],

          // UI 라이브러리
          ui: ["@radix-ui/react-slot", "@radix-ui/react-dialog"],
          "lucide-react": ["lucide-react"],

          // 스타일링
          "framer-motion": ["framer-motion"],
          tailwindcss: ["tailwindcss"],

          // 마크다운 처리
          markdown: [
            "react-markdown",
            "react-syntax-highlighter",
            "gray-matter",
          ],

          // 유틸리티
          utils: ["clsx", "tailwind-merge"],
        },
        // 파일명에 해시 추가하여 캐싱 최적화
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash].[ext]`;
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    // 청크 크기 경고 임계값 설정
    chunkSizeWarningLimit: 1000,
  },

  // 개발 서버 최적화
  server: {
    port: 3000,
    open: true,
  },

  // 미리보기 서버 설정
  preview: {
    port: 4173,
    open: true,
  },
});

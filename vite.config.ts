import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // MDX 플러그인 제거 - content/posts의 MDX 파일들을 정적 자산으로 처리
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
});

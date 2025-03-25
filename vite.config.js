import react from "@vitejs/plugin-react";
import { defineConfig, transformWithEsbuild } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/PhishGuard-front/",
  plugins: [
    react(),
    svgr(),
    VitePWA({
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "PhishGuard",
        short_name: "PhishGuard",
        start_url: "/PhishGuard-front/",
        icons: [
          {
            src: "/PhishGuard-front/phishguard-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/PhishGuard-front/phishguard-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/PhishGuard-front/phishguard-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/PhishGuard-front/phishguard-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/PhishGuard-front/phishguard-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic", // 👈 this is important
        });
      },
    },
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});

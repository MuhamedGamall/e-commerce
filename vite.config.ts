import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // // optional: create separate chunk for the worker
        // manualChunks: {
        //   "pdf-worker": ["pdfjs-dist/legacy/build/pdf.worker.js"],
        // },
      },
    },
  },
  plugins: [react()],
  base: "/",
});

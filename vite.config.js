import { defineConfig } from "vite";

export default defineConfig({
  build: {
    base: "/pixi_demo/",
    target: "esnext", // Targeting the most modern JavaScript features
    rollupOptions: {
      output: {
        manualChunks: {
          pixijs: ["pixi.js"], // Separating PixiJS into its own chunk (https://github.com/pixijs/pixijs/issues/10456)
        },
      },
    },
  },
});
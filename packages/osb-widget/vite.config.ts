import { defineConfig } from "vite";
import routify from "@roxi/routify/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

const production = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [
    routify({
      ssr: {
        enable: true, // !!production
        prerender: true,
      },
    }),
    svelte({
      compilerOptions: {
        dev: !production,
        hydratable: true, // !!process.env.ROUTIFY_SSR_ENABLE,
      },
      extensions: [".md", ".svelte"],
      preprocess: [mdsvex({ extension: "md" })],
    }),
  ],
});

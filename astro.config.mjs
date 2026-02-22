import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.danielho.xyz",
  integrations: [mdx(), sitemap()],
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
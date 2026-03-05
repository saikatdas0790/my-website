import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from "svelte-preprocess";
import staticAdapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: staticAdapter(),
    prerender: {
      entries: ["*", "/sitemap.xml", "/blog/getSearchIndex.json"],
    },
    alias: {
      $components: "./src/components",
      $utils: "./src/utils",
      $icons: "./src/icons",
    },
  },
};

export default config;

import { imagetools } from "vite-imagetools";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from "svelte-preprocess";
import path from "path";
import staticAdapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    target: "body#svelte",
    adapter: staticAdapter(),
    prerender: {
      pages: ["*", "/sitemap.xml", "/blog/getSearchIndex.json"],
    },
    vite: {
      resolve: {
        alias: {
          $components: path.resolve("./src/components"),
          $utils: path.resolve("./src/utils"),
          // $stores: path.resolve("./src/stores"),
          $icons: path.resolve("./src/icons"),
        },
      },
      plugins: [
        imagetools({
          force: true,
        }),
      ],
    },
  },
};

export default config;

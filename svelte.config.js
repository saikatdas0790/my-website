import preprocess from "svelte-preprocess";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    vite: {
      resolve: {
        alias: {
          $components: path.resolve("./src/components"),
          // $utils: path.resolve("./src/utils"),
          // $stores: path.resolve("./src/stores"),
          $icons: path.resolve("./src/icons"),
        },
      },
    },
  },
};

export default config;

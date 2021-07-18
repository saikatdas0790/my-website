export default {
  extensions: [".md"],
  // smartypants: {
  //   dashes: "oldschool",
  // },
  // remarkPlugins: [require("remark-abbr")],
  // rehypePlugins: [
  //   require("rehype-slug"),
  //   [
  //     require("rehype-autolink-headings"),
  //     {
  //       behavior: "wrap",
  //     },
  //   ],
  // ],
  layout: {
    _: "./src/routes/blog/_layout.svelte",
    blog: "./src/routes/blog/_layout.svelte",
    projects: "./src/routes/projects/_layout.svelte",
  },
};

import type { RequestHandler } from "@sveltejs/kit";
import { parse } from "path";
import type { BlogPostCardDetails } from "src/types";

const get: RequestHandler = async ({ host }) => {
  const modules = import.meta.glob("./blog/posts/**/index.md");

  const posts: BlogPostCardDetails[] = [];

  await Promise.all(
    Object.entries(modules).map(async ([file, module]) => {
      const {
        metadata: { title, description, tags, date, icon },
      } = await module();

      posts.push({
        title,
        description,
        tags,
        created: date,
        icon,
        slug: `/${parse(file).dir.split("/").slice(1).join("/")}`,
      });
    }),
  );

  // Newest first
  posts.sort((a, b) => (a.created > b.created ? -1 : 1));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://saikat.dev</loc>
      </url>
      <url>
        <loc>https://saikat.dev/blog</loc>
      </url>
      ${posts
        .map(
          ({ created, slug }) => `<url>
            <loc>https://saikat.dev${slug}</loc>
            <lastmod>${created}</lastmod>
            <changefreq>weekly</changefreq>
      </url>`,
        )
        .join("")}
    </urlset>
  `;

  return {
    headers: {},
    status: 200,
    body,
  };
};

export { get };

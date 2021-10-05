import type { RequestHandler } from "@sveltejs/kit";
import { parse } from "path";
import type { BlogPostCardDetails, ProjectEntryCardDetails } from "src/types";

async function getBlogPostDetails() {
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

  return posts;
}

async function getProjectEntryDetails() {
  const modules = import.meta.glob("./projects/entries/**/index.md");

  const entries: ProjectEntryCardDetails[] = [];

  await Promise.all(
    Object.entries(modules).map(async ([file, module]) => {
      const {
        metadata: {
          title,
          description,
          technologiesUsed,
          startDate,
          endDate,
          coverPhoto,
        },
      } = await module();

      entries.push({
        title,
        description,
        technologiesUsed,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverPhoto,
        slug: `/${parse(file).dir.split("/").slice(1).join("/")}`,
      });
    }),
  );

  // Newest first
  entries.sort((a, b) => (a.startDate > b.startDate ? -1 : 1));

  return entries;
}

const get: RequestHandler = async ({ host }) => {
  const posts: BlogPostCardDetails[] = await getBlogPostDetails();
  const entries: ProjectEntryCardDetails[] = await getProjectEntryDetails();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://saikat.dev</loc>
      </url>
      <url>
        <loc>https://saikat.dev/blog</loc>
      </url>
      <url>
        <loc>https://saikat.dev/projects</loc>
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
      ${entries
        .map(
          ({ slug }) => `<url>
            <loc>https://saikat.dev${slug}</loc>
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

import type { RequestHandler } from "@sveltejs/kit";
import { parse } from "path";
import type { BlogPostCardDetails } from "src/types";

const get: RequestHandler = async () => {
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

  return {
    headers: {},
    status: 200,
    body: JSON.stringify(posts.slice(0, 5)),
  };
};

export { get };

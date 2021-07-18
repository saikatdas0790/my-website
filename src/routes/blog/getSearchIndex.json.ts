import type { RequestHandler } from "@sveltejs/kit";
import { parse } from "path";
import type { BlogPostCardDetails } from "src/types";
import type { Index } from "lunr";
import lunr from "lunr";
const { Builder } = lunr;

const getAllBlogPosts = async (): Promise<BlogPostCardDetails[]> => {
  const modules = import.meta.glob("../blog/posts/**/index.md");

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
  return posts;
};

const getSearchIndexFromAllPosts = async (
  posts: BlogPostCardDetails[],
): Promise<Index> => {
  const indexBuilder = new Builder();
  indexBuilder.ref("slug");
  indexBuilder.field("tags", { boost: 10 });
  indexBuilder.field("title", { boost: 8 });
  indexBuilder.field("description", { boost: 5 });

  posts
    .map((post) => ({
      slug: post.slug,
      tags: post.tags.join(" "),
      title: post.title,
      description: post.description,
    }))
    .forEach((post) => indexBuilder.add(post));
  return indexBuilder.build();
};

const get: RequestHandler = async () => {
  const posts: BlogPostCardDetails[] = await getAllBlogPosts();

  const searchIndex: Index = await getSearchIndexFromAllPosts(posts);

  return {
    headers: {},
    status: 200,
    body: JSON.stringify(searchIndex),
  };
};

export { get };

import type { RequestHandler } from "@sveltejs/kit";
import { parse } from "path";
import type { ProjectEntryCardDetails } from "src/types";

const get: RequestHandler = async () => {
  const modules = import.meta.glob("../projects/entries/**/index.md");

  const posts: ProjectEntryCardDetails[] = [];

  await Promise.all(
    Object.entries(modules).map(async ([file, module]) => {
      const {
        metadata: { title, description, startDate, endDate, coverPhoto },
      } = await module();

      posts.push({
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverPhoto,
        slug: `/${parse(file).dir.split("/").slice(1).join("/")}`,
      });
    }),
  );

  // Newest first
  posts.sort((a, b) => (a.startDate > b.startDate ? -1 : 1));

  return {
    headers: {},
    status: 200,
    body: JSON.stringify(posts),
  };
};

export { get };

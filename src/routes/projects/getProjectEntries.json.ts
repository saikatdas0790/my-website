import type { RequestHandler } from "@sveltejs/kit";
import { parse } from "path";
import type { ProjectEntryCardDetails } from "src/types";

const get: RequestHandler = async () => {
  const modules = import.meta.glob("../projects/entries/**/index.md");

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

  return {
    headers: {},
    status: 200,
    body: JSON.stringify(entries),
  };
};

export { get };

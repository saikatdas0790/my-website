import type { BlogPostCardDetails } from "src/types";

export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => {
    const response = await fetch("/blog/getBlogPosts.json");
    const blogPosts: BlogPostCardDetails[] = await response.json();
    return { blogPosts };
};

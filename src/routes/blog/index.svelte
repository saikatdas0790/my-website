<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from "@sveltejs/kit/types/page";

  export const load = async ({ fetch }: LoadInput): Promise<LoadOutput> => {
    let response: LoadOutput = {};

    try {
      const getBlogPostsResponse = await (
        await fetch(`/blog/getBlogPosts.json`, {
          method: "GET",
        })
      ).json();

      response = {
        props: {
          blogPosts: getBlogPostsResponse,
        },
      };
    } catch (error) {
      console.error(error);
      response = {
        status: 503,
      };
    }

    return response;
  };
</script>

<script lang="ts">
  import type { BlogPostCardDetails } from "../getRecentPosts.json";
  import SeoMetaHeader from "$components/SEO/SEOMetaHeader.svelte";
  import BlogPostCard from "$components/BlogPostCard/BlogPostCard.svelte";

  export let blogPosts: BlogPostCardDetails[];
</script>

<SeoMetaHeader
  siteTitle="Saikat's Blog"
  siteDescription="This is my blog where I write about what I learn including things like SvelteJS, TailwindCSS, NodeJS, Linux, PostgreSQL among a few" />

<main class="max-w-screen-md mx-auto p-2">
  <ul>
    {#each blogPosts as { created, icon, slug, tags, title, description } (slug)}
      <BlogPostCard {created} {icon} {slug} {tags} {title} {description} />
    {/each}
  </ul>
</main>

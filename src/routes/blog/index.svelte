<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from "@sveltejs/kit/types/page";

  export const load = async ({ fetch }: LoadInput): Promise<LoadOutput> => {
    let response: LoadOutput = {};

    try {
      const getBlogPostsFetchPromise = fetch(`/blog/getBlogPosts.json`, {
        method: "GET",
      });

      response = {
        props: {
          blogPosts: await (await getBlogPostsFetchPromise).json(),
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
  import SearchWidget from "$components/SearchWidget/SearchWidget.svelte";
  import { flip } from "svelte/animate";

  export let blogPosts: BlogPostCardDetails[];
  let filteredPosts = blogPosts;
</script>

<SeoMetaHeader
  siteTitle="Saikat's Blog"
  siteDescription="This is my blog where I write about what I learn including things like SvelteJS, TailwindCSS, NodeJS, Linux, PostgreSQL among a few" />

<main class="max-w-screen-md mx-auto p-2">
  <SearchWidget bind:filteredPosts {blogPosts} />
  <ul>
    {#each filteredPosts as { created, icon, slug, tags, title, description } (slug)}
      <div animate:flip={{ duration: 500 }}>
        <BlogPostCard {created} {icon} {slug} {tags} {title} {description} />
      </div>
    {/each}
  </ul>
</main>

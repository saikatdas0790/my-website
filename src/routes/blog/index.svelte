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
  import BlogPostCard from "$components/BlogPostCard/BlogPostCard.svelte";

  export let blogPosts: BlogPostCardDetails[];
  console.log(blogPosts);
</script>

<main class="max-w-screen-md mx-auto p-2">
  <ul>
    {#each blogPosts as { created, icon, slug, tags, title, description } (slug)}
      <BlogPostCard {created} {icon} {slug} {tags} {title} {description} />
    {/each}
  </ul>
</main>

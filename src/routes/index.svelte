<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from "@sveltejs/kit/types/page";

  export const load = async ({ fetch }: LoadInput): Promise<LoadOutput> => {
    let response: LoadOutput = {};

    try {
      const getRecentPostsResponse = await (
        await fetch(`/getRecentPosts.json`, {
          method: "GET",
        })
      ).json();

      response = {
        props: {
          recentPosts: getRecentPostsResponse,
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
  import IntroSection from "./_index/components/IntroSection.svelte";
  import RecentPosts from "./_index/components/RecentPosts.svelte";
  import type { BlogPostCardDetails } from "./getRecentPosts.json";

  export let recentPosts: BlogPostCardDetails[];
</script>

<main class="max-w-screen-sm mx-auto p-2">
  <IntroSection />
  <RecentPosts {recentPosts} />
</main>

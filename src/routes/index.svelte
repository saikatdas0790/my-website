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
  import SeoMetaHeader from "$components/SEO/SEOMetaHeader.svelte";

  export let recentPosts: BlogPostCardDetails[];
</script>

<SeoMetaHeader
  siteTitle="Saikat's Website"
  siteDescription="This is a website where I blog about full stack JavaScript including things like SvelteJS, TailwindCSS, NodeJS, Linux, PostgreSQL among a few and showcase projects I've worked on" />

<main class="max-w-screen-md mx-auto p-2">
  <IntroSection />
  <RecentPosts {recentPosts} />
</main>

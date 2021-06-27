<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from "@sveltejs/kit/types/page";

  export const load = async ({ fetch }: LoadInput): Promise<LoadOutput> => {
    let response: LoadOutput = {};

    try {
      await fetch(`/sitemap.xml`, {
        method: "GET",
      });
    } catch (error) {
      console.error(error);
      response = {
        status: 503,
      };
    }

    return response;
  };
</script>

<main class="max-w-screen-md mx-auto p-2">
  <img
    src="/assets/images/pages/__error/pupper.jpg"
    alt="Sorry looking pupper"
    class="w-full" />
  <p class="text-xl">
    Hey there, time traveller! You seem to have visited this page in the past
    when it doesn't exist yet!
  </p>
  <p>
    Why not visit again in the future when this is available? In the meantime,
    why not <a
      sveltekit:prefetch
      href="/blog"
      class="text-fuchsia-500 font-semibold">
      check out
    </a>
    some of our recent posts on full stack Javascript
  </p>
</main>

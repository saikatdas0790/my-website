<script>
  import { browser } from "$app/env";

  import { page } from "$app/stores";
  import ShareIcon from "$icons/flat-color-icons/share.svelte";

  export let title;
  export let description;
  export let author;
  export let tags;
  export let date;
  export let icon;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={tags.join(", ")} />
  <meta name="author" content={author} />

  <!-- Twitter Card data -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@saikatdas0790" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta
    name="twitter:image"
    content={`https://${$page.host}/assets/icons/post-topics/${icon}`} />

  <!-- Open Graph data -->
  <meta property="og:url" content={`https://${$page.host}${$page.path}`} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta
    property="og:image"
    content={`https://${$page.host}/assets/icons/post-topics/${icon}`} />
</svelte:head>

<article class="prose prose-emerald max-w-screen-md mx-auto my-8 px-4">
  <h1 class="!mb-2">{title}</h1>
  <span class="text-gray-400">
    published on <span class="text-emerald-600 font-medium">
      {new Date(date).toDateString()}
    </span>
  </span>

  <slot />
  <!-- 
  <p class="text-emerald-600 text-xl !my-14">
    {tags.map((tag) => `#${tag}`).join(" ")}
  </p> -->
  {#if browser}
    {#if navigator.share}
      <h2>If you found this post useful, please share</h2>
      <button
        class="w-2/3 max-w-xs  mx-auto rounded-lg my-4 py-3 gap-2 flex items-center justify-center text-white bg-gradient-to-br from-emerald-300 via-blue-300 to-fuchsia-300 focus:outline-none focus:ring focus:ring-emerald-300"
        on:click={() => {
          navigator.share({
            title,
            text: description,
            url: location.href,
          });
        }}>
        <ShareIcon className="h-5" />
        <span class="text-lg">Share this post</span>
      </button>
    {/if}
  {/if}
</article>

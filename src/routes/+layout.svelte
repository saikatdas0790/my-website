<script>
  import NavigationMenu from "$components/NavigationMenu/NavigationMenu.svelte";
  import ServiceWorkerLoader from "./_index/components/ServiceWorkerLoader.svelte";
  import "../app.postcss";
</script>

<slot />
<NavigationMenu />
<ServiceWorkerLoader />

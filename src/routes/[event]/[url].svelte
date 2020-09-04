<script context="module">
  export async function preload({ params, query }) {
    const { event, url } = params;

    if (event && url) {
      return { event, url };
    } else {
      this.error(404, "Not Foun");
    }
  }
</script>

<script>
  export let url;
  export let event;
</script>

<style>
</style>

<svelte:head>
  <title>{url}</title>
</svelte:head>

<div class="Event">
  <p>{event}</p>
  <p>{url}</p>
</div>

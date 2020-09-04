<script context="module">
  export async function preload({ params }) {
    const { organization, event } = params;

    return { organization, event };
  }
</script>

<script>
  export let organization;
  export let event;
</script>

<style>
</style>

<div class="EventIndex">
  <h1>Info</h1>
  <h1>{organization}</h1>
  <h2>{event}</h2>
</div>

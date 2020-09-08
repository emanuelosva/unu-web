<script context="module">
  export async function preload({ params }) {
    const { event } = params;

    return { event };
  }
</script>

<script>
  export let event;
</script>

<style>
</style>

<div class="EventIndex">
  <h2>{event}</h2>
</div>

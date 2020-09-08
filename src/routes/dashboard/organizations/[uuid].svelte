<script context="module">
  export async function preload({ params }) {
    const { uuid } = params;

    return { uuid };
  }
</script>

<script>
  export let uuid;
</script>

<style>
</style>

<div class="Dashboard">
  <h1>Dashboard</h1>
  <h4>{uuid}</h4>
</div>

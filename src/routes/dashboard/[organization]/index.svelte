<script context="module">
  export async function preload({ params }) {
    const { organization } = params;

    return { organization };
  }
</script>

<script>
  export let organization;
</script>

<style>
</style>

<div class="Dashboard">
  <h1>Dashboard</h1>
  <h4>{organization}</h4>
</div>

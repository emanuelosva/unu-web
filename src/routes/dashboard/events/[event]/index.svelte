<script context="module">
  import config from "../../../../config";

  export async function preload({ params }, session) {
    const { token } = session;
    const { event: uuid } = params;

    if (!token) return this.redirect(302, "login");

    const url = `${config.api.base}/events/${uuid}`;
    const res = await this.fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const event = await res.json();
    return { event, token };
  }
</script>

<script>
  // Props;
  export let event;
  // export let token;

  // Components
  import Title from "../../../../components/Title.svelte";
</script>

<style>
</style>

<div class="EventIndex">
  <Title text="{event.name}." />
</div>

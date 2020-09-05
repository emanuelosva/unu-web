<script context="module">
  import config from "../../config";
  const base = config.api.base;
  const url = `${base}/users`;

  export async function preload(page, session) {
    const { token } = session;
    const res = await this.fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      const data = await res.json();
      return { userData: data };
    } else {
      return this.redirect(302, "login");
    }
  }
</script>

<script>
  import { user } from "../../store";
  export let userData;

  user.update((actual) => ({ ...actual, ...userData }));
</script>

<style>
</style>

<div class="Dashboard">
  <h1>Dashboard</h1>
  {$user.uuid}
</div>

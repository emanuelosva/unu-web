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
  // Props
  export let userData;

  // Components
  import Title from "../../components/Title.svelte";
  import DashboardMetrics from "../../components/DashboardMetrics.svelte";
  import DashboardPrincipal from "../../components/DashboardPrincipal.svelte";

  // Js files
  import { user } from "../../store";

  user.update((actual) => ({ ...actual, ...userData }));

  let events = userData.myEvents;
  let organizations = userData.organizations;
  let collaborations = userData.myCollaborations;
</script>

<style>
  .Dashboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<svelte:head>
  <title>Unu - Dashboard</title>
</svelte:head>

<div class="Dashboard">
  <Title text="Dashboard." />
  <span> <i class="far fa-user-circle" /> {$user.name}</span>
  <br />

  <DashboardMetrics
    events={events.length}
    organizations={organizations.length}
    collaborations={collaborations.length} />
  <br />

  <div class="container-flow">
    <div class="row">
      <div class="col-12 col-md-6">
        <DashboardPrincipal data={organizations} title="organizaciones" />
      </div>
      <div class="col-12 col-md-6">
        <DashboardPrincipal data={events} title="eventos" />
      </div>
    </div>
  </div>

  <br />
</div>

<script>
  export let data;
  export let title;
</script>

<style>
  .DashboardPrincipal {
    box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
    background-color: white;
    padding: 1em;
    margin-top: 2em;
  }
  .Card {
    box-sizing: border-box;
    padding: 1em;
    min-width: 170px;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .Card-division {
    width: 160px;
    height: 1px;
    margin-bottom: 10px;
    background-color: rgb(255, 62, 0);
    display: block;
  }
  .Card-title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h5 {
    text-transform: uppercase;
    font-weight: 800;
  }
  p {
    margin-bottom: 5px;
  }
  a {
    color: #000;
  }
</style>

<div class="DashboardPrincipal">
  <div class="Card">
    <div class="Card-title text-center">
      <h5>{title}</h5>
      <div class="Card-division" />
    </div>
    {#each data as info}
      <p>
        {#if title === 'eventos'}
          <a class="" href="/dashboard/{info.organizationUrl}/{info.uuid}">
            <strong>{info.name}</strong>
          </a>
        {:else if title === 'organizaciones'}
          <a class="" href="/dashboard/{info.uuid}">
            <strong>{info.name}</strong>
          </a>
        {/if}
      </p>
    {:else}
      <p>Aún no tienes {title}</p>
    {/each}
  </div>
  <div class="text-right">
    {#if title === 'eventos'}
      <a class="btn btn-outline-dark" href="/dashboard/new-event">
        <i class="fas fa-plus" />
      </a>
    {:else if title === 'organizaciones'}
      <a class="btn btn-outline-dark" href="/dashboard/new-organization">
        <i class="fas fa-plus" />
      </a>
    {/if}
  </div>
</div>

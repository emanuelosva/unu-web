<script>
  import MetricCard from "./MetricCard.svelte";

  export let events;
  export let organizations;
  export let collaborations;

  let participantsInDb = 500;
</script>

<style>
  i {
    font-size: 2em;
  }
</style>

<div class="DashboardMetrics">
  <div class="container-flow">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row">
          <div class="col-6">
            <MetricCard quantity={events} text="Mis eventos">
              <i class="fas fa-calendar-alt" />
            </MetricCard>
          </div>
          <div class="col-6">
            <MetricCard quantity={organizations} text="Mis organizaciones">
              <i class="fa fa-building-o" aria-hidden="true" />
            </MetricCard>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <class class="row">
          <div class="col-6">
            <MetricCard quantity={collaborations} text="Colaboraciones">
              <i class="fa fa-handshake-o" aria-hidden="true" />
            </MetricCard>
          </div>
          <div class="col-6">
            <MetricCard quantity={participantsInDb} text="Registrados">
              <i class="fas fa-user-friends" />
            </MetricCard>
          </div>
        </class>
      </div>
    </div>
  </div>
</div>

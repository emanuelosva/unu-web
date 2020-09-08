<script context="module">
  import config from "../../config";

  export async function preload(page, session) {
    const { token } = session;
    if (!token) return this.redirect(302, "login");

    const url = `${config.api.base}/users`;
    const res = await this.fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const organizations = data.organizations;

    if (organizations.length === 0) {
      this.redirect(302, "/dashboard/new-organization");
    }

    return { token, organizations };
  }
</script>

<script>
  // Props
  export let token;
  export let organizations;

  // Components
  import Title from "../../components/Title.svelte";
  import PrincipalButton from "../../components/PrincipalButton.svelte";

  import { goto } from "@sapper/app";
  import { goToLogin, apiRequest } from "../../utils";

  // Reactive contants
  let name = "";
  let template = "";
  let url = "";
  let startDate = "";

  let message = "";

  // Utc list
  let utc_list_neg = [
    "-10",
    "-9",
    "-8",
    "-7",
    "-6",
    "-5",
    "-4",
    "-3",
    "-2",
    "-1",
  ];
  let utc_list_pos = [
    "+1",
    "+2",
    "+3",
    "+4",
    "+5",
    "+6",
    "+7",
    "+8",
    "+9",
    "+10",
  ];
  const utc_list = utc_list_neg.concat(["+0"]).concat(utc_list_pos);

  const createEvent = async () => {
    // Get option imputs
    let organizationUrl = document.getElementById("organizationName").value;
    let utc = document.getElementById("utc").value;
    let template = document.getElementById("template").value;

    // All fields are needed
    if (utc === "Elige la zona horaria")
      return (message = "Debes de elegir la zona horaria");
    if (template === "Elige un template")
      return (message = "Debes de elegir un template");

    const body = { name, template, url, startDate, utc, organizationUrl };

    const { data, status } = await apiRequest({
      path: "/events",
      method: "POST",
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (status === 201) {
      await goto(`/dashboard/events/${data.uuid}`);
    }

    status === 401 ? await goToLogin() : "";
    status === 422 ? (message = "Debes de llenar todos los campos") : "";
    status === 500
      ? (message = "Al parecer ocurrió un error. Inténtalo más tarde")
      : "";
  };
</script>

<style>
  .form-signin__input {
    margin-bottom: 1em;
  }
  .form-signin__message {
    text-align: center;
    color: #ff3e00;
  }
  i {
    margin-right: 1em;
  }
</style>

<svelte:head>
  <title>Unu - Nuevo Evento</title>
</svelte:head>

<div class="NewEvent">
  <div class="container">
    <Title text="Nuevo Evento." />
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-8 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <form class="form-signin" on:submit|preventDefault={createEvent}>
              <!-- Organization Url -->
              <label for="organizationName">
                <i class="fas fa-cogs" /> Organización
              </label>
              <div class="input-group mb-3">
                <select
                  class="custom-select"
                  id="organizationName"
                  name="organizationName"
                  required>
                  {#each organizations as org}
                    <option value={org.unuUrl}>{org.name}</option>
                  {:else}
                    <p>Aún no tienes organizaciones</p>
                  {/each}
                </select>
              </div>
              <!-- Name -->
              <div class="form-signin__input">
                <label for="name">
                  <i class="fa fa-quote-left" aria-hidden="true" /> Nombre
                </label>
                <input
                  aria-label="name"
                  aria-required="true"
                  autocorrect="of"
                  type="text"
                  id="name"
                  name="name"
                  class="form-control"
                  placeholder="..."
                  required
                  bind:value={name} />
              </div>
              <!-- Url -->
              <div class="form-signin__input">
                <label for="oficialUrl">
                  <i class="fas fa-link" /> Url del evento
                </label>
                <input
                  type="text"
                  id="url"
                  class="form-control"
                  placeholder="..."
                  required
                  bind:value={url} />
              </div>
              <!-- Start date -->
              <div class="form-signin__input">
                <label for="oficialUrl">
                  <i class="far fa-calendar-alt" /> Fecha de inicio
                </label>
                <input
                  type="date"
                  id="url"
                  class="form-control"
                  placeholder="..."
                  required
                  bind:value={startDate} />
              </div>
              <!-- UTC -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="utc">
                    <i class="fas fa-globe" />
                  </label>
                </div>
                <select class="custom-select" id="utc" name="utc" required>
                  <option selected>Elige la zona horaria</option>
                  {#each utc_list as utc}
                    <option value={utc}>GMT {utc}</option>
                  {:else}
                    <p>Aún no tienes organizaciones</p>
                  {/each}
                </select>
              </div>
              <!-- Template -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="template">
                    <i class="fas fa-chart-bar" />
                  </label>
                </div>
                <select
                  class="custom-select"
                  id="template"
                  name="template"
                  required>
                  <option selected>Elige un template</option>
                  <option value="lousiana">Luousiana</option>
                  <option value="coral">Coral</option>
                </select>
              </div>
              <p class="form-signin__message">{message}</p>
              <PrincipalButton content="Crear" />
              <hr class="my-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

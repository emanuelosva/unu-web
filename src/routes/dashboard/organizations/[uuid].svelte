<script context="module">
  import config from "../../../config";

  export async function preload({ params }, session) {
    const { uuid } = params;
    const { token } = session;

    if (!token) return this.redirect(302, "login");

    const url = `${config.api.base}/organizations/${uuid}`;
    const res = await this.fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 404) return this.error(404, "Not Found");
    if (res.status === 403) {
      return this.error(403, "No tienes acceso a este recurso");
    }
    if (res.status === 500) {
      return this.error(500, "Problemas al cargar la página");
    }

    const organization = await res.json();
    return { organization, token };
  }
</script>

<script>
  // Props
  export let organization;
  export let token;

  // Components
  import Title from "../../../components/Title.svelte";
  import PrincipalButton from "../../../components/PrincipalButton.svelte";
  import FormCard from "../../../components/FormCard.svelte";

  import { goto } from "@sapper/app";
  import swal from "sweetalert";
  import { apiRequest, imageReader } from "../../../utils";

  // Reactive vars
  let logoName = "";

  let name = organization.name;
  let oficialUrl = organization.oficialUrl;
  let logo =
    organization.logo ||
    "https://via.placeholder.com/180x120.png?text=A%C3%BAn+no+tienes+logo";

  // Read image
  const readLogo = () => {
    const image = document.getElementById("logo").files[0];
    logoName = image.name;

    const reader = imageReader(image);
    reader.onload = () => (logo = reader.result);
  };

  // Api request to edit organization
  const editOrganization = async () => {
    const body = { name, oficialUrl, logo };

    const { data, status } = await apiRequest({
      path: `/organizations/${organization.uuid}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: body,
    });

    if (status === 200) {
      swal({
        title: "Actualizado",
        text: "La información de tu organización se ha actualizado",
        icon: "success",
      });
    } else {
      swal({
        title: "Algo no funciona",
        text: "Parce que hubo un error, porfavor inténtalo más tarde",
        icon: "error",
      });
    }
  };

  // Delete organization
  const deleteOrganization = async () => {
    const deleted = await swal({
      title: "Estás seguro",
      icon: "warning",
      text: "Esta acción es irreversible",
      buttons: {
        delete: {
          text: "Eliminar",
          value: true,
        },
        exit: {
          text: "Cancelar",
          value: false,
        },
      },
    });

    if (deleted) {
      const { status } = await apiRequest({
        path: `/organizations/${organization.uuid}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (status === 200) {
        await goto("/dashboard");
      } else {
        swal({
          title: "Ups",
          icon: "error",
          text: "Al parecer ocurrió un error, intentalo más tarde",
        });
      }
    }
  };
</script>

<style>
  .form__input {
    margin-bottom: 2em;
  }
  .custom-file-input {
    width: 0;
  }
  i {
    margin-right: 1em;
  }
</style>

<div class="EditOrganization">
  <Title text="{name}." />
  <FormCard>
    <div class="card mt-4">
      <img src={logo} class="card-img-top img-fluid" alt="Logo - {name}" />
      <div class="card-body">
        <h5 class="card-title mt-1 mb-4 text-center">
          <strong>Información principal.</strong>
        </h5>
        <form on:submit|preventDefault={editOrganization}>
          <div class="form__input">
            <label for="name">
              <i class="fa fa-quote-left" aria-hidden="true" /> Nombre
            </label>
            <input
              class="form-control"
              type="text"
              id="name"
              required
              bind:value={name} />
          </div>
          <div class="form__input">
            <label for="name"> <i class="fas fa-link" /> Url Oficial </label>
            <input
              class="form-control"
              type="text"
              id="oficialUrl"
              required
              bind:value={oficialUrl} />
          </div>
          <div class="input-group form__input">
            <span class="input-group mb-3" id="inputGroupFileAddon">
              <i class="fas fa-image" />Logo
            </span>
            <div class="custom-file">
              <input
                on:change={readLogo}
                type="file"
                accept="image/*"
                class="custom-file-input"
                id="logo"
                aria-describedby="inputGroupFileAddon" />
              <label class="btn btn-outline-dark btn-block" for="logo">
                <i class="fas fa-upload" />
              </label>
            </div>
          </div>
          <p class="text-center d-block">{logoName}</p>
          <PrincipalButton content="Guaradar Cambios" />
        </form>
      </div>
      <div class="card-footer text-right">
        <div class="btn btn-outline-danger" on:click={deleteOrganization}>
          Eliminar
        </div>
      </div>
    </div>
  </FormCard>
</div>

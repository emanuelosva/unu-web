<script context="module">
  export function preload(page, session) {
    const { token } = session;
    if (!token) return this.redirect(302, "login");
    return { token };
  }
</script>

<script>
  // Props
  export let token;

  // Components
  import Title from "../../components/Title.svelte";
  import PrincipalButton from "../../components/PrincipalButton.svelte";

  import { goto } from "@sapper/app";
  import { goToLogin, apiRequest, imageReader } from "../../utils";

  // Reactive constants
  let name = "";
  let oficialUrl = "";
  let logo = "";

  let message = "";
  let nameLogo = "";

  const readImageFile = () => {
    const image = document.getElementById("inputImage").files[0];
    nameLogo = image.name;
    const reader = imageReader(image);
    reader.onload = () => (logo = reader.result);
  };

  const createOrganization = async () => {
    const body = { name, oficialUrl, logo };

    const { data, status } = await apiRequest({
      path: "/organizations",
      method: "POST",
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (status === 201) {
      await goto(`/dashboard/${data.uuid}`);
    }

    status === 401 ? await goToLogin() : "";
    status === 409 ? (message = "El nombre ya se ecuentra en uso") : "";
    status === 422 ? (message = "Al menos debes de llenar el nombre") : "";
    status === 500
      ? (message = "Parace que hubo un error. Inténtalo más tarde")
      : "";
  };
</script>

<style>
  .form-signin__input {
    margin-bottom: 2em;
  }
  .form-signin__message {
    text-align: center;
    color: #ff3e00;
  }
  .custom-file-input {
    width: 0;
  }
  i {
    margin-right: 1em;
  }
</style>

<svelte:head>
  <title>Unu- Nueva organización</title>
</svelte:head>

<div class="NewOrganization">
  <div class="container">
    <Title text="Nueva Organización." />
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <form
              class="form-signin"
              on:submit|preventDefault={createOrganization}>
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

              <div class="form-signin__input">
                <label for="oficialUrl">
                  <i class="fas fa-link" /> Url Oficial
                </label>
                <input
                  type="text"
                  id="oficialUrl"
                  class="form-control"
                  placeholder="https:/..."
                  bind:value={oficialUrl} />
              </div>
              <div class="input-group form-signin__input">
                <span class="input-group mb-3" id="inputGroupFileAddon01">
                  <i class="fas fa-image" />Logo
                </span>
                <div class="custom-file">
                  <input
                    on:change={readImageFile}
                    type="file"
                    accept="image/*"
                    class="custom-file-input"
                    id="inputImage"
                    aria-describedby="inputGroupFileAddon01" />
                  <label
                    class="btn btn-outline-dark btn-block"
                    for="inputImage">
                    <i class="fas fa-upload" />
                  </label>
                </div>
              </div>
              <p class="text-center">{nameLogo}</p>
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

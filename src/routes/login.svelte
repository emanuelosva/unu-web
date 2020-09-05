<script>
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";

  import { apiRequest } from "../api";

  import PrincipalButton from "../components/PrincipalButton.svelte";
  import Title from "../components/Title.svelte";

  const { session } = stores();

  let email = "";
  let password = "";
  let message = "";

  const login = async () => {
    const body = { email, password };

    const { data, status } = await apiRequest("/users/login", "POST", body);

    if (status === 200) {
      // Clean template
      message = "";

      // Go to dashborad
      await goto("/dashboard");

      // Store user session
      localStorage.setItem("token", data.accessToken);
      session.set(data);
    }

    status === 401 ? (message = "Credenciales invalidas") : "";
    status === 422 ? (message = "Completa todos los campos") : "";
    status === 500
      ? (message = "Lo sentimos, parece que hubo un error. Intentalo más tarde")
      : "";
  };
</script>

<style>
  .Login {
    display: flex;
    align-items: center;
  }
  .form-signin__input {
    margin-bottom: 3em;
  }
  .form-signin__message {
    text-align: center;
    color: #ff3e00;
  }
  a {
    color: #000000;
  }
</style>

<div class="Login">
  <div class="container">
    <Title text="Login." />
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <form class="form-signin" on:submit|preventDefault={login}>
              <div class="form-signin__input">
                <label for="email">Email</label>
                <input
                  aria-label="email"
                  aria-required="true"
                  autocorrect="of"
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="stan@mailto.com"
                  required
                  bind:value={email} />
              </div>

              <div class="form-signin__input">
                <label for="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="some_super_secret"
                  bind:value={password}
                  required />
              </div>
              <p class="form-signin__message">{message}</p>
              <PrincipalButton content="Iniciar session" />
              <p class="text-center mt-4">
                <a href="/signup" rel="prefetch">Registrame</a>
              </p>
              <hr class="my-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

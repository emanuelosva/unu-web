<script>
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";
  import { apiRequest } from "../api";

  import PrincipalButton from "../components/PrincipalButton.svelte";
  import Title from "../components/Title.svelte";

  const { session } = stores();

  let name = "";
  let email = "";
  let password = "";
  let passwordConfirm = "";
  let message = "";

  const signup = async () => {
    if (password !== passwordConfirm) {
      message = "Las contraseñas no son iguales";
      return;
    }

    const body = { name, email, password };
    const { data, status } = await apiRequest("/users/signup", "POST", body);

    if (status === 201) {
      // Clean template
      message = "";

      // Go to dashborad
      await goto("/dashboard");

      // Store user session
      localStorage.setItem("token", data.accessToken);
      session.set(data.user);
    }

    status === 409 ? (message = "El email ya está registrado") : "";
    status === 422 ? (message = "Completa todos los campos") : "";
    status === 500
      ? (message = "Lo sentimos, parece que hubo un error. Intentalo más tarde")
      : "";
  };
</script>

<style>
  .Signup {
    display: flex;
    align-items: center;
  }
  .form-signin__input {
    margin-bottom: 1.5em;
  }
  .form-signin__message {
    text-align: center;
    color: #ff3e00;
  }
  a {
    color: #000000;
  }
</style>

<div class="Signup">
  <div class="container">
    <Title text="Registro." />
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <form class="form-signin" on:submit|preventDefault={signup}>
              <div class="form-signin__input">
                <label for="email">Nombre</label>
                <input
                  aria-label="name"
                  aria-required="true"
                  autocorrect="of"
                  type="name"
                  id="name"
                  class="form-control"
                  placeholder="Stan Lee"
                  required
                  bind:value={name} />
              </div>

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
              <div class="form-signin__input">
                <label for="password">Confirma tu contraseña</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  class="form-control"
                  placeholder="some_super_secret"
                  bind:value={passwordConfirm}
                  required />
              </div>
              <p class="form-signin__message">{message}</p>
              <PrincipalButton content="Registrarme" />
              <p class="text-center mt-4">
                Ya tiene cuenta? <a href="/signup" rel="prefetch"> Login</a>
              </p>
              <hr class="my-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";
  import axios from "axios";

  const { session } = stores();

  const logout = async () => {
    await axios({
      url: "/api/logout",
      method: "POST",
    });
    await goto("/login");
    $session.user = undefined;
    $session.token = undefined;
  };

  export let segment;
</script>

<style>
  .Nav {
    display: flex;
    justify-content: space-between;
  }

  nav {
    margin-right: 0;
    padding: 0 0 0 1me;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    color: black;
  }

  i {
    font-size: 0.8em;
    margin-left: 5px;
  }
  .logout {
    margin: 10px 10px 0 0;
  }
</style>

<div class="Nav">
  <nav>
    <ul>
      <li>
        <a
          aria-current={segment === undefined ? 'page' : undefined}
          href=".">Unu</a>
      </li>
      {#if $session.user}
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'dashboard' ? 'page' : undefined}
            href="/dashboard">
            Dashboard
          </a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'new-event' ? 'page' : undefined}
            href="/dashboard/new-event">
            Evento <i class="fas fa-plus" />
          </a>
        </li>
      {:else}
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'login' ? 'page' : undefined}
            href="login">
            Login
          </a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'published-events' ? 'page' : undefined}
            href="published-events">
            Eventos
          </a>
        </li>
      {/if}
    </ul>
  </nav>
  {#if $session.user}
    <div class="logout">
      <li>
        <button
          type="button"
          class="btn btn-ligth"
          on:click={logout}>Logout</button>
      </li>
    </div>
  {/if}
</div>

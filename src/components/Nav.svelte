<script>
  export let segment;

  let token;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
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
</style>

<div class="Nav">
  <nav>
    <ul>
      <li>
        <a
          aria-current={segment === undefined ? 'page' : undefined}
          href=".">Unu</a>
      </li>
      <li>
        {#if token}
          <a
            rel="prefetch"
            aria-current={segment === 'dashboard' ? 'page' : undefined}
            href="/dashboard">
            Dashboard
          </a>
        {:else}
          <a
            rel="prefetch"
            aria-current={segment === 'login' ? 'page' : undefined}
            href="login">
            Login
          </a>
        {/if}
      </li>
      <li>
        <a
          rel="prefetch"
          aria-current={segment === 'events' ? 'page' : undefined}
          href="events">Eventos</a>
      </li>
    </ul>
  </nav>
</div>

<script>
  export let text;
</script>

<style>
  h1 {
    margin: 0 auto;
    text-align: center;
    font-size: 2.3em;
    text-transform: uppercase;
    font-weight: 700;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 3.5em;
    }
  }
</style>

<div class="Title">
  <h1><strong>{text}</strong></h1>
</div>

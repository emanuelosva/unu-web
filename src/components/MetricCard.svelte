<script>
  export let quantity;
  export let text;
</script>

<style>
  .MetricCard {
    box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
    background-color: white;
  }
  .Card {
    box-sizing: border-box;
    min-height: 180px;
    margin: 0.7em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .Card-quantity {
    font-size: 1.5em;
    font-weight: 600;
  }
</style>

<div class="MetricCard">
  <div class="Card">
    <slot />
    <p class="Card-quantity">{quantity}</p>
    <p class="Card-text">{text}</p>
  </div>
</div>

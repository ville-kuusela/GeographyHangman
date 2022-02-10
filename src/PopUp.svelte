<script>
  import { fade, fly } from 'svelte/transition';
  export let wordToBeGuessed;
  export let coinflip;
  export let finalResultColor;
  export let extraInfo;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="bg" transition:fade>
  <div class="popup" transition:fly={{ y: -1000 }}>
    <div>
      <h1 class={finalResultColor}>
        <slot />
      </h1>
      <h2>Your word was {wordToBeGuessed}!</h2>

      <!-- This creates a "fun fact" of the guessed word -->
      {#if coinflip == 1}
        <p>{wordToBeGuessed} is a country in {extraInfo.region}.</p>
      {:else}
        <p>{wordToBeGuessed} is the capital of {extraInfo.name.common}.</p>
      {/if}

      <div class="buttons">
        <button on:click={() => dispatch('ng')}>New Game</button>
        <button on:click={() => dispatch('menu')}>Main Menu</button>
      </div>
    </div>
  </div>
</div>

<style>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    width: 65%;
    max-width: 1200px;
    min-width: 380px;
    height: fit-content;
    max-height: 1000px;
    min-height: 550px;
    margin: auto;
    background-color: rgb(247, 246, 239);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  }

  h1 {
    margin-top: 0px;
    font-size: 50px;
  }
</style>

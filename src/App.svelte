<script>
  import Game from './Game.svelte';
  import Settings from './Settings.svelte';

  let gameStarted = false;
  let openSettings = false;

  const back = () => {
    gameStarted = false;
    openSettings = false;
  };
</script>

<main>
  <h1>Geography Hangman</h1>

  {#if !gameStarted}
    {#if !openSettings}
      <div class="buttons">
        <button on:click={() => (gameStarted = true)}>Start</button>
        <button on:click={() => (openSettings = true)}>Settings</button>
        <img src="/pics/5.png" alt="Kuvitus" />
      </div>
    {:else}
      <Settings on:menu={() => back()} />
    {/if}
  {:else}
    <Game on:menu={back} />
  {/if}
</main>

<style>
  h1 {
    margin-top: 50px;
    font-size: 40px;
  }
</style>

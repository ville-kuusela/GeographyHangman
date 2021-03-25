<script>
  // The settings are stored in a Svelte writable store
  import { settings } from './settings';
  let settingsArray = $settings;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const toMainMenu = () => {
    dispatch('menu');
  };
</script>

<div class="settings">
  <h2>Difficulty:</h2>

  <div class="grid">
    <div>
      <input
        type="radio"
        name="a"
        value="Easy"
        checked
        on:click={() => (settingsArray[0] = 0)}
      />
      <label class="diff" for="a">
        <span class="label">
          <span class="green">Easy</span>
          <span class="diffInfo"> (10 mistakes allowed) </span>
        </span>
      </label>
    </div>

    <div>
      <input
        type="radio"
        name="a"
        value="Hard"
        on:click={() => (settingsArray[0] = 5)}
      />
      <label class="diff" for="a">
        <span class="label">
          <span class="red">Hard</span>
          <span class="diffInfo"> (5 mistakes allowed) </span>
        </span>
      </label>
    </div>
  </div>

  <div>
    <h2>Minimum Length: {settingsArray[1]}</h2>

    <input
      class="slider"
      type="range"
      min="1"
      max="10"
      bind:value={settingsArray[1]}
    />
  </div>

  <div>
    <h2>Maxium Length: {settingsArray[2]}</h2>

    <input
      class="slider"
      type="range"
      min="10"
      max="20"
      bind:value={settingsArray[2]}
    />
  </div>

  <button on:click={toMainMenu}>Main Menu</button>
</div>

<style>
  .settings {
    margin-top: 35px;
  }

  h2,
  button {
    margin-top: 35px;
  }

  .slider {
    width: 35%;
    min-width: 300px;
    max-width: 600px;
    box-shadow: 2px 2px 5px rgba(50, 50, 50, 0.095);
  }

  .diff {
    font-size: 1.05em;
    font-family: Verdana, Tahoma, sans-serif;
  }

  .diffInfo {
    color: rgba(0, 0, 0, 0.35);
    font-size: 0.7em;
  }
</style>

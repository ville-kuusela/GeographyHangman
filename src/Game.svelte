<script>
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  import { settings } from './settings';
  let settingsArray = $settings;

  import PopUp from './PopUp.svelte';

  let coinflip = Math.floor(Math.random() * (2 + 1 - 1)) + 1; // 1 = Country, 2 = Capital
  let amountOfWrongGuesses = settingsArray[0];
  let guesses = [' '];
  let wrongGuesses = [];
  let lettersOfTheWord = [];
  let testingArray = [];
  let showErrorMessage = false;
  let showPopUp = false;
  let errorMessage;
  let finalResult;
  let extraInfo;
  let finalResultColor;
  let input = '';
  let rn; // random number

  // this function chooses a random word that works for the game
  const wordRandomizer = async () => {
    let testedWord;

    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    const countryList = await response.json();

    // this do/while searches new words until a good word is found
    do {
      rn = Math.floor(Math.random() * (countryList.length + 1 - 0)) + 0;

      if (coinflip == 1) {
        testedWord = countryList[rn].name;
      } else {
        testedWord = countryList[rn].capital;
      }
    } while (
      // That regex tests the words for any letters or symbols that aren't used in the game
      // Code found here: https://stackoverflow.com/questions/12778083/regex-with-space-and-letters-only
      // ...And edited here: https://www.regextester.com/95029
      !(
        !/[^A-ZÅÄÖa-zåäö ]+/.test(testedWord) &&
        testedWord.length >= settingsArray[1] &&
        testedWord.length <= settingsArray[2]
      )
    );

    // this creates an array that contains every letter of the word. This is what is shown.
    for (let i = 0; i < testedWord.length; i++) {
      lettersOfTheWord.push(testedWord.charAt(i).toUpperCase());
    }

    // this creates an array that contains one of each letter in the word. Used for testing if the player has guessed every letter.
    for (let j = 0; j < testedWord.length; j++) {
      if (
        !testingArray.includes(testedWord.charAt(j).toUpperCase()) &&
        testedWord.charAt(j).toUpperCase() !== ' '
      ) {
        testingArray.push(testedWord.charAt(j).toUpperCase());
      }
    }

    // extraInfo is used to make a "fun fact" to the final pop up.
    extraInfo = countryList[rn];

    wordToBeGuessed = testedWord;
  };

  // this shows an error message if the players input is not valid or already guessed
  const throwErrorMessage = (ilmoitus) => {
    errorMessage = ilmoitus;
    showErrorMessage = true;
    setTimeout(() => {
      showErrorMessage = false;
    }, 2500);
  };

  // this opens the final pop up
  const openModal = (msg, clr) => {
    finalResult = msg;
    finalResultColor = clr;
    setTimeout(() => {
      showPopUp = true;
    }, 750);
  };

  // this function is executed when the player guesses a letter
  const newGuess = () => {
    if (
      // That regex tests the guesses for any letters or symbols that aren't used in the game
      // Code found here: https://stackoverflow.com/questions/12778083/regex-with-space-and-letters-only
      // ...And edited here: https://www.regextester.com/95029
      !/[^A-ZÅÄÖa-zåäö ]+/.test(input) &&
      input.length == 1 &&
      input !== ' '
    ) {
      if (!guesses.includes(input.toUpperCase())) {
        guesses = [...guesses, input.toUpperCase()];

        if (!lettersOfTheWord.includes(input.toUpperCase())) {
          // Wrong guess.
          wrongGuesses = [...wrongGuesses, input.toUpperCase()];
          amountOfWrongGuesses++;

          if (amountOfWrongGuesses == 11) {
            openModal('You lost!', 'red');
          }
        } else {
          // Correct guess. The correct letter is removed from the array that contains one of each letter.
          testingArray = testingArray.filter((a) => a !== input.toUpperCase());

          if (testingArray.length == 0) {
            openModal('You won!', 'green');
          }
        }
      } else {
        throwErrorMessage('You have already guessed this letter!');
      }
    } else {
      throwErrorMessage('The guess must a singular letter!');
    }
    input = '';
  };

  // This function is executed if the player selects "new game" in the pop up.
  const newGame = () => {
    coinflip = Math.floor(Math.random() * (2 + 1 - 1)) + 1;
    amountOfWrongGuesses = settingsArray[0];
    guesses = [' '];
    wrongGuesses = [];
    lettersOfTheWord = [];
    testingArray = [];
    showErrorMessage = false;
    showPopUp = false;
    errorMessage = '';
    finalResult = '';
    extraInfo = '';
    finalResultColor = '';
    input = '';
    rn = 0; // random number
    wordToBeGuessed = wordRandomizer();
  };

  // this allows the player to guess by pressing enter.
  // code found here: https://svelte.dev/repl/d99826cdac4f4fdf8064f5b6a31676ff?version=3.18.2
  const enterInput = (key) => {
    if (key.charCode === 13) newGuess();
  };

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let wordToBeGuessed = wordRandomizer();
</script>

<div>
  {#await wordToBeGuessed}
    <p>Loading....</p>
  {:then}
    <div in:fade>
      <div class="flex">
        <!-- This Each creates the lines/letters shown to the player -->
        {#each lettersOfTheWord as letter}
          <div>
            {#if guesses.includes(letter)}
              <p transition:fade>{letter}</p>
            {:else}
              <p>__</p>
            {/if}
          </div>
        {/each}
      </div>

      <!-- This is the text input used to guess -->
      <div class="input">
        <input
          type="text"
          bind:value={input}
          on:keypress={enterInput}
          class="input"
        />
        <button on:click={newGuess}>Guess!</button>
      </div>

      {#if showErrorMessage}
        <p
          class="error noSpace"
          in:fly={{ duration: 200, x: 300 }}
          out:fly={{ duration: 200, x: -300 }}
        >
          {errorMessage}
        </p>
      {/if}

      <p class="bold">Your wrong guesses:</p>
      <div class="flex noSpace">
        {#each wrongGuesses as wrongGuess (wrongGuess)}
          <p class="guess" animate:flip transition:fade>{wrongGuess}</p>
        {/each}
      </div>

      <!-- Here is the hanging tree picture. The image files are named according to the amount of wrong guesses -->
      <div class="imgDiv">
        {#if amountOfWrongGuesses > 0}
          <img
            src="/pics/{amountOfWrongGuesses}.png"
            alt="Hanging Tree"
            in:fade
          />
        {/if}
      </div>

      <div class="backToMenu">
        <button on:click={() => dispatch('menu')}>&#8592; Main Menu</button>
      </div>
    </div>
  {/await}

  {#if showPopUp}
    <PopUp
      {finalResultColor}
      {wordToBeGuessed}
      {coinflip}
      {extraInfo}
      on:ng={newGame}
      on:menu>{finalResult}</PopUp
    >
  {/if}
</div>

<style>
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  .flex p {
    margin: 5px;
  }

  .bold {
    font-weight: bold;
    margin-top: 80px;
  }

  .input {
    margin-top: 20px;
    background-color: rgb(247, 246, 239);
  }

  .guess {
    position: relative;
    right: 7.5px;
    bottom: 20px;
    color: rgb(175, 175, 175);
  }

  .error {
    color: rgb(193, 12, 12);
    margin-top: 40px;
  }

  .noSpace {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .input {
    height: 25px;
    position: relative;
    bottom: 1.5px;
  }

  .imgDiv {
    width: 211px;
    height: 231px;
    margin: 15px auto 0px auto;
  }

  .backToMenu {
    position: fixed;
    top: 10px;
    left: 10px;
  }

  .backToMenu button {
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
    font-size: 1em;
    color: rgb(90, 88, 86);
  }
</style>

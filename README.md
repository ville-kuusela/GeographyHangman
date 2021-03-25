
# Geography Hangman

## FI:

Tämä on yksinkertainen ja perinteinen hirsipuu-peli, jossa arvaillaan maiden ja pääkaupunkien nimiä. Se on harjoitustyöni JAMK:in Frontend-perusteet kurssia varten.

Pelissä on myös asetuksia pelin mukauttamista varten: pelaaja voi vaihtaa arvattavan sanan minimi- ja maksimipituutta, sekä pelin vaikeustasoa, joka tarkoittaa montako väärää veikkausta sallitaan.

Kaikki koodi on minun itseni kirjoittamaa, lukuun ottamatta seuraavia asioita:
- Sanan sopivuuden testaamisessa käytetään RegExiä. Sitä opin seuraavilta sivuilta:
	- [StackOverflow](https://stackoverflow.com/questions/12778083/regex-with-space-and-letters-only)
	- [RegEx Testing](https://www.regextester.com/95029)
- Pelaajan ei tarvitse klikata veikkausnappulaa, vaan voi myös painaa Enteriä. Sen koodin löysin täältä:
	- [Svelte.dev](https://svelte.dev/repl/d99826cdac4f4fdf8064f5b6a31676ff?version=3.18.2)

Täältä peli saa käyttämänsä sanat: [Restcountries](https://restcountries.eu/rest/v2/all)

## EN:

This is a simple and classic hangman-game, where the player tries to guess countries and their capitals. Se on harjoitustyöni JAMK:in Frontend-perusteet kurssia varten.

The game also contains some settings. The player can change the word's minimum and maxium length, as well as select their preferred difficulty, which means how many wrong guesses can be made.

All code is written by me, but some small code snippets I took elsewhere:
- The game uses RegEx to test if a word is suitable. I used these sites to learn how to do it:
	- [StackOverflow](https://stackoverflow.com/questions/12778083/regex-with-space-and-letters-only)
	- [RegEx Testing](https://www.regextester.com/95029)
- The player doesn't have to click the 'Guess'-button, they can also press Enter to guess. Code for that I took here:
	- [Svelte.dev](https://svelte.dev/repl/d99826cdac4f4fdf8064f5b6a31676ff?version=3.18.2)

This is where the game gets the words it uses: [Restcountries](https://restcountries.eu/rest/v2/all)
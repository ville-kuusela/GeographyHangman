import { writable } from 'svelte/store';

export let settings = writable([0, 1, 20]) 

// [0]: 0 = Difficulty Easy, 5 = Difficulty Hard
// [1]: Word minimum length
// [2]: Word maxium length
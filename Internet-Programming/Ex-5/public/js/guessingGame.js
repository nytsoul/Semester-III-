"use strict";
// randomly choose a number from 1..9 when the page initialises.
let secret;
// the element where we write the feedback message; the script tag is at the
// end of the body so this will never be null once the file has been loaded.
const messageEl = document.getElementById('guessMessage');
function initGuessing() {
    // generate secret in the range [1,9]
    secret = Math.floor(Math.random() * 9) + 1;
    window.addEventListener('keydown', handleKey);
}
function handleKey(e) {
    const key = e.key;
    if (/^[1-9]$/.test(key)) {
        const guess = parseInt(key, 10);
        if (guess === secret) {
            messageEl.textContent = 'Correct! You guessed the number!';
        }
        else {
            messageEl.textContent = 'Try again!';
        }
    }
}
window.addEventListener('DOMContentLoaded', initGuessing);

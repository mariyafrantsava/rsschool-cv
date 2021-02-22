import cards from './data';
import { changeBtnName } from './shared/utils';

let randomKeyMas = [];

let masIndex = 0;

document.querySelector("#start-game").addEventListener("click", function(event) {
    let theme = localStorage.getItem('cardId');
    let themeCards = cards[theme];
    let keys = Object.keys(themeCards);
    masIndex = 0;
    changeBtnName('repeat');
    fillRandomKeys(keys);
    sayWord();
    console.log(randomKeyMas);

});

function finish() {
    if (masIndex >= randomKeyMas.length - 1) {
        masIndex = 0;
        changeBtnName('start game');
        return false;

    }
    masIndex++;
    return true;
}


function sayWord() {
    let startButton = document.querySelector('#start-game');
    if (startButton.innerHTML !== 'start game') {
        let theme = localStorage.getItem('cardId');
        let soundUp = document.querySelector('#soundUp');
        soundUp.src = 'assets/' + cards[theme][randomKeyMas[masIndex]].audioSrc;
        soundUp.play();
    }
}

function fillRandomKeys(keyMas) {
    let index = 0;
    while (keyMas.length > 0) {
        const number = Math.trunc(Math.random() * (keyMas.length));
        randomKeyMas[index] = keyMas[number];
        index++;
        keyMas.splice(number, 1);
    }

}

const checkWord = (wordCard) => {
    let theme = localStorage.getItem('cardId');
    if (wordCard === cards[theme][randomKeyMas[masIndex]].word && finish()) {
        console.log('true');
        sayWord();
    } else {
        console.log('false');
    }
}

export { checkWord };
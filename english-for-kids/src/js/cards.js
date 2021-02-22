import cards from './data';
import { changeBtnName, clearCards } from './shared/utils';
import { checkWord } from './sound.component';

const createCard = () => {
    const card = localStorage.getItem('cardId');
    if (card === null) { return; }
    let taskCards = cards[card];
    clearCards('#categories-list');
    let switchInput = document.querySelector('.switch-input');

    Object.keys(taskCards).forEach((key) => {
        if (switchInput.checked) {
            createRotateCard(taskCards[key]);
        } else {
            createGameCard(taskCards[key], key);
        }
    });
}

function createRotateCard(cardObj) {
    const containerTemplates = document.querySelector('#categories-list');
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "rotateCard");

    const soundButton = document.createElement("i");
    soundButton.classList.add("fa", "fa-volume-up", "fa-2x", "shouldHide", "card__face", "beep");
    soundButton.setAttribute("id", "play");
    soundButton.setAttribute("aria-hidden", "true");

    const rotateButton = document.createElement("i");
    rotateButton.classList.add("fa", "fa-rotate-right", "rotate", "shouldHide", "card__face");
    rotateButton.style.setProperty("font-size", "32px");

    const audioBeep = document.createElement('audio');
    audioBeep.setAttribute("src", "assets/" + cardObj.audioSrc);

    /*front of card*/
    const cardFront = document.createElement("div");
    cardFront.classList.add("view", "overlay", "front", "card__face");
    cardFront.style.setProperty('background-image', 'url(assets/' + cardObj.image + ')');

    const aMaskFront = document.createElement("a");
    aMaskFront.setAttribute('href', '#');

    const maskFront = document.createElement("div");
    maskFront.classList.add("mask", "rgba-white-slight");

    const wordFront = document.createElement("div");
    wordFront.classList.add("card-body");
    wordFront.innerHTML = cardObj.word;

    aMaskFront.appendChild(maskFront);
    cardFront.appendChild(aMaskFront);
    cardFront.appendChild(wordFront);
    cardContainer.appendChild(cardFront);

    /*back of card*/
    const cardBack = document.createElement("div");
    cardBack.classList.add("view", "overlay", "back", "card__face");
    cardBack.style.setProperty('background-image', 'url(assets/' + cardObj.image + ')');

    const aMaskBack = document.createElement("a");
    aMaskBack.setAttribute('href', '#');

    const maskBack = document.createElement("div");
    maskBack.classList.add("mask", "rgba-white-slight");

    const wordBack = document.createElement("div");
    wordBack.classList.add("card-body");
    wordBack.innerHTML = cardObj.translation;

    aMaskBack.appendChild(maskBack);
    cardBack.appendChild(aMaskBack);
    cardBack.appendChild(wordBack);
    cardContainer.appendChild(cardBack);

    cardContainer.appendChild(soundButton);
    cardContainer.appendChild(audioBeep);
    cardContainer.appendChild(rotateButton);
    containerTemplates.appendChild(cardContainer);
}

function createGameCard(cardObj, cardName) {
    const containerTemplates = document.getElementById('categories-list');
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "playCard");

    const cardFront = document.createElement("div");
    cardFront.classList.add("view", "overlay", "gamePicture", "front", "card__face");
    cardFront.setAttribute('id', cardName);
    cardFront.style.setProperty('background-image', 'url(assets/' + cardObj.image + ')');

    cardContainer.appendChild(cardFront);
    containerTemplates.appendChild(cardContainer);
}

const cardsInit = () => {
    document.querySelector("#content").addEventListener("click", function(event) {
        if (event.target.classList.contains('card__face') || event.target.classList.contains('card')) {
            localStorage.cardId = event.target.closest('.card').id;
            createCard(event);
            document.querySelector('#content').hidden = true;
            document.querySelector('#router-outlet').hidden = false;
            document.querySelector('.back-to-main').hidden = false;
            changeBtnName('start game');
        }
    });

    document.querySelector("#categories-list").addEventListener("click", function(event) {
        let buttonAction = event.target.closest('i');
    
        if (buttonAction !== null) {
            if (buttonAction.classList.contains('rotate')) {
                let cardContainer = buttonAction.parentElement;
                cardContainer.classList.add('is-flipped');
            }
    
            if (buttonAction.classList.contains('beep')) {
                buttonAction.nextSibling.play();
            }
    
            buttonAction.addEventListener("mouseout", function(event) {
                buttonAction.parentElement.classList.remove('is-flipped');
            });
        }
    
        let gamePictureCard = event.target.closest('div');
        if (gamePictureCard !== null) {
            if (gamePictureCard.classList.contains('gamePicture')) {
                checkWord(gamePictureCard.id);
            }
        }
    });

    Object.keys(cards).forEach(key => createCardMainPage(cards[key], key));
}

function getImg(cardObj) {
	const firstObj = Object.keys(cardObj)[0];
	return cardObj[firstObj].image;
}

function createCardMainPage(cardObj, taskName) {
    const contentMainPage = document.querySelector('#content');

    const cardMainPage = document.createElement("div");
    cardMainPage.classList.add("card");
    cardMainPage.setAttribute('id', taskName);

    const viewCardMainPage = document.createElement("div");
    viewCardMainPage.classList.add("view", "overlay", "front", "card__face");
    viewCardMainPage.style.setProperty('background-image', 'url(assets/' + getImg(cardObj) + ')');

    const aMaskBack = document.createElement("a");
    aMaskBack.setAttribute('href', '#');

    const maskBack = document.createElement("div");
    maskBack.classList.add("mask", "rgba-white-slight");

    const word = document.createElement("div");
    word.classList.add("card-body");
    word.innerHTML = taskName;

    cardMainPage.appendChild(viewCardMainPage);
    cardMainPage.appendChild(aMaskBack);
    aMaskBack.appendChild(maskBack);
    viewCardMainPage.appendChild(word);
    contentMainPage.appendChild(cardMainPage);
}

export {
    cardsInit,
    createCard
}
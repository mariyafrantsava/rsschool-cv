import { clearCards } from './shared/utils';
import { createCard, cardsInit } from './cards';
import  { menuInit } from './menu.component';
import '../assets/css/style.css';

document.addEventListener("DOMContentLoaded", function() {
    menuInit();
    cardsInit();
});


// const mainPage = document.querySelector('#content');
const buttonMainPage = document.querySelector('.back-to-main');
// const categories_list = document.querySelector('.categories-list');
const switchInput = document.querySelector('.switch-input');

buttonMainPage.addEventListener("click", function() {
    document.querySelector('#content').hidden = false;
    document.querySelector('#router-outlet').hidden = true;
    buttonMainPage.hidden = true;

});

switchInput.addEventListener("click", function(event) {
    clearCards('#categories-list');
    createCard(event);
    const btns = document.querySelector('.btns');
    if (switchInput.checked) {
        btns.hidden = true;
    } else {
        btns.hidden = false;
    }
});
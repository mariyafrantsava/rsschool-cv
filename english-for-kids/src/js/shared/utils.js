export const changeBtnName = (value) => {
    let startButton = document.querySelector('#start-game');
    startButton.innerHTML = value;
}

export const clearCards = (clearElementId) => {
    let containerTemplates = document.querySelector(clearElementId); 
    containerTemplates.innerHTML = '';
};

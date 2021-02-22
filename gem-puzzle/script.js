let sizeField = 4;
let timer;
let countTimes = 0;

let result = [];

let classSize = "game-board-main4";

let selectName = document.createElement("span");
selectName.innerHTML = "Choose size of field game: ";

let options = [];
let select = document.createElement("select");
for(let i = 3; i <= 8; i++){
	options[i] = document.createElement("option");
	options[i].innerHTML = i+'x'+i;
	options[i].value = i;
	select.appendChild(options[i]);
}
options[4].selected = true;

let divChangeSize = document.createElement("div");
divChangeSize.classList.add("divChangeSize");
divChangeSize.appendChild(selectName);
divChangeSize.appendChild(select);
document.body.appendChild(divChangeSize);

const Puzzle = {
	elements: {
		keysContainer: null,
		headerContainers: null,
		keys: [],
		audio: []
	},

	properties: {
        language: false,
        audio: false
    },

	init() {
		this.elements.keysContainer = document.createElement("div");
		this.elements.keysContainer.setAttribute("id","keysContainer");

		let divScore = document.createElement("header");
		
			let divScoreChild = document.createElement("div");
			divScoreChild.classList.add("info");

		divScore.appendChild(divScoreChild);

			let divScoreChildSpan = document.createElement("span");
			divScoreChildSpan.classList.add("description");
			divScoreChildSpan.innerHTML = 'Time ';
			divScoreChild.appendChild(divScoreChildSpan);

			let divScoreChildSpan2 = document.createElement("span");
			divScoreChildSpan2.classList.add("timer");
			divScoreChildSpan2.innerHTML = '00:00';
			divScoreChild.appendChild(divScoreChildSpan2);

		let divScoreChild2 = document.createElement("div");
		divScoreChild2.classList.add("moves");
		divScore.appendChild(divScoreChild2);

			let divScoreChildSpan3 = document.createElement("span");
			divScoreChildSpan3.classList.add("description");
			divScoreChildSpan3.innerHTML = 'Moves ';
			divScoreChild2.appendChild(divScoreChildSpan3);

			let divScoreChildSpan4 = document.createElement("span");
			divScoreChildSpan4.setAttribute("id","counter");
			divScoreChildSpan4.innerHTML = '0 ';
			divScoreChild2.appendChild(divScoreChildSpan4);

		let buttonPause = document.createElement("button");
		buttonPause.classList.add("pause");
		buttonPause.classList.add("visible");
		buttonPause.innerHTML = 'Pause game';
		divScore.appendChild(buttonPause);

		let buttonPause2 = document.createElement("button");
		buttonPause2.classList.add("pause");
		buttonPause2.innerHTML = 'Resume game';
		divScore.appendChild(buttonPause2);

		this.elements.keys = this.elements.keysContainer.querySelectorAll(".chip");
		document.body.appendChild(divScore);
		document.body.appendChild(this.elements.keysContainer);	
		
		this.elements.audio = document.querySelectorAll(`audio`);
	},

	_startGame () {
		this.elements.keysContainer.classList.add("game-board", classSize);
		this.elements.keysContainer.appendChild(this._createKeys());
	},

	_createKeys() {

		let amountButtons = sizeField**2;
		const fragment = document.createDocumentFragment();
		
		let val = 0;
		let indexResult = 0;

		while (result.length < amountButtons) {
			val = Math.floor(Math.random() * amountButtons);
			if (!result.includes(val)) {
				const keyElement = document.createElement("div");
				if (val !== 0) {
					keyElement.textContent = val;
				}
				keyElement.setAttribute("id", val);
				
				let divClass = val === 0 ? "empty" : "chip";
				keyElement.classList.add(divClass);

				keyElement.addEventListener("click", (e) => {	
					let buttonId = Number(e.target.id);
					if (this._checkMove(buttonId)){																		
						this._changePositionButton(buttonId);
						if (this._checkWin()){
							clearInterval(timer);
							alert("Ура, победа !!! Количество шагов: " + countTimes);
						};
					}
				});

				fragment.appendChild(keyElement);

				result[indexResult] = val;
				indexResult++;
			}
		}
		return fragment;
	},

	_changePositionButton(buttonId){
		let indexClickedBtn = result.indexOf(buttonId);
		let indexEmpty = result.indexOf(0);

		result[indexEmpty] = buttonId;
		result[indexClickedBtn] = 0;

		let clickDiv = document.getElementById(buttonId);
		let emptyDiv = document.getElementById('0');
		emptyDiv.classList.remove("empty");
		emptyDiv.classList.add("chip");
		emptyDiv.setAttribute('id', clickDiv.id);
		emptyDiv.innerHTML =clickDiv.innerHTML;

		clickDiv.classList.remove("chip");
		clickDiv.classList.add("empty");
		clickDiv.setAttribute('id', "0");
		clickDiv.innerHTML = "";	

		countTimes++;
		document.getElementById("counter").innerHTML = countTimes;
		Puzzle._toggleAudio();
	},

	_checkMove(buttonId){

		let indexResult = result.indexOf(buttonId);
		let indexNumString = indexResult % sizeField;
		let indxNumCol = Math.floor(indexResult / sizeField);

		if(indexNumString - 1 >= 0){
			if(this._checkZero(indexResult - 1)){
				return true;				
			}
		}
		if(indexNumString + 1 < sizeField){
			if(this._checkZero(indexResult + 1)){
				return true;				
			}
		}
		if(indxNumCol - 1 >= 0){
			if(this._checkZero(indexResult - sizeField)){
				return true;				
			}
		}
		if(indxNumCol + 1 < sizeField){
			if(this._checkZero(indexResult + sizeField)){
				return true;				
			}
		}
		return false;
	},

	_checkZero(index){
		if(result[index] === 0){
			return true;
		}
	},

	_checkWin(){
		flagWin = true;
		for(let i = 0; i < result.length-2; i++ ) {
			if(result[i+1] - result[i] !== 1){
				flagWin = false;
				break;				
			}
		}		
		return flagWin;
	},

	_getTimer(){
		let seconds = 0;
		let minutes = 0;
		timer = setInterval(
		() => {document.getElementsByClassName("timer")[0].innerHTML = minutes + ' : ' + seconds++
			if(seconds === 60) {
				seconds = 0;
				minutes++;
			}
		},
			1000
		  );
		},

    _toggleAudio() {
        if (this.properties.audio) return;

            Puzzle.elements.audio[0].currentTime = 0;
            Puzzle.elements.audio[0].play();
    }
};

function clearField(e){
	let selectValue = document.getElementsByTagName("select")[0].value;
	sizeField = Number(selectValue);
	result.length = 0;
	document.getElementById("keysContainer").remove();
	document.getElementsByTagName("header")[0].remove();
	classSize = "game-board-main" + selectValue;
}
select.addEventListener("change", function (e) {
	clearField();
	clearInterval(timer);
	Puzzle.init();
});

let divStartGame = document.createElement("div");
divStartGame.classList.add("startGame");
let buttonStartGame = document.createElement("button");
buttonStartGame.classList.add("start");
buttonStartGame.setAttribute("id","start");
buttonStartGame.innerHTML = 'Start game';

divStartGame.appendChild(buttonStartGame);
document.body.appendChild(divStartGame);

buttonStartGame.addEventListener("click", function (e) {
	clearField();
	Puzzle.init();
	Puzzle._startGame();
	clearInterval(timer);
	Puzzle._getTimer();
});

window.addEventListener("DOMContentLoaded", function () {
	Puzzle.init();
});
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        letters: [],
        numbers: [],
        language: [],
        audio: [],
        input: []
    },
    eventHandlers: { //обработчик событий
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false,
        shift: false,
        language: false,
        audio: false,
        voice: false,
        range: 0,
        position: 0
    },
    init() { //инициализирует клавиатуру

        //create main elements//создали оболочки div
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //Setup настройка main elements//создали классы для оболочек div
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");

        //добавление фрагмента через функцию _createKeys()- возвращает значение и это есть наш фрагмент
        //=> добавляет фрагмент в контейнер ключей
        //=> добавление дочерних классов и обработчиков событий на все кнопки по функции _createKeys()
        this.elements.keysContainer.appendChild(this._createKeys());

        //запись в массив ключей списка ключей-ссылок контейнера (кнопок с классом ".keyboard__key")
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        //add to DOM
        this.elements.letters = this.elements.keysContainer.querySelectorAll(".keyboard__key--letters");
        this.elements.numbers = this.elements.keysContainer.querySelectorAll(".keyboard__key--numbers");
        this.elements.language = this.elements.keysContainer.querySelectorAll(".keyboard_language");
        this.elements.special = this.elements.keysContainer.querySelectorAll(".keyboard__key--special");
        //add audio
        this.elements.audio = document.querySelectorAll(`audio`);
        console.log(this.elements.audio);
        this.elements.input = document.querySelectorAll(".use-keyboard-input");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() { //будет созд весь html для каждого из ключей 
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "done",
            "en", "audio", "space", "voice", "←", "→"
        ];

        //Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        //перебор иконок кнопок, определение ключа для каждой кнопки клавиатуры
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");

            //решение вопроса разрыва строки  после каждой строки из кнопок клавиатуры
            const insertLineBreak = ["backspace", "]", "enter", "done"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            //установление стилей каждой конкретной кнопке
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener("click", () => {
                        //this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position - 1) + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position--;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                        //вызов функции-обработчика для уведомления события об изменении ввода 
                        this._triggerEvent("oninput");
                        if (this.properties.audio) return;

                        Keyboard.elements.audio[4].currentTime = 0;
                        Keyboard.elements.audio[4].play();


                    });
                    //Backspace
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Backspace`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position - 1) + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position--;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");


                            keyElement.classList.add("keyboard__key--active");
                            if (Keyboard.properties.audio) return;

                            Keyboard.elements.audio[4].currentTime = 0;
                            Keyboard.elements.audio[4].play();

                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `Backspace`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case "audio":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("hearing_disabled");

                    keyElement.addEventListener("click", () => {
                        this._toggleAudioOff();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.audio);
                    });


                    break;
                case "voice":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("mic");

                    keyElement.addEventListener("click", () => {
                        this._toggleVoice();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.voice);
                    });

                    break;
                case "←":

                    keyElement.textContent = key;

                    keyElement.addEventListener("click", () => {
                        this._toggleLeft();

                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `ArrowLeft`) {
                            event.preventDefault();
                            Keyboard._toggleLeft();
                            keyElement.classList.add("keyboard__key--active");

                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `ArrowLeft`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case "→":

                    keyElement.textContent = key;

                    keyElement.addEventListener("click", () => {
                        this._toggleRight();

                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `ArrowRight`) {
                            event.preventDefault();
                            Keyboard._toggleRight();
                            keyElement.classList.add("keyboard__key--active");

                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `ArrowRight`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        if (this.properties.audio) return;

                        Keyboard.elements.audio[2].currentTime = 0;
                        Keyboard.elements.audio[2].play();

                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `CapsLock`) {
                            event.preventDefault();
                            Keyboard._toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
                            if (Keyboard.properties.audio) return;

                            Keyboard.elements.audio[2].currentTime = 0;
                            Keyboard.elements.audio[2].play();




                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `CapsLock`) {
                            event.stopPropagation()
                        }
                    });
                    break;
                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("filter_tilt_shift");

                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                        //audio
                        if (this.properties.audio) return;

                        Keyboard.elements.audio[3].currentTime = 0;
                        Keyboard.elements.audio[3].play();




                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `ShiftLeft`) {
                            event.preventDefault();
                            Keyboard._toggleShift();
                            keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.shift);
                            //audio
                            if (Keyboard.properties.audio) return;

                            Keyboard.elements.audio[3].currentTime = 0;
                            Keyboard.elements.audio[3].play();


                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `ShiftLeft`) {
                            //keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });
                    break;
                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        //this.properties.value += "\n";
                        //вызов функции-обработчика для уведомления события об изменении ввода
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + "\n" + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                        //Keyboard._triggerEvent("oninput");
                        this._triggerEvent("oninput");
                        if (this.properties.audio) return;
                        //audio
                        Keyboard.elements.audio[5].currentTime = 0;
                        Keyboard.elements.audio[5].play();

                    });

                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Enter`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + "\n" + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            if (Keyboard.properties.audio) return;

                            Keyboard.elements.audio[5].currentTime = 0;
                            Keyboard.elements.audio[5].play();


                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        if (event.code == `Enter`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });
                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    keyElement.addEventListener("click", () => {
                        //this.properties.value += " ";
                        //вызов функции-обработчика для уведомления события об изменении ввода
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + " " + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                        //Keyboard._triggerEvent("oninput");
                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Space`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + " " + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                            //Keyboard._triggerEvent("oninput");
                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            //audio
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `Space`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }

                    });
                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        //вызов функции-обработчика для уведомления события об изменении ввода
                        this._triggerEvent("onclose");

                    });
                    break;
                case "en":
                    keyElement.classList.add("keyboard__key--wide", "keyboard_language");
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this._toggleLanguage();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `AltLeft`) {
                            event.preventDefault();
                            Keyboard._toggleLanguage();
                            keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.shift);
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `AltLeft`) {
                            //keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;

                case "-":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--numbers");

                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {

                        if (event.code == `Minus`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `Minus`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;

                case "=":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--numbers");

                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Equal`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `Equal`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case "[":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.classList.add("keyboard__key--special");
                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `BracketLeft`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `BracketLeft`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case "]":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.classList.add("keyboard__key--special");
                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `BracketRight`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `BracketRight`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case ";":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.classList.add("keyboard__key--special");
                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Semicolon`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                            //Keyboard._triggerEvent("oninput");
                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        // let self=this;
                        if (event.code == `Semicolon`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case "'":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.classList.add("keyboard__key--special");
                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Quote`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `Quote`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case ",":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.classList.add("keyboard__key--special");
                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;

                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Comma`) {


                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();

                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `Comma`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case ".":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.classList.add("keyboard__key--special");
                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                        Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                        Keyboard.properties.position++;
                        Keyboard._triggerEvent("oninput");
                        Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                        Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Period`) {
                            event.preventDefault();
                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `Period`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });

                    break;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":

                    keyElement.textContent = key.toLowerCase();
                    keyElement.classList.add("keyboard__key--numbers");

                    keyElement.addEventListener("click", () => {
                        Keyboard.elements.input[0].focus();
                        this.elements.input[0].selectionStart = this.properties.position;
                        this.properties.position = this.elements.input[0].selectionStart;
                        this.properties.value = this.properties.value.substring(0, this.properties.position) + keyElement.textContent + this.properties.value.substring(this.properties.position, this.properties.value.length);
                        this.properties.position++;

                        this._triggerEvent("oninput");

                        this.elements.input[0].selectionStart = this.properties.position;
                        this.elements.input[0].selectionEnd = this.elements.input[0].selectionStart;
                        this._triggerEvent("oninput");
                        Keyboard._toggleAudio();
                    });
                    document.addEventListener('keydown', function(event) {
                        let self = this;
                        if (event.code == `Digit${key}`) {
                            event.preventDefault();

                            Keyboard.elements.input[0].focus();
                            Keyboard.properties.position = Keyboard.elements.input[0].selectionStart;
                            Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.position) + keyElement.textContent + Keyboard.properties.value.substring(Keyboard.properties.position, Keyboard.properties.value.length);
                            Keyboard.properties.position++;
                            Keyboard._triggerEvent("oninput");
                            Keyboard.elements.input[0].selectionStart = Keyboard.properties.position;
                            Keyboard.elements.input[0].selectionEnd = Keyboard.elements.input[0].selectionStart;
                            Keyboard._triggerEvent("oninput");
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {

                        if (event.code == `Digit${key}`) {
                            keyElement.classList.remove("keyboard__key--active");
                            event.stopPropagation()
                        }
                    });
                    break;

                default:
                    let self = this
                    keyElement.textContent = key.toLowerCase();
                    keyElement.classList.add("keyboard__key--letters");
                    keyElement.addEventListener("click", () => {
                        Keyboard._toggleAudio();
                        Keyboard.elements.input[0].focus();
                        //добавление символов набранных с клавиатуры с проверкой на регистр
                        //this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLocaleLowerCase();
                        //вызов функции-обработчика для уведомления события об изменении ввода
                        this.properties.position = this.elements.input[0].selectionStart;
                        this.properties.value = this.properties.value.substring(0, this.properties.position) + keyElement.textContent + this.properties.value.substring(this.properties.position, this.properties.value.length);
                        this.properties.position++;
                        this._triggerEvent("oninput");
                        this.elements.input[0].selectionStart = this.properties.position;
                        this.elements.input[0].selectionEnd = this.elements.input[0].selectionStart;
                    })
                    document.addEventListener('keydown', function(event) {
                        if (event.code == `Key${key.toUpperCase()}`) {
                            event.preventDefault();

                            Keyboard.elements.input[0].focus();
                            self.properties.position = self.elements.input[0].selectionStart;
                            self.properties.value = self.properties.value.substring(0, self.properties.position) + keyElement.textContent + self.properties.value.substring(self.properties.position, self.properties.value.length);
                            self.properties.position++;
                            self._triggerEvent("oninput");
                            self.elements.input[0].selectionStart = self.properties.position;
                            self.elements.input[0].selectionEnd = self.elements.input[0].selectionStart;
                            keyElement.classList.add("keyboard__key--active");
                            Keyboard._toggleAudio();
                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        if (event.code == `Key${key.toUpperCase()}`) {

                            keyElement.classList.remove("keyboard__key--active");
                        }

                    });
                    break;
            }
            //контейнер для всех ключей
            fragment.appendChild(keyElement);
            //если нужен разрыв строки
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });

        //возвращаем все ключи как фрагмент документа
        return fragment;
    },

    _triggerEvent(handlerName) { //вызов событий oninput или onclose, правится и возвращается
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value); //oninput, onclose не функции
        }
        console.log("Event Triggered! Event Name: " + handlerName);
    },

    _toggleCapsLock() { //переключатель CapsLock 
        this.properties.capsLock = !this.properties.capsLock;

        //проверка на содержание в элементе ключа класса с иконкой
        //так как их необходимо исключить из списка на изменение регистра
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) { //если это кнопка без иконки, т е буква, то...
                //отобразить на экран запас свойства caps lock, если true, то включить верх регистр, 
                //в противном случае преобразовать его в нижний регистр 
                key.textContent = this.properties.capsLock && !this.properties.shift || this.properties.shift &&
                    !this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLocaleLowerCase();
            }
        }
    },
    _toggleAudioOff() {
        this.properties.audio = !this.properties.audio
    },
    _toggleVoice() {
        this.properties.voice = !this.properties.voice

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = !this.properties.language ? 'en-US' : "ru-Ru"
        if (!this.properties.voice) { recognition.abort(); }
        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            console.log(transcript)



            if (e.results[0].isFinal) {
                Keyboard.properties.value += " " + transcript + " ";
                Keyboard._triggerEvent("oninput");
            }
        });



        recognition.start();
        recognition.addEventListener('end', () => {
            if (Keyboard.properties.voice) {
                console.log(Keyboard.properties.voice);
                recognition.start()
            } else {
                console.log(Keyboard.properties.voice);
                recognition.abort()
            }
        })
        recognition.addEventListener('start', () => {
            if (!Keyboard.properties.voice) {
                console.log(Keyboard.properties.voice);
                recognition.abort()
            } else {
                console.log(Keyboard.properties.voice);
                recognition.start()

            }
        });
    },
    _toggleLeft() {
        this.elements.input[0].focus();
        this.elements.input[0].selectionStart = this.elements.input[0].selectionStart - 1;
        this.elements.input[0].selectionEnd = this.elements.input[0].selectionStart;
        console.log(this.elements.input[0].currentValue);
        this.properties.position = this.elements.input[0].selectionEnd;
    },
    _toggleRight() {
        this.elements.input[0].focus();
        this.elements.input[0].selectionStart = this.elements.input[0].selectionStart + 1;
        this.elements.input[0].selectionEnd = this.elements.input[0].selectionStart;
        console.log(this.elements.input[0].selectionStart);
        this.properties.position = this.elements.input[0].selectionStart;
    },
    _toggleAudio() {
        if (this.properties.audio) return;
        if (!this.properties.language) {
            Keyboard.elements.audio[0].currentTime = 0;
            Keyboard.elements.audio[0].play();
        } else {
            Keyboard.elements.audio[1].currentTime = 0;
            Keyboard.elements.audio[1].play();
        }
        console.log("Caps lock Toggled!");

    },
    _toggleShift() {
        //this.properties.capsLock = !this.properties.capsLock;
        this.properties.shift = !this.properties.shift;
        const case1 = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "="];
        const case0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"];
        for (const key of this.elements.letters) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.shift && !this.properties.capsLock || this.properties.capsLock && !this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
        let self = this
        for (let key = 0; key < self.elements.numbers.length; key++) {
            if (self.elements.numbers[key].childElementCount === 0) {
                self.elements.numbers[key].textContent = this.properties.shift ? case1[key] : case0[key];
            }
        }

    },

    _toggleLanguage() {
        this.properties.language = !this.properties.language;
        const case1 = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
            "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"
        ];
        const case0 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
            "z", "x", "c", "v", "b", "n", "m", ",", "."
        ];
        for (const key of this.elements.language) {
            if (key.childElementCount === 0) {
                key.textContent = !this.properties.language ? "en" : "рус";
            }
        }
        let self = this
        console.log(self.elements.letters);
        for (let key = 0; key < self.elements.letters.length; key++) {
            if (self.elements.letters[key].childElementCount === 0) {
                self.elements.letters[key].textContent = this.properties.language ? case1[key] : case0[key];
            }
        }

    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        //удаляем класс, который отображает клавиатуру при вызове open()
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }


};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
    /*
    Keyboard.open("dcode", function(currentValue) {
        console.log("value changed! here it is:" + currentValue);
    }, function(currentValue) {
        console.log("keyboard closed! Finishing value: " + currentValue);
    });*/
});
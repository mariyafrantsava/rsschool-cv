const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const resultBtn = document.getElementById('result');

const clearBtns = document.querySelectorAll('.clear-btn');

const display = document.getElementById('display');

const signNumBtn = document.getElementById('toNegativeNumbers');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';
//console.log(numbers);

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        // console.log(e);
        operation(e.target.textContent);
    });
}

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        // console.log(e.srcElement.id);
        // clear(e.srcElement.id);
        clear(e.target.textContent);
        //console.log(e);
        //console.log('клик по кнопке ce или с');

    });
}

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

signNumBtn.addEventListener('click', setSignNum);

function numberPress(number) {

    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        };
    };
    //console.log('клик по кнопке с номером' + number);

};

function operation(op) {
    let pow = Math.pow(10, 15);
    let localOperationMemory = display.value;

    if (op === '√x') {
        if (localOperationMemory < 0) {
            display.value = 'Error';
            return;
        }
        MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
        display.value = Math.round(MemoryCurrentNumber * pow) / pow;
        MemoryNewNumber = true;
    } else {
        if (MemoryNewNumber && MemoryPendingOperation !== '=') {
            display.value = MemoryCurrentNumber;
        } else {
            MemoryNewNumber = true;
            if (MemoryPendingOperation === '+') {
                MemoryCurrentNumber += parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '-') {
                MemoryCurrentNumber -= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '*') {
                MemoryCurrentNumber *= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '/') {
                MemoryCurrentNumber /= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '(x)*n') {
                MemoryCurrentNumber **= parseFloat(localOperationMemory);
            } else {
                MemoryCurrentNumber = parseFloat(localOperationMemory);
            };

            display.value = Math.round(MemoryCurrentNumber * pow) / pow;
            MemoryPendingOperation = op;
        };
        //console.log('клик по кнопке с операцией ' + op);
    }

};

function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
    //console.log('клик по кнопке с decimalBtn');
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
    //console.log('клик по кнопке  ' + id);
};

function setSignNum() {
    display.value *= '-1';
    //console.log(signNum);
};
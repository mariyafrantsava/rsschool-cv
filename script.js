const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const resultBtn = document.getElementById('result');

const clearBtns = document.querySelectorAll('.clear-btn');

const display = document.getElementById('display');

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
        operation(e.target.textContent);
    });
}

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        // console.log(e.srcElement.id);
        clear(e.srcElement.id);
        //console.log('клик по кнопке ce или с');
        numberPress(e.target.textContent);
    });
}

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

function numberPress(number) {
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number; //прилипание всех вводимых чисел
    }
    //console.log('клик по кнопке с номером' + number);

};

function operation(op) {
    if (MemoryNewNumber) {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryCurrentNumber = true;
    }
    console.log('клик по кнопке с операцией ' + op);
};

function clear(id) {
    console.log('клик по кнопке  ' + id);
};

function decimal() {
    console.log('клик по кнопке с decimalBtn');
};

/*function result() {
    console.log('клик по кнопке с resultBtn');
};*/






/*

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
*/
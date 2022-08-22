const button = document.querySelectorAll("button");
const display = document.getElementById("display");
let displayText = "";
let firstOperator = null;
let numberArray, first, second, result;
let decimal = false, equal = false, firstzero = false;

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function() {
        if (button[i].classList.contains("digit")) {
            digitInput(button[i].value);  
        }
        else if (button[i].classList.contains("operator")) {
            operatorInput(button[i].value);  
        }
        else if (button[i].classList.contains("ac")) {
            clear();
        }
        else if (button[i].classList.contains("decimal")) {
            if(equal == true){
                displayText = ".";
                display.innerHTML = displayText;
                equal = false;
                decimal = true;
            }
            else if (decimal == false){
                refreshDisplay(button[i].value);
                decimal = true;
            }    
        }
        else if (button[i].classList.contains("percent")) {
            if (firstOperator !== null){
                operatorInput(firstOperator);
            }
            percent(displayText);
        }
        else if (button[i].classList.contains("backspace")) {
            backspace();
        }
        else if (button[i].classList.contains("equal")) {
            equals(firstOperator);
        }
    });  
}

function refreshDisplay(value) {
    displayText += value;
    if(displayText.length > 13) {
        displayText = displayText.substring(0, 16);
    }
    display.innerHTML = displayText;
    
}

function digitInput(value) {
    if(equal == true){
        displayText = value;
        if(displayText.length > 13) {
            displayText = displayText.substring(0, 16);
        }
        display.innerHTML = displayText;
        equal = false;
    }
    else {
        refreshDisplay(value);
    }
    
}

function operatorInput(operator) {
    if (firstOperator === null) {
        firstOperator = operator;
        refreshDisplay(operator);
        decimal = false;
        equal = false;
    }
    else if (firstOperator !== null ) {
        numberArray = displayText.split(firstOperator);
        first = Number(numberArray[0]);
        second = Number(numberArray[1]);
        if (second === 0) {
            if (firstOperator === "*" || firstOperator === "÷")
                second = "1";
        }
        first = operate(first, second, firstOperator);
        firstOperator = operator;
        first = round(first, 6);
        displayText = first + firstOperator;
        display.innerHTML = displayText;
        decimal = false;
    }
}

function equals(operator) {
    if (firstOperator !== null) {
        numberArray = displayText.split(firstOperator);
        first = Number(numberArray[0]);
        second = Number(numberArray[1]);
        first = operate(first, second, firstOperator);
        firstOperator = operator;
        if(first !== "Yeah Nah") {
            displayText = round(first, 6);
            display.innerHTML = displayText;
            decimal = false;
            firstOperator = null;
            equal =  true;
        }
        else {
            displayText = first;
            display.innerHTML = displayText;
            decimal = false;
            firstOperator = null;
            equal =  true;
        }
            
    }
}

function operate(first, second, operator){
    if (operator === '+') {
        return first + second;
    }
    else if (operator === '-') {
        return first - second;
    }
    else if (operator === '*') {
        return first * second;
    }
    else if (operator === '÷') {
        if (second === 0) {
            return 'Yeah Nah';
        }
        else {
            return first / second;
        }
    }
}

function percent (number) {
    if (firstOperator == null) {
    displayText = (number/100).toString();
    display.innerHTML = displayText;
    equal = true;
    }
    else {
        first = (first/100);
        displayText = round(first, 6);
        display.innerHTML = displayText;
        equal = true;
    }
}

function clear() {
    display.innerHTML = "0";
    firstOperator = null;
    displayText = "";
    decimal = false;
}

function backspace() {
    let deleted = displayText.slice(-1);
    if (deleted === ".")
        decimal = false;
    if (firstOperator === deleted)
        firstOperator = null;
    displayText = displayText.slice(0, -1);
    if (displayText.length < 1)
        displayText = "0";
    display.innerHTML = displayText;
    
}

function round(value, precision) {
    if (Number.isInteger(precision)) {
      var shift = Math.pow(10, precision);
      return (Math.round( value * shift + 0.00000000000001 ) / shift);
    } else {
      return Math.round(value);
    }
  } 
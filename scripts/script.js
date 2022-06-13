const button = document.querySelectorAll("button");
const display = document.getElementById("display");
let displaytext = "";
let firstOperator = null;
let numberArray, first, second, result;
let decimal = false, equal = false;

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
                displaytext = ".";
                display.innerHTML = displaytext;
                equal = false;
                decimal = true;
            }
            else if (decimal == false){
                refreshdisplay(button[i].value);
                decimal = true;
            }    
        }
        else if (button[i].classList.contains("percent")) {
            if (firstOperator !== null){
                operatorInput(firstOperator);
            }
            percent(displaytext);
        }
        else if (button[i].classList.contains("backspace")) {
            backspace();
        }
        else if (button[i].classList.contains("equal")) {
            equals(firstOperator);
        }
    });  
}

function refreshdisplay(value) {
    displaytext += value;
    if(displaytext.length > 13) {
        displaytext = displaytext.substring(0, 16);
    }
    display.innerHTML = displaytext;
}

function digitInput(value) {
    if(equal == true){
        displaytext = value;
        if(displaytext.length > 13) {
            displaytext = displaytext.substring(0, 16);
        }
        display.innerHTML = displaytext;
        equal = false;
    }
    else{
        refreshdisplay(value);
    }
}

function operatorInput(operator) {
    if (firstOperator === null) {
        firstOperator = operator;
        refreshdisplay(operator);
        decimal = false;
        equal = false;
    }
    else if (firstOperator !== null ){
        numberArray = displaytext.split(firstOperator);
        first = Number(numberArray[0]);
        second = Number(numberArray[1]);
        if (second === 0) {
            if (firstOperator === "*" || firstOperator === "÷")
                second = "1";
        }
        first = operate(first, second, firstOperator);
        firstOperator = operator;
        first = round(first, 5);
        displaytext = first + firstOperator;
        display.innerHTML = displaytext;
        decimal = false;
    }
}

function equals(operator) {
    if (firstOperator !== null) {
        numberArray = displaytext.split(firstOperator);
        first = Number(numberArray[0]);
        second = Number(numberArray[1]);
        first = operate(first, second, firstOperator);
        firstOperator = operator;
        displaytext = round(first, 5);
        display.innerHTML = displaytext;
        decimal = false;
        firstOperator = null;
        equal =  true;
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
    displaytext = (number/100).toString();
    display.innerHTML = displaytext;
    equal = true;
    }
    else {
        first = (first/100);
        displaytext = round(first, 5);
        display.innerHTML = displaytext;
        equal = true;
    }
}

function clear() {
    display.innerHTML = "0";
    firstOperator = null;
    displaytext = "";
    decimal = false;
}

function backspace() {
    let deleted = displaytext.slice(-1);
    if (deleted === ".")
        decimal = false;
    if (firstOperator === deleted)
        firstOperator = null;
    displaytext = displaytext.slice(0, -1);
    if (displaytext.length < 1)
        displaytext = "0";
    display.innerHTML = displaytext;
    
}

function round(value, precision) {
    if (Number.isInteger(precision)) {
      var shift = Math.pow(10, precision);
      return (Math.round( value * shift + 0.00000000000001 ) / shift);
    } else {
      return Math.round(value);
    }
  } 
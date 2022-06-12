const button = document.querySelectorAll("button");
const display = document.getElementById("display");
let displaytext = "";
let totalnumber = 0;
let firstnum = null;
let secondnum = null;
let lastnum = null;
let firstOperator = null;
let secondOperator = null;
let numberArray, first, second, result, decimal = false, equal = false;
for(let i = 0; i < button.length; i++){
    button[i].addEventListener("click", function() {
        if(button[i].classList.contains("digit")){
            console.log(button[i].value);
            digitInput(button[i].value);  
            
        }
        else if(button[i].classList.contains("operator")){
            console.log(button[i].value);
            operatorInput(button[i].value);
            
        }
        else if(button[i].classList.contains("ac")){
            console.log(button[i].value);
            clear();
        }
        else if(button[i].classList.contains("decimal")){
            console.log(button[i].value);
            if(equal == true){
                displaytext = ".";
                display.innerHTML = displaytext;
                equal = false;
                decimal = true;
            }
            
            else if(decimal == false){
                refreshdisplay(button[i].value);
                decimal = true;
            }    
            
        }
        else if(button[i].classList.contains("percent")){
            console.log(button[i].value);
            percent(displaytext);
        }
        else if(button[i].classList.contains("backspace")){
            console.log(button[i].value);
            backspace();
        }
        
        else if(button[i].classList.contains("equal")){
            console.log(button[i].value);
            equals(firstOperator);
        }
    });   
}

function refreshdisplay(value){
    displaytext += value;
    display.innerHTML = displaytext;
}

function digitInput(value){
    if(equal == true){
        displaytext = value;
        display.innerHTML = displaytext;
        equal = false;
    }
    else{
        refreshdisplay(value);
    }
}

function operatorInput(operator){
    if(firstOperator === null){
        console.log("null operator");
        firstOperator = operator;
        refreshdisplay(operator);
        decimal = false;
        equal = false;
    }
    else if (firstOperator !== null){
        numberArray = displaytext.split(firstOperator);
        first = Number(numberArray[0]);
        second = Number(numberArray[1]);
        first = operate(first, second, firstOperator);
        firstOperator = operator;
        console.log(first);
        console.log("test");
        displaytext = first + firstOperator;
        display.innerHTML = displaytext;
        decimal = false;
    }
}

function equals(operator){
    if(firstOperator !== null){
        numberArray = displaytext.split(firstOperator);
        first = Number(numberArray[0]);
        second = Number(numberArray[1]);
        first = operate(first, second, firstOperator);
        firstOperator = operator;
        console.log(first);
        displaytext = first;
        display.innerHTML = displaytext;
        decimal = false;
        firstOperator = null;
        equal =  true;
    }
}

function operate(first, second, operator){
    if(operator === '+') {
        return first + second;
    }
    else if(operator === '-') {
        return first - second;
    }
    else if(operator === '*') {
        return first * second;
    }
    else if(operator === '÷') {
        if(second === 0) {
            return 'Yeah Nah';
        }
        else {
            return first / second;
        }
    }
}

function percent(number){
    if(firstOperator == null){
    displaytext = (number/100).toString();
    display.innerHTML = displaytext;
    equal = true;
    }
    else{
        first = (first/100).toString();
        display.innerHTML = first;
        equal = true;
    }
}

function clear(){
    display.innerHTML = "0";
    firstnum = null;
    totalnumber = 0;
    firstnum = null;
    secondnum = null;
    lastnum = null;
    firstOperator = null;
    secondOperator = null;
    displaytext = "";
    decimal = false;
}

function backspace(){
    displaytext = displaytext.slice(0, -1);
    display.innerHTML = displaytext;
    if(firstOperator !== null)
        firstOperator = null;
}


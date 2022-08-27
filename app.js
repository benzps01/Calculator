const ipscreen = document.getElementById('input')
const opscreen = document.getElementById('output')

const postFix = new Array()
const auxStack = new Array()
const expArray = new Array()

const precedence = {
    "/": 4,
    "*": 4,
    "+": 3,
    "-": 3
}

let operatorString = '+-/*'

let exp = ''
let newVal = ''


function reset() {
    convert_to_postfix()
    ipscreen.textContent = postFix
}

function display(value){
    if(value == '/' || value == '*' || value == '+' || value == '-'){
        exp += ' ' + value + ' '
        opscreen.textContent = exp
    }
    else{
        exp += value
        opscreen.textContent = exp
    }
}

function expToArray(){
    const newExp = exp.split(' ').join('')
    for (let s = 0;s < newExp.length;s++){
        if (!(operatorString.includes(newExp[s]))){
            newVal += newExp[s]
        }
        else{
            expArray.push(newVal);
            expArray.push(newExp[s]);
            newVal = '';
        }
    }
    expArray.push(newVal)
}


function convert_to_postfix(){
    expToArray()
    for (let s = 0;s < expArray.length;s++){
        if (!(operatorString.includes(expArray[s]))){
            postFix.push(parseInt(expArray[s]));
        }
        else{
            if (auxStack.length == 0){
                auxStack.push(expArray[s]);
            }
            else{
                checkPrecedence(expArray[s]);
            }
        }
    }
    while(auxStack.length != 0){
        postFix.push(auxStack.pop())
    }
    console.log(postFix)
}

function checkPrecedence(op){
    if (precedence[op] > precedence[auxStack[auxStack.length-1]]){
        auxStack.push(op)
    }
    else if(precedence[op] < precedence[auxStack[auxStack.length-1]]){
        postFix.push(auxStack.pop())
        checkPrecedence(op)
    }
    else if(precedence[op] == precedence[auxStack[auxStack.length-1]]){
        postFix.push(auxStack.pop())
        auxStack.push(op)
    }    
}

function evaluatePostfix() {
    
}
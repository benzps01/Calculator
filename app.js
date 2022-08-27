const ipscreen = document.getElementById('input')
const opscreen = document.getElementById('output')

var postFix = new Array()
var auxStack = new Array()
var expArray = new Array()
var evaluate = new Array()

const precedence = {
    "/": 4,
    "*": 4,
    "+": 3,
    "-": 3
}

let operatorString = '+-/*'

let exp = ''
let newVal = ''


function calculateValue() {
    if(evaluate.length != 0){

        let val = evaluate.pop()
        evaluatePostfix()
        val += evaluate[evaluate.length-1]
        evaluate[0] = val
        ipscreen.textContent = evaluate
    }
    else{
    convert_to_postfix()
    ipscreen.textContent = evaluate
    }
}

function reset() {
    exp = ''
    newVal = ''
    postFix = []
    expArray = []
    evaluate = []
    ipscreen.innerText = ''
    opscreen.textContent = ''
}

function display(value){
    if(exp.length != 0){
        evaluate = []
        postFix = []
        expArray = []
        if(value == '/' || value == '*' || value == '+' || value == '-'){
            exp += ' ' + value + ' '
            opscreen.textContent = exp
        }
        else{
            exp += value
            opscreen.textContent = exp
        }
    console.log('New Exp: ',exp)
    }
    else if(value == '/' || value == '*' || value == '+' || value == '-'){
        exp += ' ' + value + ' '
        opscreen.textContent = exp
    }
    else{
        exp += value
        opscreen.textContent = exp
    }
    console.log('New Exp: ',exp)
}

function expToArray(){
    const newExp = exp.split(' ').join('')
    console.log('Lets see the nex Exp',newExp)
    newVal = ''
    for (let s = 0;s < newExp.length;s++){
        console.log(newExp)
        console.log(newVal)
        if (!(operatorString.includes(newExp[s]))){
            newVal += newExp[s]
        }
        else{
            console.log(expArray)
            expArray.push(newVal);
            expArray.push(newExp[s]);
            newVal = '';
        }
    }
    expArray.push(newVal)
    console.log(expArray)
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
    while(auxStack.length !== 0){
        postFix.push(auxStack.pop())
    }
    console.log(postFix)
    evaluatePostfix()
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
    else if(auxStack.length == 0){
        auxStack.push(op)
    }
}

function evaluatePostfix() {
    for(s in postFix){
        console.log('Lets see this postfix',postFix)
        console.log('Lets see this evaluate',evaluate)
        if(!(operatorString.includes(postFix[s]))){
            evaluate.push(postFix[s])
        }
        else{
            if(postFix[s] == '+'){
                let val2 = evaluate.pop()
                let val1 = evaluate.pop()
                let c = val1 + val2
                evaluate.push(c)
            }
            else if(postFix[s] == '-'){
                let val2 = evaluate.pop()
                let val1 = evaluate.pop()
                console.log(val1,val2)
                let c = val1 - val2
                console.log(c)
                evaluate.push(c)
            }
            else if(postFix[s] == '*'){
                let val2 = evaluate.pop()
                let val1 = evaluate.pop()
                let c = val1 * val2
                evaluate.push(c)
            }
            else if(postFix[s] == '/'){
                let val2 = evaluate.pop()
                let val1 = evaluate.pop()
                let c = val1 / val2
                evaluate.push(c)
            }
        }
    }
    console.log('New Value',evaluate)
}
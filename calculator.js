function addition(a,b){
return a+b;
}


function subtraction(a,b){
    return a-b;
}

function multiplication(a,b){
    return a*b;
}

function division(a,b){
    return a / b;
}


function operate(a,b){
    division(a,b);
}
console.log(addition(1,2));
console.log(subtraction(2,3));
console.log(multiplication(5,5));
console.log(division(1,3));
console.log(operate(1,2));






class Calculator {
    constructor(previousPartTextElement, currentPartTextElement) {
        this.previousPartTextElement = previousPartTextElement
        this.currentPartTextElement = currentPartTextElement
        this.clear()
    }

    clear() {
this.currentPart = '';
this.previousPart = '';
this.operation = undefined;
    }

    delete() {
        this.currentPart = this.currentPart.toString().slice(0,-1);

    }

    appendNumbers(number) {
        if (number === '.' && this.currentPart.includes('.')) return
        this.currentPart = this.currentPart.toString() + number.toString()
        
    }

    chooseOperation(operation) {
        if (this.currentPart === '') return
        if (this.previousPart !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousPart = this.currentPart
        this.currentPart = ''
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousPart);
        const current = parseFloat(this.currentPart);
        if (isNaN(prev)|| isNaN(current)) return;
        switch (this.operation) {
            case '+': 
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            default: 
                return
        }
        this.currentPart = computation;
        this.operation = undefined;
        this.previousPart = '';
    }

    updateDisplay() {
        this.currentPartTextElement.innerText = this.currentPart
        if(this.operation != null){
            
        }
        this.previousPartTextElement.innerText = this.previousPart
        
 
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousPartTextElement = document.querySelector('[data-previous-part]');
const currentPartTextElement = document.querySelector('[data-current-part]');

const calculator = new Calculator(previousPartTextElement,currentPartTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumbers(button.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

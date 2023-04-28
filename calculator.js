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

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 })
        }
        if (decimalDigits !=null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }

    }

    updateDisplay() {
        this.currentPartTextElement.innerText = this.getDisplayNumber(this.currentPart)
        if(this.operation != null){
            this.previousPartTextElement.innerText = `${this.getDisplayNumber(this.previousPart)} ${this.operation}`
        } else {
            this.previousPartTextElement.innerText = '';
        }
        
 
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

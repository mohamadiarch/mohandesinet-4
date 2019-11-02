



class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
      }
      
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }


    appendNumber(number) {
        if (number === '') 
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '')
            this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        let prev =  parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) 
                    return;
                else
                    computation = prev / current;
                break;
            default:
                return;    
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined; 
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =this.currentOperand;
        if (this.operation != null)
            this.previousOperandTextElement.innerText = this.previousOperand + ' ' + this.operation;
        else
            this.previousOperandTextElement.innerText = '';    
    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', function() {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })

  equalsButton.addEventListener('click', () => {
      console.log('equals');
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});


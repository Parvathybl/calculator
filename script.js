document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const expandBtn=document.querySelector('.expand');
    const trigBtns=document.querySelectorAll('.trig');
    trigBtns.forEach(btn => btn.style.display='none');
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';
    let shouldResetDisplay = false;
    let isExpanded=false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value') || '';

            console.log(value);

            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                if (firstValue && operator && currentInput) {
                    secondValue = currentInput;
                    const result = calculate(firstValue, secondValue, operator);
                    display.textContent = result;
                    firstValue = result;
                    secondValue = '';
                    operator = '';
                    currentInput = '';
                    shouldResetDisplay = true;
                }
            } else if (value === 'back') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (button.classList.contains('operator')) {
                if (currentInput === '' && display.textContent !== '0') {
                    operator = value;
                    firstValue = display.textContent;
                    display.textContent += ` ${operator} `;
                } else if (currentInput !== '') {
                    if (firstValue === '') {
                        firstValue = currentInput;
                    } else {
                        secondValue = currentInput;
                        const result = calculate(firstValue, secondValue, operator);
                        display.textContent = result;
                        firstValue = result;
                        secondValue = '';
                    }
                    operator = value;
                    display.textContent += ` ${operator} `;
                    currentInput = '';
                    shouldResetDisplay = true;
                } 
            }else if (button.classList.contains('trig')){
                    handleTrigOperation(value);
            } else if (value === 'expand') {
                toggleExpandMode();
            
                
            } else {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                if (value === '.' && currentInput.includes('.')) return;
                if (value === '.' && currentInput === '') {
                    currentInput = '0';
                }
                currentInput += value;
                display.textContent =currentInput; 
            }
        });
    });

    function resetCalculator() {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        display.textContent = '0';
        shouldResetDisplay = false;
    }

    function calculate(a, b, operator) {
        let result = 0;
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    result = 'Error'; 
                } else {
                    result = a / b;
                }
                break;
        }
        return result.toString();
    }
    function toggleExpandMode() {
        isExpanded= !isExpanded;

        trigBtns.forEach(btn => {
            btn.style.display =isExpanded ? 'inline-block' : 'none';
        });

        expandBtn.textContent = isExpanded ? 'Collapse' : 'Expand';

        console.log('Expand button clicked: ', isExpanded);
        
    }
    function handleTrigOperation(operation) {
        if (currentInput === '') {
            display.textContent = 'Error';
            return;
        }

        let value=parseFloat(currentInput);
        let result;
        const radians=value*(Math.PI/180);

        switch(operation){
            case 'sin':
                result=Math.sin(radians).toFixed(4);
                break;
            case 'cos':
                result=Math.cos(radians).toFixed(4);
                break;
            case 'tan':
                result=Math.tan(radians).toFixed(4);
                break;

            default:
                result='Error';
                break;
        }

        display.textContent=result;
        currentInput=result.toString();
        shouldResetDisplay=true;
    }
});



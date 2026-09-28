let currentInput = '0';
let previousInput = '';
let operator = null;

const display = document.getElementById('display');
const previousOpDisplay = document.getElementById('previous-op');

function updateDisplay() {
    display.textContent = currentInput;
    if (operator && previousInput !== '') {
        previousOpDisplay.textContent = `${previousInput} ${operator}`;
    } else {
        previousOpDisplay.textContent = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;

    if (currentInput === '' && previousInput !== '') {
        operator = op;
        updateDisplay();
        return;
    }

    if (previousInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '' || !operator) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('0으로 나눌 수 없습니다.');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // 소수점 오차 정제 (최대 소수점 8자리)
    result = Math.round(result * 100000000) / 100000000;

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// 키보드 입력을 위한 이벤트 리스너 추가
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '+') appendOperator('+');
    if (event.key === '-') appendOperator('-');
    if (event.key === '*') appendOperator('×');
    if (event.key === '/') {
        event.preventDefault();
        appendOperator('÷');
    }
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') clearDisplay();
    if (event.key === 'Backspace') {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }
});
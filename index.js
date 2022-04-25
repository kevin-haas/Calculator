function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(method, a, b) {
    switch(method) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': {
            if (b == 0) {
                wipe();
                return 'Divide by Zero: Apocalyptic Event Started';
            }
            return divide(a, b);
        }
    }
}

function populate(x) {
    document.querySelector('.display').textContent += x;
}

function wipe() {
    document.querySelector('.display').textContent = '';
}

function eval() {
    let expression = document.querySelector('.display').textContent;
    if (expression.includes('*') && expression.includes('/')) {
        if (expression.indexOf('*') < expression.indexOf('/')) {
            let temp = beforeAndAfter('*')
            let ans = operate('*', temp[0], temp[1]);
            document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
            eval();
        }
        else {
            let temp = beforeAndAfter('/')
            let ans = operate('/', temp[0], temp[1]);
            document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
            eval();
        }
    }
    else if (expression.includes('*')) {
        let temp = beforeAndAfter('*')
        let ans = operate('*', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        eval();
    }
    else if (expression.includes('/')) {
        let temp = beforeAndAfter('/')
        let ans = operate('/', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        eval();
    }
    else if (expression.includes('+')) {
        let temp = beforeAndAfter('+')
        let ans = operate('+', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        eval();
    }
    else if (expression.includes('-')) {
        let temp = beforeAndAfter('-')
        let ans = operate('-', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        eval();
    }
}

function beforeAndAfter (operator) {
    let expression = document.querySelector('.display').textContent;
    let b = expression.indexOf(operator);
    let a = b;
    while (!isNaN(expression[a - 1]) || expression[a - 1] == '.') {
        a--;
    }
    let c = b;
    while (!isNaN(expression[c + 1]) || expression[c + 1] == '.') {
        c++;
    }
    return [Number(expression.slice(a, b)), Number(expression.slice(b + 1, c + 1)), a, c];
}

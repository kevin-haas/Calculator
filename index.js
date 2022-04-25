function operate(method, a, b) {
    switch(method) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': {
            if (b == 0) {
                wipe();
                return 'Divide by Zero: Apocalyptic Event Started';
            }
            return a / b;
        }
    }
}

function populate(x) {
    document.querySelector('.display').textContent += x;
}

function wipe() {
    document.querySelector('.display').textContent = '';
}

// evaluates the expression in the display one operation at a time according to order of operations
function solve() {
    let expression = document.querySelector('.display').textContent;

    if (expression.includes('--')) {
        expression = document.querySelector('.display').textContent.replace("--", "+", 1);
        document.querySelector('.display').textContent = expression;
        solve();
    }

    else if (expression.includes('++')) {
        expression = document.querySelector('.display').textContent.replace("++", "+", 1);
        document.querySelector('.display').textContent = expression;
        solve();
    }

    else if (expression.includes('*') && expression.includes('/')) {
        if (expression.indexOf('*') < expression.indexOf('/')) {
            let temp = beforeAndAfter('*')
            let ans = operate('*', temp[0], temp[1]);
            document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
            solve();
        }
        else {
            let temp = beforeAndAfter('/')
            let ans = operate('/', temp[0], temp[1]);
            document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
            solve();
        }
    }
    else if (expression.includes('*')) {
        let temp = beforeAndAfter('*')
        let ans = operate('*', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        solve();
    }
    else if (expression.includes('/')) {
        let temp = beforeAndAfter('/')
        let ans = operate('/', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        solve();
    }
    else if (expression.includes('+')) {
        let temp = beforeAndAfter('+')
        if (expression[temp[2] - 1] == '-' && isNaN(expression[temp[2] - 2])) temp[0] = -temp[0];
        let ans = operate('+', temp[0], temp[1]);
        document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
        solve();
    }
    else if (expression.includes('-')) {
        if (isNaN(expression[expression.indexOf('-') - 1])) {
            expression = document.querySelector('.display').textContent.replace("-", "", 1);
            document.querySelector('.display').textContent = expression;
            if (expression.includes('-')) {
                    let temp = beforeAndAfter('-');
                    let ans = operate('-', - temp[0], temp[1]);
                    document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
                    solve();
            }
            else {
                document.querySelector('.display').textContent = '-' + document.querySelector('.display').textContent;
            }
        }
        else {
            let temp = beforeAndAfter('-');
            let ans = operate('-', temp[0], temp[1]);
            document.querySelector('.display').textContent = expression.slice(0, temp[2]) + ans + expression.slice(temp[3] + 1);
            solve();
        }
    }
}

// returns the number before and after the operator as well as the index for the start and end of the single operator expression
function beforeAndAfter (operator) {
    let expression = document.querySelector('.display').textContent;
    let b = expression.indexOf(operator);
    let a = b;
    while (!isNaN(expression[a - 1]) || expression[a - 1] == '.') {
        a--;
    }
    let c = b;
    if (expression[c + 1] == '-' || expression[c + 1] == '+') c++;
    while (!isNaN(expression[c + 1]) || expression[c + 1] == '.') {
        c++;
    }
    return [Number(expression.slice(a, b)), Number(expression.slice(b + 1, c + 1)), a, c];
}   

function back() {
    let expression = document.querySelector('.display').textContent;
    document.querySelector('.display').textContent = expression.slice(0, expression.length - 1);
}
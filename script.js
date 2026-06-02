console.log('Page fully loaded');

window.onload = function(){
    let first = ''
    let second = ''
    let expressionResult = ''
    let selectedOperation = null
    const outputElement = document.getElementById("result")
    const root = document.documentElement;
    const path = window.location.pathname;
    const element = this.document.querySelector('#left_name')

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
        function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !first.includes(digit))) {
                if (first.length < 15) {
                    first += digit;
                }
            }
            if (first == '.'){
                first = '0.'
            }
            outputElement.innerHTML = first;
        }
        else {
            if ((digit != '.') || (digit == '.' && !second.includes(digit))) {
                if (second.length < 15) {
                    second += digit;
                }
            } 
            if (second == '.'){
                second = '0.'
            }
            outputElement.innerHTML = second;
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (first === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (first === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (first === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (first === '') return;
        selectedOperation = '/';
    }
        document.getElementById("btn_op_percent").onclick = function() {
        if (first === '') return;
        selectedOperation = '%';
    }
    document.getElementById("btn_op_clear").onclick = function() {
        first = ''
        second = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_equal").onclick = function() {
        if (first === '' || second === '' || !selectedOperation)
            return

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+first) * (+second)
                break;
            case '+':
                expressionResult = (+first) + (+second)
                break;
            case '-':
                expressionResult = (+first) - (+second)
                break;
            case '/':
                expressionResult = (+first) / (+second)
                if (second == 0) {
                    outputElement.innerHTML = expressionResult.toString()
                    first = ''
                    second = ''
                    selectedOperation = null
                }
                break;
            default:
                break;
        }
        if (second != ''){
            first = expressionResult.toString()
            second = ''
            selectedOperation = null
            outputElement.innerHTML = first
        }
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if(!selectedOperation && first != '0' && first != '') {
            if(first[0] === '-') {
                first = first.slice(1);
                outputElement.innerHTML = first;
            }
            else {
                first = '-' + first;
                outputElement.innerHTML = first;
            }
        }
        else if(second != '0' && second != '') {
            if(second[0] === '-') {
                second = second.slice(1);
                outputElement.innerHTML = second;
            } else {
                second = '-' + second;
                outputElement.innerHTML = second;
            }
        }

    document.getElementById("btn_op_percent").onclick = function() {
        outputElement.innerHTML = ((+first)/100);
    }

}
};

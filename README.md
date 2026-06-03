# ЛР2. Calculator. JavaScript

Шевчук Диана ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Основные принцыпы работы](#Основные-принцыпы-работы)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** данной лабораторной работы — знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS, JavaScript.

В ходе выполнения работы, вам предстоит продолжить реализовывать простой калькулятор, и затем выполнить задания по варианту.

## **Тема:** Производство лекарств из готовых веществ.

## **Сайт** для вдохновения: https://endopharm.ru/

## **Основные принцыпы работы** 

При нажатии на цифру → добавляем её к a или b в зависимости от того, выбрана ли операция.
При нажатии на операцию → запоминаем selectedOperation.
При нажатии = → выполняем операцию над числами (преобразуем в Number), результат кладём в a, обнуляем b.
При нажатии C → сбрасываем все переменные, выводим 0.

## **Дополнительные задания**

1. исправление ошибки с нажатием на '.' (при нажатии точки без числа, на эккране калькулятора отображалось("." а не "0.")

```script.js
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
```

2. исправление деления на 0

```script.js
case '/':
expressionResult = (+first) / (+second)
if (second == 0) {
    outputElement.innerHTML = expressionResult.toString()
    first = ''
    second = ''
    selectedOperation = null
}
break;
```


## План выполнения работы
1. Программирование логики с помощью JavaScript
2. Доступ к HTML-элементам из JavaScript
3. Программирование кнопок калькулятора
4. Запуск калькулятора с помощью LiveServer
5. Задание

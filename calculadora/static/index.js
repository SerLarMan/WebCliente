'use strict'

/**
 * Clase calculadora
 */
class Calculator {
  operator = ''
  bufferResult = ''

  // Método que suma dos operandos
  add (operando1, operando2) {
    return operando1 + operando2
  }

  // Método que resta dos operandos
  subtract (operando1, operando2) {
    return operando1 - operando2
  }

  // Método que multiplica dos operandos
  multiplication (operando1, operando2) {
    return operando1 * operando2
  }

  // Método que divide dos operandos
  division (operando1, operando2) {
    return operando1 / operando2
  }
}

/**
 * Función que crea la base de la calculadora
 */
function createCalculatorBase () {
  // Se crea una sección en el body
  document.body.append(document.createElement('section'))

  // Se crea el título de la sección
  const title = document.createElement('h2')
  title.textContent = 'Calculadora'

  // Se crea el div contenedor
  const container = document.createElement('div')
  container.setAttribute('id', 'grid')

  // Se maneja el evento onclick en el grid
  container.onclick = function (event) {
    const target = event.target
    const operators = ['+', '-', '*', '/', '=']

    if (target.tagName === 'BUTTON') {
      if (operators.includes(target.textContent)) {
        operatorButton(target)
      } else if (target.textContent === 'C') {
        deleteButton()
      } else if (target.textContent === 'R') {
        getSessionStorage()
      } else {
        numericButton(target)
      }
    }
  }

  // Se añade el título y el container al section
  document.querySelector('section').append(title)
  document.querySelector('section').append(container)
}

/**
 * Función que añade el contenido de la calculadora
 */
function createCalculatorContent () {
  // Se crea el div que mostrará el resultado
  const result = document.createElement('div')
  result.textContent = '0'
  result.classList.add('screen')
  document.body.querySelector('#grid').append(result)

  // Se añaden los botones al documento
  for (const button of createButtons()) {
    document.body.querySelector('#grid').append(button)
  }
}

/**
 * Función que crea un array con todos los botones
 * @returns
*/
function createButtons () {
  // Array que contiene el texto de los botones
  const buttonsText = ['R', '+', '7', '8', '9', '-', '4', '5', '6', '*', '1', '2', '3', '/', '0', '.', 'C', '=']

  // Se crea el array que contendrá los botones de la calculadora
  const buttons = []

  // Se añaden los botones al array
  for (let i = 0; i < 18; i++) {
    buttons.push(createButton(buttonsText[i]))
  }

  return buttons
}

/**
 * Función que crea un button con un texto dado
 * @param {*} buttonText
 * @returns
 */
function createButton (buttonText) {
  // Array que contiene los operandos
  const operators = ['+', '-', '*', '/', '=']

  const button = document.createElement('button')
  button.textContent = buttonText
  if (operators.includes(buttonText)) {
    button.classList.add('operator')

    button.addEventListener('mousedown', () => {
      button.style.backgroundColor = '#C67104'
    })

    button.addEventListener('mouseup', () => {
      button.style.backgroundColor = 'orange'
    })
  } else {
    button.addEventListener('mousedown', () => {
      button.style.backgroundColor = '#4D4D4D'
    })

    button.addEventListener('mouseup', () => {
      button.style.backgroundColor = 'grey'
    })
  }

  return button
}

/**
 * Función que recupera la última operación realizada y la muestra
 */
function getSessionStorage () {
  const screen = document.querySelector('.screen')
  screen.textContent = window.sessionStorage.getItem('R')
}

/**
 * <función que limpia números de la calculadora
 */
function deleteButton () {
  const screen = document.querySelector('.screen')
  screen.textContent = '0'
  calculator.operator = ''
  calculator.bufferResult = ''
}

/**
 * Función que escribe números en la calculadora
 * @param {*} target
*/
function numericButton (target) {
  const screen = document.querySelector('.screen')

  // Se comprueba si el número en la pantalla es diferente de cero o se ha pulsado un operación para añadir un número nuevo
  if (screen.textContent !== '0') {
    // Se comprueba si la pantalla ya contiene una coma para no escribir más de una
    if (target.textContent === '.' && !screen.textContent.includes('.')) {
      screen.textContent = screen.textContent + '.'
    } else if (target.textContent !== '.') {
      screen.textContent = screen.textContent + target.textContent
    }
    // Si el número en la pantalla sale un cero simplemente se sustituirá por el nuevo número
  } else {
    if (target.textContent === '.') {
      screen.textContent = '0.'
    } else {
      screen.textContent = target.textContent
    }
  }
}

/**
 * Función que dependiendo del botón de operación pulsado ejecuta una accion
 * @param {*} target
*/
function operatorButton (target) {
  const screen = document.querySelector('.screen')

  // Si el botón pulsado es el igual se hará la operación almacenada en la calculadora
  if (target.textContent === '=') {
    switch (calculator.operator) {
      case '+':
        screen.textContent = calculator.add(Number(calculator.bufferResult), Number(screen.textContent))
        break
      case '-':
        screen.textContent = calculator.subtract(Number(calculator.bufferResult), Number(screen.textContent))
        break
      case '*':
        screen.textContent = calculator.multiplication(Number(calculator.bufferResult), Number(screen.textContent))
        break
      case '/':
        // Se comprueba si se divide entre 0 para que de error
        if (screen.textContent === '0') {
          screen.textContent = 'Error'
        } else {
          screen.textContent = calculator.division(Number(calculator.bufferResult), Number(screen.textContent))
        }
        break
    }
    calculator.operator = ''
    calculator.bufferResult = screen.textContent
    window.sessionStorage.setItem('R', screen.textContent)

    // Si se pulsa otra operación que no sea igual se guarda la operación en la calculadora y el número actual
  } else {
    calculator.bufferResult = screen.textContent
    calculator.operator = target.textContent
    screen.textContent = '0'
  }
}

// Instancia de la clase calculadora
const calculator = new Calculator()

createCalculatorBase()
createCalculatorContent()

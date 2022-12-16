'use strict'

// Declaración del objeto calculadora
const calculadora = {
  // Propiedad que almacena el último resultado de la calculadora
  lastResult: 0,

  // Método que suma dos operandos
  suma (operando1, operando2) {
    this.lastResult = operando1 + operando2
    return operando1 + operando2
  },

  // Método que resta dos operandos
  resta (operando1, operando2) {
    this.lastResult = operando1 - operando2
    return operando1 - operando2
  },

  // Método que multiplica dos operandos
  multiplicacion (operando1, operando2) {
    this.lastResult = operando1 * operando2
    return operando1 * operando2
  },

  // Método que divide dos operandos
  division (operando1, operando2) {
    this.lastResult = operando1 / operando2
    return operando1 / operando2
  }
}

// Función que pide un operador al usuario y lo devuelve
function pedirOperador () {
  let operador

  // Bucle que pide un operador y si no es correcto lo vuelve a pedir
  do {
    operador = window.prompt('Introduce el operador de la operación que quieres realizar. (+, -, * ó /)')
    if (operador == null) {
      break
    }
    if (!comprobarOperador(operador)) {
      window.alert('El operador introducido es incorrecto. Debe ser (+, -, * ó /)')
    }
  } while (!comprobarOperador(operador))

  return operador
}

// Función que comprueba si el operador que el usuario ha introducido es válido o no
function comprobarOperador (operador) {
  const operadores = ['+', '-', '*', '/']

  if (operador) {
    operador = operador.trim()
    return operadores.includes(operador)
  }
  return false
}

// Función que determina el primer operando de un string
function pedirPrimerOperando (operandos) {
  let operando
  if (operandos) {
    operando = operandos.substring(0, operandos.indexOf(' ')).trim()

    // Se comprueba si el número es nuevo o si desea el que ya está almacenado
    if (operando === 'R') {
      return calculadora.lastResult
    } else if (isFinite(Number(operando))) {
      return Number(operando)
    }
    return -1
  }
  return -1
}

// Función que determina el segundo operando de un string
function pedirSegundoOperando (operandos) {
  let operando
  if (operandos) {
    operando = operandos.substring(operandos.indexOf(' ')).trim()

    // Se comprueba si el número es nuevo o si desea el que ya está almacenado
    if (operando === 'R') {
      return calculadora.lastResult
    } else if (isFinite(Number(operando))) {
      return Number(operando)
    }
    return -1
  }
  return -1
}

// Función que muestra por pantalla el resultado de la operación seleccionada por el usuario
function mostrarResultado (operador, operando1, operando2) {
  // Dependiendo del operador seleccionado se hace una operación distinta
  switch (operador) {
    case '+':
      window.alert(`El resultado ${calculadora.suma(operando1, operando2)}`)
      break
    case '-':
      window.alert(`El resultado ${calculadora.resta(operando1, operando2)}`)
      break
    case '/':
      // Se comprueba que no se pueda dividir entre 0
      if (operando2 === 0) {
        window.alert('Lo siento no se puede dividir ningún número entre 0')
      } else {
        window.alert(`El resultado ${calculadora.division(operando1, operando2)}`)
      }
      break
    case '*':
      window.alert(`El resultado ${calculadora.multiplicacion(operando1, operando2)}`)
  }
}

let repetir

// Bucle principal de la ejecución
do {
  window.alert('Bienvenido a la calculadora')

  // Se pide el operador al usuario
  const operador = pedirOperador()

  // Si el usuario le da a escapa o a cancelar saldrá del bucle totalmente
  if (operador == null) {
    break
  }

  let operandos
  let operando1
  let operando2

  // Bucle que pide los operandos y si no son correctos los vuelve a pedir
  do {
    // Se piden los operandos al usuario
    operandos = window.prompt('Introduce los operandos separados por un espacio')

    // Si el usuario le da a escapa o a cancelar saldrá del bucle totalmente
    if (operandos == null) {
      break
    }

    // Se separa el string de operandos en dos operandos diferentes
    operando1 = pedirPrimerOperando(operandos)
    operando2 = pedirSegundoOperando(operandos)

    // Se muestra un mesaje de error si alguno de los operandos está mal introducido
    if (pedirPrimerOperando(operandos) === -1 || pedirSegundoOperando(operandos) === -1) {
      window.alert('Debes introducir dos números separados por un espacio')
    }
  } while (pedirPrimerOperando(operandos) === -1 || pedirSegundoOperando(operandos) === -1)

  // Se muestran los resultados de la operación
  mostrarResultado(operador, operando1, operando2)

  // Se le pregunta al usuario si desea seguir calculando o desea acabar
  const eleccion = window.prompt('Quieres realizar otra operación S/N?').trim();
  (eleccion.toUpperCase() === 'S') ? repetir = true : repetir = false
} while (repetir)

"use strict"

alert("Bienvenido a la calculadora");

let valido;
do{
    let operador;
    let operando1;
    let operando2;
    do{
        operador = prompt("Introduce el operador de la operación que quieres realizar");
        if(!Boolean(operador)){
            alert("Debes introducir un operador");
            valido = false;
        }
        else{
            operador = operador.trim();
            if(operador.length === 1){
                if(operador === "+" || operador === "-" || operador === "/" || operador === "*"){
                    valido = true;
                }
                else{
                    alert("Lo siento, el operador no es correcto debe ser '+', '-', '/' o '*'");
                    valido = false;
                }
            }
            else{
                alert("Lo siento, el operador solo debe ser un carácter");
                valido = false;
            }
        }
    }while(!valido);

    do{
        let operandos = prompt("Introduce los operandos separados por un espacio");

        if(!Boolean(operandos)){
            alert("Debes introducir dos operadores");
            valido = false;
        }
        else{
            operandos = operandos.trim();
            operando1 = Number(operandos.substring(0, operandos.indexOf(" ")).trim());
            operando2 = Number(operandos.substring(operandos.indexOf(" ")).trim());
            if(!Boolean(operando1) || !Boolean(operando2)){
                alert("Lo siento, los operandos deben de ser dos números");
                valido = false;
            }
            else{
                valido = true;
            }
        }
    }while(!valido);

    switch(operador){
        case "+":
            alert(`El resultando ${operando1 + operando2}`);
            break;
        case "-":
            alert(`El resultando ${operando1 - operando2}`);
            break;
        case "/":
            if(operando2 === 0){
                alert("Lo siento no se puede dividir el ningún número entre 0");
            }
            else{
                alert(`El resultando ${operando1 / operando2}`);
            }
            break;
        case "*":
            alert(`El resultando ${operando1 * operando2}`);
    }

    let eleccion = prompt("Quieres realizar otra operación S/N?").trim();
    if(eleccion.toUpperCase() === "S"){
        valido = true;
    }
    else{
        valido = false;
    }
}while(valido);


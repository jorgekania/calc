'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

//Método para fazer o cálculo
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        //Todos este código é substitui tudo pela variável resultado
        // if (operador === '+') {
        //     atualizarDisplay(numeroAnterior + numeroAtual);
        // } else if (operador === '-') {
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // } else if (operador === '*') {
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // } else if (operador === '/') {
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }
    }
}

//Método para atualizar o display
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }

}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

//Botão igual
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

//Apagar display último número digitado
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//Limpar Calculo total
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//Backspace
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//Positivo ou Negativo
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

//Virgula ou Decimal
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

//Mapeamento para ativar o funcionamento pelo teclado
const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    ',': 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

    if (teclaPermitida()) {
        const mouseOver = () => teclaPermitida.style.background = "blue";
        const mouseOut = () => teclaPermitida.style.background = "pink";
        document.getElementById(mapaTeclado[tecla]).click();
        document.getElementById(mapaTeclado[tecla]).addEventListener("mouseover", mouseOver);
        document.getElementById(mapaTeclado[tecla]).addEventListener("mouseout", mouseOut);
    }
}

document.addEventListener('keydown', mapearTeclado)
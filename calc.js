'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
const backspace = document.getElementById('backspace');
const qtdCaractere = 11;
const colorBasic = '#fff';
const colorError = 'red';

let novoNumero = true;
let numeroAtual;
let operador;
let numeroAnterior;
let resultado;
let txt;

let operacaoPendente = () => operador !== undefined;

//Método para fazer o cálculo
const calcular = () => {
    if (operacaoPendente()) {

        console.log('--> CALCULAR')


        numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        numeroAnterior = numeroAnterior.replace(',', '.');


        console.log('----> 0 - Operador atual: ' + operador)

        novoNumero = true;
        resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        console.log('----> 1 ELSE - Valor Pendente: ' + numeroAnterior)
        console.log('----> 1 ELSE - Valor Atual: ' + numeroAtual)
        console.log('----> 1 ELSE - Operador: ' + operador)


    }
}

//Método para atualizar o display
const atualizarDisplay = (texto) => {

    console.log('--> ATUALIZAR DISPLAY')

    display.style.color = colorBasic;
    //Limitar a quantidade de carácter no display
    if (display.textContent.length >= qtdCaractere) {
        limparCalculo();
        display.textContent = 'Erro';
        display.style.color = colorError;

    } else {

        if (novoNumero) {

            console.log('----> É NOVO NÚMERO')

            display.textContent = texto.toLocaleString('BR');
            novoNumero = false;

        } else {

            console.log('----> NÃO É NOVO NÚMERO')


            display.textContent += texto;

            //Mostrar no display os dígitos e resultado

            console.log('--------> Total no display: ' + display.textContent.length)

            console.log('--------> Display dentro do else: ' + display.textContent)


            display.style.color = colorBasic;

            let [partInt, partDec] = display.textContent.split(',');
            let v = '';
            let c = 0;
            partInt = partInt.replace('.', '');

            console.log('--------> Part Int e Part Dec: ' + partInt + ' - ' + partDec)

            //Formata de 3 em 3 casas no display
            for (let i = partInt.length - 1; i >= 0; i--) {

                console.log('--------> Inicio do for: ' + c)

                if (++c > 3) {
                    v = '.' + v;
                    c = 0;

                    console.log('--------> aqui')
                }
                console.log('--------> Final do For: ' + c)
                v = partInt[i] + v;

            }

            v = v + (partDec ? ',' + partDec : '');

            console.log('------> Valor de v2:  ' + v)

            display.textContent = v;
        }
    }
    console.log('------> Total novo no Display:  ' + display.textContent.length)
    console.log('------> No display agora: ' + display.textContent)
    console.log('====================================')
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {

    console.log('----> SELECIONAR OPERADOR')

    if (!novoNumero) {

        if (evento.target.textContent == '%') {

            numeroAtual = parseFloat(display.textContent.replace(',', '.'));

            console.log('----> 3 Antes - Valor Atual: ' + numeroAtual)

            numeroAtual = (numeroAtual / 100);
            numeroAnterior = numeroAnterior.replace(',', '.');
            novoNumero = true;
            resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);

            console.log('----> 3 - Valor Atual: ' + numeroAtual)
            console.log('----> 3 - Valor Anterior: ' + numeroAnterior)
            console.log('----> 3 - Operador: ' + operador)

            atualizarDisplay(resultado);
            operador = undefined;
        } else {

            calcular();
            operador = evento.target.textContent;

            novoNumero = true;
            numeroAnterior = display.textContent.replace('.', '');

            console.log('-----> 2 - Operador Atual: ' + operador)
            console.log('-----> 2 - Valor Atual: ' + parseFloat(display.textContent.replace(',', '.')))
            console.log('-----> 2 - Valor Pendente: ' + numeroAnterior)
            console.log('====================================')
        }
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
document.getElementById('limparDisplay').addEventListener('click', limparCalculo);

//Backspace
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
backspace.addEventListener('click', removerUltimoNumero);


//Positivo ou Negativo
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

//Virgula ou Decimal
const inserirDecimal = () => {

    console.log('----> INSERIR DECIMAL')

    if (novoNumero) {
        display.textContent = '0,';
        novoNumero = false;
    } else {
        if (display.textContent.indexOf(',') == -1) {
            display.textContent += ',';
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
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '%': 'operadorPorcentagem',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparDisplay',
    ',': 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

    if (teclaPermitida()) {
        document.getElementById(mapaTeclado[tecla]).click();

        document.getElementById(mapaTeclado[tecla]).classList.add("button-hover");

        setTimeout(function () {
            document.getElementById(mapaTeclado[tecla]).classList.remove("button-hover");
        }, 500);
    }
}

document.addEventListener('keydown', mapearTeclado)

function popup() {
    let altura = document.getElementById('calculator').clientHeight;
    let largura = document.getElementById('calculator').clientWidth;
    let janela = 'index.html';
    window.open(janela, 'popup', 'width=' + largura + ',height=' + altura + ', scrollbars=no, titlebar=no, location=no, status=no, menubar=no, directories=no, resizable=no, top=0, left=0')
}
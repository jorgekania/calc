'use strict';

//Constantes a serem usadas
const display = document.getElementById('display');
const historic = document.getElementById('historic');
const contaAtual = document.getElementById('contaAtual');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
const backspace = document.getElementById('backspace');
const qtdCaractere = 11;
const colorBasic = '#fff';
const colorError = 'yellow';

//Variáveis a serem usadas
let novoNumero = true;
let opPercent = false;
let igualAtivado = false;
let numeroAtual;
let operador;
let numeroAnterior;
let resultado;
let txt;

//Se tiver operação pendente
let operacaoPendente = () => operador !== undefined

//Método para fazer o cálculo
const calcular = () => {

    if (operacaoPendente()) {

        console.warn('%c ----> INICIANDO O CALCULAR', 'color: red; font-size: 15px; font-weight: bold')

        numeroAtual = contaAtual.textContent.replace('.', '');
        numeroAtual = numeroAtual.replace(',', '.')
        numeroAnterior = numeroAnterior.replace(',', '.');

        if (operador == '÷') {
            operador = '/';
        }

        novoNumero = true;
        resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);

        console.log('%c --------> Valor Pendente: ' + numeroAnterior, 'color: blue')
        console.log('%c --------> Valor Atual: ' + numeroAtual, 'color: blue')
        console.log('%c --------> Operador: ' + operador, 'color: blue')
        console.log('%c --------> Resultado: ' + resultado, 'color: blue')

        atualizarDisplay(resultado);
    }
}

//Atualiza o histórico no display
const displayHistoric = () => {

    console.warn('%c ----> COLOCANDO OPERAÇÃO NO HISTÓRICO', 'color: red; font-size: 15px; font-weight: bold')

    if (operador == '/') {
        operador = '÷'
    }

    if (operacaoPendente()) {
        if (opPercent) {

            console.warn('%c ----> PORCENTAGEM COLOCADA NO HISTÓRICO', 'color: red; font-size: 15px; font-weight: bold')

            historic.textContent = numeroAnterior + operador + numeroAtual;
            atualizarDisplay(resultado);
            opPercent = false;
            console.log('%c --------> - Histórico Número Atual:  ' + numeroAtual, 'color: blue')

        } else {

            if (igualAtivado) {
                historic.textContent = numeroAnterior + operador + numeroAtual + '=';
                console.log('%c --------> - Histórico Número Atual:  ' + numeroAtual, 'color: blue')
                igualAtivado = false;
            } else {
                historic.textContent = numeroAnterior + operador;
                // contaAtual.textContent = '';
            }
        }
    }
    console.log('%c --------> - Histórico Operador Atual:  ' + operador, 'color: blue')
    console.log('%c --------> - Histórico Numero Anterior: ' + numeroAnterior, 'color: blue')
}


//Método para atualizar o display
const atualizarDisplay = (texto) => {

    console.warn('%c ----> INICIANDO O ATUALIZAR DISPLAY', 'color: red; font-size: 15px; font-weight: bold')

    contaAtual.style.color = colorBasic;
    //Limitar a quantidade de carácter no display
    if (contaAtual.textContent.length >= qtdCaractere) {

        limparCalculo();
        contaAtual.textContent = '☠ Erro';
        contaAtual.style.color = colorError;

        console.warn('%c ----> DISPLAY COM MAIS DE 10 DÍGITOS', 'color: red; font-size: 20px; font-weight: bold')

    } else {

        if (novoNumero) {

            console.warn('%c ----> NOVO NÚMERO DETECTADO', 'color: red; font-size: 15px; font-weight: bold')

            contaAtual.textContent = texto.toLocaleString('BR');
            novoNumero = false;

        } else {

            console.warn('%c ----> JÁ NÃO É MAIS NOVO NÚMERO ', 'color: red; font-size: 15px; font-weight: bold')

            contaAtual.textContent += texto;

            //Mostrar no display os dígitos e resultado
            contaAtual.style.color = colorBasic;

            let [partInt, partDec] = contaAtual.textContent.split(',');
            let v = '';
            let c = 0;
            partInt = partInt.replace('.', '');

            console.log('%c --------> Part Int: ' + partInt + ' » Part Dec: ' + partDec, 'color: green')
            console.log('%c --------> Inicio do for: ' + c, 'color: blue')

            //Formata de 3 em 3 casas no contaAtual
            for (let i = partInt.length - 1; i >= 0; i--) {

                if (++c > 3) {
                    v = '.' + v;
                    c = 0;
                }

                v = partInt[i] + v;

            }

            console.log('%c --------> Final do For: ' + c, 'color: blue')

            v = v + (partDec ? ',' + partDec : '');

            console.log('%c --------> Valor de v2:  ' + v, 'color: blue')

            contaAtual.textContent = v;
        }
        console.log('%c --------> Total de dígitos na Memória:  ' + contaAtual.textContent.length, 'color: blue')
        console.log('%c --------> Valor do display agora: ' + contaAtual.textContent, 'color: blue')
    }
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));


//Responsável por verificar qual operador foi selecionado
//Caso seja selecionado % será efetuado o cálculo aqui
//Outro operador, mando para o calcular()
const selecionarOperador = (evento) => {

    console.warn('%c ----> OPERADOR SELECIONADO ', 'color: red; font-size: 15px; font-weight: bold')

    if (!novoNumero) {

        if (evento.target.textContent == '%') {

            opPercent = true;
            numeroAtual = parseFloat(contaAtual.textContent.replace(',', '.'));

            console.warn('%c ----> OPERAÇÃO DE PORCENTAGEM ATIVADA', 'color: red; font-size: 15px; font-weight: bold')
            console.log('%c --------> Valor Atual: ' + numeroAtual, 'color: blue')

            if (operador == '*') {

                numeroAtual = (numeroAtual / 100);
                numeroAnterior = numeroAnterior.replace(',', '.');
                novoNumero = true;
                resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);

            } else {
                numeroAtual = (numeroAnterior * (numeroAtual / 100));
                numeroAnterior = numeroAnterior.replace(',', '.');
                novoNumero = true;
                resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);

            }

            console.log('%c --------> Valor Atual Convertido: ' + numeroAtual, 'color: blue')
            console.log('%c --------> Valor a Calcular: ' + numeroAnterior, 'color: blue')
            console.log('%c --------> Operador: ' + operador, 'color: blue')
            console.log('%c --------> Resultado: ' + resultado, 'color: blue')

            displayHistoric();
            operador = undefined;
        } else {

            calcular();

            operador = evento.target.textContent;
            novoNumero = true;
            numeroAnterior = contaAtual.textContent.replace('.', '');

            console.log('%c --------> Operador Atual: ' + operador, 'color: blue')
            console.log('%c --------> Valor Atual: ' + contaAtual.textContent, 'color: blue')
            console.log('%c --------> Valor Pendente: ' + numeroAnterior, 'color: blue')

            displayHistoric();
        }
    } else {
        operador = evento.target.textContent;

        console.log('%c --------> Operador Atual: ' + operador, 'color: blue')
        console.log('%c --------> Valor Atual: ' + contaAtual.textContent, 'color: blue')
        console.log('%c --------> Valor Pendente: ' + numeroAnterior, 'color: blue')
        displayHistoric();
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));


//Quando clicado no Botão igual
const ativarIgual = () => {

    console.warn('%c ----> IGUAL ATIVADO ' + operador, 'color: red; font-size: 15px; font-weight: bold')

    igualAtivado = true;

    calcular();
    displayHistoric();
    operador = undefined;

}
document.getElementById('igual').addEventListener('click', ativarIgual);


//Apagar display último número digitado
//Apagar histórico do display
const limparDisplay = () => contaAtual.textContent = '';
const limparHistoric = () => historic.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);


//Limpar Calculo total
const limparCalculo = () => {
    console.warn('%c ----> LIMPAR DISPLAY ATIVADO', 'color: red; font-size: 15px; font-weight: bold')
    console.warn('%c ----> LIMPAR HISTÓRICO ATIVADO', 'color: red; font-size: 15px; font-weight: bold')
    limparDisplay();
    limparHistoric();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
    console.clear()
}
document.getElementById('limparDisplay').addEventListener('click', limparCalculo);


//Backspace
const removerUltimoNumero = () => {

    console.warn('%c ----> REMOVER ÚLTIMO NÚMERO ATIVADO ', 'color: red; font-size: 15px; font-weight: bold')
    contaAtual.textContent = contaAtual.textContent.slice(0, -1);
}
backspace.addEventListener('click', removerUltimoNumero);


//Botão Positivo ou Negativo
const inverterSinal = () => {
    console.warn('%c ----> INVERTER SINAL ATIVADO ', 'color: red; font-size: 15px; font-weight: bold')
    novoNumero = true;
    atualizarDisplay(contaAtual.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

//Botão Virgula ou Decimal
const inserirDecimal = () => {

    console.warn('%c ----> INSERIR DECIMAL ATIVADO ', 'color: red; font-size: 15px; font-weight: bold')

    if (novoNumero) {
        contaAtual.textContent = '0,';
        novoNumero = false;
    } else {
        if (contaAtual.textContent.indexOf(',') == -1) {
            contaAtual.textContent += ',';
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


//Para ativar calculadora no popup
function popup() {
    let altura = document.getElementById('calculator').clientHeight;
    let largura = document.getElementById('calculator').clientWidth;
    let janela = 'index.html';
    window.open(janela, 'popup', 'width=' + largura + ',height=' + altura + ', scrollbars=no, titlebar=no, location=no, status=no, menubar=no, directories=no, resizable=no, top=0, left=0')
}
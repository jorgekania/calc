class Display {
    constructor(displayValorAnterior, displayValorAtual) {
        this.displayValorAtual = displayValorAtual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculadora = new Calculadora();
        this.tipoOperacao = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.sinais = {
            somar: '+',
            dividir: '/',
            multiplicar: 'x',
            diminuir: '-',
            porcentagem: '%',
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacao = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        this.tipoOperacao !== 'igual' && this.calcular();
        this.tipoOperacao = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    inserirNumero(numero) {
        if (numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorAtual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.sinais[this.tipoOperacao] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if (isNaN(valorActual) || isNaN(valorAnterior)) return
        this.valorActual = this.calculadora[this.tipoOperacao](valorAnterior, valorActual);
    }
}
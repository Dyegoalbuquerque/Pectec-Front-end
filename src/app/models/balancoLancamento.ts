
export class BalancoLancamento {

    constructor() {
        this.inicializarValores();
    }

    totalSaida: number;
    totalEntrada: number;
    totalSaldo: number;

    inicializarValores() {
        this.totalEntrada = 0;
        this.totalSaida = 0;
        this.totalSaldo = 0;
    }
}
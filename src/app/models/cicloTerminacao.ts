import { Local } from './local';

export class CicloTerminacao {

    constructor() { }

    id: number;
    femeaId: number;
    dataNascimento: string;
    dataEntrada: string;
    dataEncerramento: string;
    quantidadeEntrada: number;
    quantidadeSaida: number;
    quantidadeAnimalMorto:number;
    localId: number;
    local: Local;
    valorEntrada: number;
    valorSaida: number;
    pesoAnimalEntrada:number;
    pesoLoteEntrada:number;
    pesoAnimalSaida: number;
    pesoLoteSaida:number;
    ativo: boolean;
    quantidadeSeparado: number;
    quantidadeSemDestino: number;

    calcularQuantidadeAnimalAtual() {

        let entrada = this.quantidadeEntrada ? this.quantidadeEntrada : 0;
        let semDestino = this.quantidadeSemDestino ? this.quantidadeSemDestino : 0;
        let separados = this.quantidadeSeparado ? this.quantidadeSeparado : 0;
        let mortos = this.quantidadeAnimalMorto ? this.quantidadeAnimalMorto : 0;

        let quantidade = entrada - (separados + semDestino + mortos);

        return quantidade;
    }
}
import { ValidadorTipo } from '../validadorTipo';

export class CicloReproducao {

    constructor(femeaId: number) {
        this.femeaId = femeaId;
    }
    id: number;
    reprodutorId: number;
    inceminacao: boolean;
    procedenciaReprodutor: string;
    femeaId: number;
    dataFecundacao: string;
    dataFinalIDC: string;
    dataFinalIdcPrevisao: string;
    dataPartoPrevisao: string;
    dataPartoReal: string;
    dataDesmamePrevisao: string;
    dataDesmameReal: string;
    ativo: boolean;
    quantidadeFilhote: number;
    quantidadeFilhoteVV: number;
    quantidadeFilhoteNM: number;
    quantidadeFilhoteMF: number;
    pesoFilhoteNascimento: number;
    pesoFilhoteDesmamado: number;
    pesoLeitegadaNascimento: number;
    pesoLeitegadaDesmamado: number;
    quantidadeFilhoteMorto: number;
    quantidadeSexoM: number;
    quantidadeSexoF: number;
    quantidadeDoado: number;
    quantidadeAdotado: number;
    quantidadeDesmamado: number;
    numeroFemeaAdocao: number;
    valorSaida: number;

    eValido(): boolean {

        let resultado =
            (ValidadorTipo.numberValido(this.reprodutorId) &&
                ValidadorTipo.booleanFalso(this.inceminacao) &&
                ValidadorTipo.dateValido(this.dataFecundacao) &&
                !ValidadorTipo.dateValido(this.dataPartoReal) &&
                !ValidadorTipo.dateValido(this.dataDesmameReal)) ||

            (ValidadorTipo.dateValido(this.dataPartoReal) &&
                ValidadorTipo.numberValido(this.quantidadeFilhote) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteVV) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteMF) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteNM) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.pesoFilhoteNascimento) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeSexoM) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeSexoF) &&
                !ValidadorTipo.dateValido(this.dataDesmameReal)) ||

            (ValidadorTipo.dateValido(this.dataPartoReal) &&
              ValidadorTipo.numberValido(this.pesoFilhoteDesmamado));

        return resultado;
    }
}
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
    diasGestacao: number;
    diasLactacao: number;
    diasRecriaPrevisao: number;
    dataFecundacao: string;
    dataRecria: string;
    dataPartoPrevisao: string;
    dataPartoReal: string;
    dataApartarPrevisao: string;
    dataApartarReal
    ativo: boolean;
    quantidadeFilhote: number;
    quantidadeFilhoteVV: number;
    quantidadeFilhoteNM: number;
    quantidadeFilhoteMF: number;
    pesoFilhoteNascimento: number;
    pesoFilhoteApartar: number;
    quantidadeFilhoteMorto: number;
    quantidadeSexoM: number;
    quantidadeSexoF: number;
    situacaoNascimento: string;
    quantidadeDoado: number;
    quantidadeAdotado: number;
    quantidadeVendido: number;
    quantidadeApartado: number;
    numeroFemeaAdocao: number;

    eValido(): boolean {

        let resultado =
            (ValidadorTipo.numberValido(this.reprodutorId) &&
                ValidadorTipo.booleanFalso(this.inceminacao) &&
                ValidadorTipo.dateValido(this.dataFecundacao) &&
                !ValidadorTipo.dateValido(this.dataPartoReal) &&
                !ValidadorTipo.dateValido(this.dataApartarReal)) ||

            (ValidadorTipo.dateValido(this.dataPartoReal) &&
                ValidadorTipo.numberValido(this.quantidadeFilhote) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteVV) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteMF) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteNM) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.pesoFilhoteNascimento) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeSexoM) &&
                ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeSexoF) &&
                !ValidadorTipo.dateValido(this.dataApartarReal)) ||

            (ValidadorTipo.dateValido(this.dataPartoReal) &&
              ValidadorTipo.numberValido(this.pesoFilhoteApartar));

        return resultado;
    }
}
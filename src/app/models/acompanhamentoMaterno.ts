import { ValidadorTipo } from '../validadorTipo';

export class AcompanhamentoMaterno {

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
    dataFecundacao: Date;
    dataRecria: Date;
    dataPartoPrevisao: Date;
    dataPartoReal: Date;
    dataApartarPrevisao: Date;
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

    eValido(): boolean {
        
        return this.dataPartoReal && 

              (ValidadorTipo.numberValido(this.reprodutorId) && 
               ValidadorTipo.booleanFalso(this.inceminacao)) ||
              
              (ValidadorTipo.booleanVerdadeiro(this.inceminacao) && 
              (this.dataPartoReal && 
               ValidadorTipo.numberValido(this.quantidadeFilhote) && 
               ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteVV) && 
               ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteMF) &&
               ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeFilhoteNM) && 
               ValidadorTipo.numberMaiorOuIgualZero(this.pesoFilhoteNascimento) &&
               ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeSexoM) && 
               ValidadorTipo.numberMaiorOuIgualZero(this.quantidadeSexoF) || 
               this.dataPartoReal == undefined));
    }
}
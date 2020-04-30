
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
}
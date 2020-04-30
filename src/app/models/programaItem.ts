export class ProgramaItem {

    constructor(programaId?: number, situacaoId?: number) {
        this.programaId = programaId;
        this.situacaoId = situacaoId;
    }

    id: number;
    programaId: number;
    descricao: string;
    observacao: string;
    inicio: number;
    fim: number;
    situacaoId: number;
    quantidadeDias: number;
    quantidade: number;
    unidadeMedida: string;
    objetivo: any;
    objetivoId: number;

    eDoTipoConsumo() {
        return this.quantidade && this.unidadeMedida ? true : false;
    }

    eIntervalo() {
        return this.inicio && this.fim ? true : false;
    }

    mostrarDescricaoIntervalo() {
        let intervalo = this.inicio ? `Dia ${this.inicio}` : '';
        intervalo += this.fim ? ` até ${this.fim}` : '';

        return intervalo;
    }

    mostrarDescricaoQuantidade() {
        let descricaoQuantidade = this.quantidade ? `${this.quantidade} ${this.unidadeMedida}` : '';

        return descricaoQuantidade;
    }

    mostrarObjetivo() {
        let objetivo = `${this.objetivo.descricao}`;

        return objetivo;
    }

    mostrarDescricao() {
        let descricao = `${this.descricao ? `${this.descricao}` : ``}`;

        return descricao;
    }

    mostrarObservacao() {
        let observacao = `${this.observacao ? `${this.observacao}` : ``}`;

        return observacao;
    }
}
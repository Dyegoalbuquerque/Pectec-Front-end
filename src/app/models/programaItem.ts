export class ProgramaItem {

    constructor(programaId?: number, tagId?: number) {
        this.programaId = programaId;
        this.tagId = tagId;
    }

    id: number;
    programaId: number;
    descricao: string;
    observacao: string;
    tempoOcorrencia: string;
    tagId: number;
    quantidade: number;
    unidadeMedida: string;
    objetivo: any;
    objetivoId: number;

    eDoTipoConsumo() {
        return this.quantidade && this.unidadeMedida ? true : false;
    }

    eIntervalo() {
        return this.tempoOcorrencia ? this.tempoOcorrencia.includes("-") : false;
    }

    mostrarDescricaoIntervalo() {
        let tempoDividido = this.tempoOcorrencia ? this.tempoOcorrencia.split("-") : "";
        let inicio = tempoDividido ? tempoDividido[0] : "";
        let fim = tempoDividido ? tempoDividido[1] : "";

        let intervalo = this.tempoOcorrencia ? `Dia ${inicio}` : '';
        intervalo += fim ? ` até ${fim}` : '';

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
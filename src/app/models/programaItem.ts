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

    preparar(intervaloDia: any){

        let tempoOcorrenciaFormatado = intervaloDia.valor == "MUD" ?
        `${intervaloDia.inicio}-${intervaloDia.fim}` :
           intervaloDia.valor == "UD" ?
        `${intervaloDia.inicio}` :
           intervaloDia.valor == "FD" ?
        `${intervaloDia.inicio}~${intervaloDia.inicio}` : "";

        this.tempoOcorrencia = tempoOcorrenciaFormatado;
    }

    validar(objetivoTipo: string): boolean {
        return this.programaId && this.objetivoId && (this.tempoOcorrencia) &&
               ((objetivoTipo == 'C' && this.quantidade && this.unidadeMedida != '') ||
               (objetivoTipo == 'P'));
    }

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
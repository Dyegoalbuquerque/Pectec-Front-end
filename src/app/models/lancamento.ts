
import { Subcategoria } from '.';

export class Lancamento {

    id: number;
    tipo: string;
    vencimento: string;
    ano: number;
    mes: string;
    data: string;
    valor: number;
    descricao: string;
    status: string;
    subcategoriaId: number;
    subcategoria: Subcategoria;

    constructor() {
    }

    eDoTipoEntrada(){
        return this.tipo == 'E';
    }

    eDoTipoSaida(){
        return this.tipo == 'S';
    }

    static ordenarPorVencimentoDecrecente = (a, b) => {
        return new Date(b.vencimento).getTime() - new Date(a.vencimento).getTime();
    }

    static ordenarPorVencimentoCrescente = (a, b) => {
        return new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime();
    }
}

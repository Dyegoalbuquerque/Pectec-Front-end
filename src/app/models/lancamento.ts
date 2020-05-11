
import { Subcategoria } from '.';
import { ValidadorTipo } from '../validadorTipo';

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

    constructor() {}

    eDoTipoEntrada() {
        return this.tipo == 'E';
    }

    eDoTipoSaida() {
        return this.tipo == 'S';
    }

    eValido(): boolean {
        return ValidadorTipo.numberValido(this.valor) && 
               ValidadorTipo.stringValido(this.vencimento) && 
               ValidadorTipo.stringValido(this.descricao) && 
               ValidadorTipo.stringValido(this.tipo) && 
               ValidadorTipo.numberValido(this.subcategoriaId);
    }

    static ordenarPorVencimentoDecrecente = (a, b) => {
        return new Date(b.vencimento).getTime() - new Date(a.vencimento).getTime();
    }

    static ordenarPorVencimentoCrescente = (a, b) => {
        return new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime();
    }
}

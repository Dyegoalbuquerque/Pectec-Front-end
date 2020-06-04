
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
               ValidadorTipo.dateValido(this.vencimento) && 
               ValidadorTipo.stringValido(this.descricao) && 
               ValidadorTipo.stringValido(this.tipo) && 
               ValidadorTipo.numberValido(this.subcategoriaId);
    }
}

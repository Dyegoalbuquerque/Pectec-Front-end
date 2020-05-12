import { VendaItem } from './vendaItem';
import { ValidadorTipo } from '../validadorTipo';


export class Venda {

    constructor() { }

    id: number;
    data: string;
    ano: number;
    valorTotal: number;
    valorCustoTotal: number;
    itens: VendaItem[];

    eValido(): boolean {

        let itensValidos = false;

        this.itens.forEach(i => {

            itensValidos = 
                ValidadorTipo.numberValido(i.origemId) &&
                ValidadorTipo.numberValido(i.quantidade) &&
                ValidadorTipo.stringValido(i.tipo) &&
                ValidadorTipo.numberValido(i.valor)
        });

        let result = ValidadorTipo.booleanVerdadeiro(itensValidos) && 
                     ValidadorTipo.dateValido(this.data);

        return result;
    }

    mostrarValoresDetalhado() {

        let custoDetalhado = '';

        if (this.valorCustoTotal) {
            custoDetalhado += `custo R$ ${parseFloat(this.valorCustoTotal.toFixed(2))}`;
        }

        if (this.valorTotal) {
            custoDetalhado += ` - total R$ ${parseFloat(this.valorTotal.toFixed(2))}`;
        }

        return custoDetalhado;
    }

    static ordenarPorDataDecrecente = (a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    }

}
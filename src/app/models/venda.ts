import { VendaItem } from './vendaItem';


export class Venda {

    constructor() { }

    id: number;
    data: string;
    ano: number;
    valorTotal: number;
    valorCustoTotal: number;
    itens: VendaItem[];

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
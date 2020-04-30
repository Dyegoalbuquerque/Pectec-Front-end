
import { UnidadeMedida } from './unidadeMedida';
import { Subcategoria } from './subCategoria';


export class Estoque {

    constructor(subcategoria?: Subcategoria) {
        this.subcategoria = subcategoria;
    }

    id: number;
    descricao: string;
    dataCadastro: string;
    dataEntrada: string;
    comprado: boolean;
    quantidade: number;
    quantidadeEmbalagem: number;
    quantidadeEntrada: number;
    quantidadeEntradaReal: number;
    valorEmbalagem: number;
    valorUnitario: number;
    unidadeMedida: string;
    unidade: UnidadeMedida;
    subcategoria: Subcategoria;
    subcategoriaId: number;
    eventos: any[];

    static ordenarPorDataEntrada = (a, b) => {
        return new Date(a.dataEntrada).getTime() - new Date(b.dataEntrada).getTime()
    };

    static ordenarPorDescricao = (a, b) => {
        let comparison = 0;
        if (a.descricao.toUpperCase() > b.descricao.toUpperCase()) {
            comparison = 1;
        } else if (a.descricao.toUpperCase() < b.descricao.toUpperCase()) {
            comparison = -1;
        }
        return comparison;
    };

}

import { UnidadeMedida } from './unidadeMedida';
import { Subcategoria } from './subCategoria';
import { ValidadorTipo } from '../validadorTipo';


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
    consumos: any[];

    eValido(): boolean {
        let algumInsumoSelecionado = false;

        if(this.consumos){
            this.consumos.forEach(c => {
                if (c.quantidade > 0) {
                    algumInsumoSelecionado = true;
                }
            });
        }

        let result = 

          ((ValidadorTipo.booleanVerdadeiro(this.comprado) &&
            ValidadorTipo.stringValido(this.descricao) &&
            ValidadorTipo.stringValido(this.unidadeMedida) &&
            ValidadorTipo.numberValido(this.subcategoriaId) &&
            ValidadorTipo.numberValido(this.quantidadeEmbalagem) &&
            ValidadorTipo.dateValido(this.dataEntrada) &&
            ValidadorTipo.numberValido(this.valorEmbalagem) &&
            ValidadorTipo.numberValido(this.quantidade)) ||
            (ValidadorTipo.booleanFalso(this.comprado) &&
             ValidadorTipo.stringValido(this.descricao) &&
             ValidadorTipo.stringValido(this.unidadeMedida) &&
             ValidadorTipo.numberValido(this.subcategoriaId) &&
             ValidadorTipo.numberValido(this.quantidadeEmbalagem) &&
             ValidadorTipo.dateValido(this.dataEntrada) &&
             ValidadorTipo.booleanVerdadeiro(algumInsumoSelecionado)));

             return result;
    }

    mostrarDescricaoQuantidadeReal() {
        return `${this.quantidadeEntradaReal} ${this.unidadeMedida}`;
    }

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
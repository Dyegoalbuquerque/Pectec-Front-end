import { Estoque } from './estoque';
import { Categoria } from './categoria';
import { ValidadorTipo } from '../validadorTipo';

export class Consumo {

  id: number;
  data: string;
  quantidade: number;
  descricao: string;
  unidadeMedida: string;
  categoria: Categoria;
  categoriaId: number;
  origemId: number;
  origem: Estoque;
  valor: number;
  valorUnitario: number;

  constructor(origem?: Estoque) {
    this.origem = origem;
  }

  eValido(): boolean {
    return ValidadorTipo.numberValido(this.quantidade) && 
           ValidadorTipo.dateValido(this.data) && 
           ValidadorTipo.numberValido(this.origemId) && 
           ValidadorTipo.numberValido(this.categoriaId);
  }

  mostrarCustoDetalhado() {

    let custoDetalhado = '';
    let custo = 0;

    if(this.origem){
      custo = this.valorUnitario * this.quantidade;
      custoDetalhado =  `custo R$ ${parseFloat(custo.toFixed(2))}`;
    }

    if(this.valor){
      custoDetalhado += ` - total R$ ${this.valor}`;
    }

    if(this.origem && this.valor){
      let subtracao = this.valor - custo;
      custoDetalhado += ` - saldo R$ ${parseFloat(subtracao.toFixed(2))}`;
    }

    return custoDetalhado;
  }

  static ordenar = (a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  }
}

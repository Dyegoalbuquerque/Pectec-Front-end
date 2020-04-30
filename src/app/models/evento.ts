import { Estoque } from './estoque';
import { Categoria } from './categoria';

export class Evento {

  id: number;
  data: string;
  quantidade: number;
  categoria: Categoria;
  categoriaId: number;
  origemId: number;
  origem: Estoque;
  valor: number;
  tipo: string;

  constructor(origem?: Estoque) {
    this.origem = origem;
  }

  mostrarCustoDetalhado() {

    let custoDetalhado = '';
    let custo = 0;

    if(this.origem){
      custo = this.origem.valorUnitario * this.quantidade;
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

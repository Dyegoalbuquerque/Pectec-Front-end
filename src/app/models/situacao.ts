

export class Situacao {
    
    constructor(){
    }
    id: number;
    nome: string;
    descricao: string;
    setores: string;
    sigla: string;
    quantidade: number;

    static ordenar = (a, b) => {
        if (a.quantidade < b.quantidade)
          return 1
        if (a.quantidade > b.quantidade)
          return -1
        return 0;
      }
}
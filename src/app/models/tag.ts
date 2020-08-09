

export class Tag {
    
    constructor(nome?: string){
      this.nome = nome;
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
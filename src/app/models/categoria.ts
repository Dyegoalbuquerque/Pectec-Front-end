

export class Categoria {
    
    constructor(id?: number, codigo?: string, descricao?: string){
      this.id = id;
      this.codigo = codigo;
      this.descricao = descricao;
    }

    id: number;
    codigo: string;
    descricao: string;

    static ordenar = (a, b) => {
        if (a.descricao > b.descricao)
          return 1
        if (a.descricao < b.descricao)
          return -1
        return 0;
      }
}
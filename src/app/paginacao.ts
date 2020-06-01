
export class Paginacao {

    constructor(pagina: number, limite: number){
        this.pagina = pagina;
        this.limite = limite;
    }

    pagina: number;
    limite: number;
    total: number;
    resultado: any[];
}


export class VendaItem {
    
    constructor(tipo?: string){
        this.tipo = tipo;
    }
    id: number;
    vendaId: number;
    valor: number;
    valorCusto: number;
    unidadeMedida: string;
    quantidade: number;
    origemId: number;
    tipo: string;
}


export class UnidadeMedida {
    
    constructor(){}
    
    id: number;
    codigo: string;
    descricao: string;

    mostrarDescricao(): string {
        return `${this.descricao} - ${this.codigo}`;
    }
}
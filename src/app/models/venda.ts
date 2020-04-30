

export class Venda {
    
    constructor(){}
    
    id: number;
    data: string;
    ano: number;
    tipo: string;
    valor: number;
    itemId: number;

    static ordenarPorDataDecrecente = (a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    }
}
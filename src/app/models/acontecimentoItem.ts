
export class AcontecimentoItem{
    
    constructor(){ }

    id: number;
    acontecimentoId: number;
    descricao: string;
    status: string;
    tipo: string;
    estoqueId: number;
    quantidade: number;
    programaItemId: number;
    subcategoriaId: number;
    alvos: number[];
}
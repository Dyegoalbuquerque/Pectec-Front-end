import { AcontecimentoItem } from './acontecimentoItem';

export class Acontecimento{
    
    constructor(){ }
    
    id: number;
    setor: string;
    data: string;
    status: string;
    itens: AcontecimentoItem[];
}
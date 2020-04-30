import { ProgramaItem } from './programaItem';


export class Programa {
    
    constructor(){
    }
    id: number;
    nome: string;
    tipoProgramaId: number;
    dataCadastro: string;
    itens: ProgramaItem[];
    inativo: boolean;
}
import { ProgramaItem } from './programaItem';


export class Programa {
    
    constructor(){
    }
    id: number;
    tipo: string;
    nome: string;
    itens: ProgramaItem[];
}
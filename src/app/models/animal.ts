import { CicloReproducao } from './cicloReproducao';


export class Animal{
    
    constructor(){ }
    id: number;
    maeId: number;
    paiId: number;
    especieId: number;
    situacao: string;
    numero: number;
    nome: string;
    raca: string;
    dataNascimento: string;
    dataObito: string;
    causaObitoId: number;
    sexo: string;
    quantidadeCiclo: number;
    procedencia: string;
    ciclos: CicloReproducao[];
    pertence: string;
}
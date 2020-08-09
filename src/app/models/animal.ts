import { CicloReproducao } from './cicloReproducao';


export class Animal{
    
    constructor(){ }
    id: number;
    especieId: number;
    tag: string;
    numero: number;
    nome: string;
    raca: string;
    dataNascimento: string;
    dataObito: string;
    causaObitoId: number;
    sexo: string;
    quantidadeCiclo: number;
    ciclos: CicloReproducao[];
    pertence: string;

    pertenceAgranja(){
        return this.pertence == 'G';
    }

    taEmSituacaoDeIDC(){
        return this.tag == 'IDC';
    }

    taEmSituacaoConfirmacaoGestacao(){
        return this.tag == 'CG';
    }
}
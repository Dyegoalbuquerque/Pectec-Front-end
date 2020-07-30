import { CicloReproducao } from './cicloReproducao';


export class Animal{
    
    constructor(){ }
    id: number;
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
    ciclos: CicloReproducao[];
    pertence: string;

    pertenceAgranja(){
        return this.pertence == 'G';
    }

    taEmSituacaoDeIDC(){
        return this.situacao == 'IDC';
    }

    taEmSituacaoConfirmacaoGestacao(){
        return this.situacao == 'CG';
    }
}